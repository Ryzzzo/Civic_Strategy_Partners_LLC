import { NextResponse } from 'next/server';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  isGSARelated?: boolean;
}

async function fetchGovConNews() {
  const response = await fetch('https://govconwire.com/feed/', {
    next: { revalidate: 300 },
    redirect: 'follow',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const xmlText = await response.text();

  if (!xmlText.includes('<item>') && !xmlText.toLowerCase().includes('<rss')) {
    throw new Error('Not a valid RSS feed');
  }

  return xmlText;
}

function parseRSSItems(xmlText: string): NewsItem[] {
  const items: NewsItem[] = [];
  const itemMatches = Array.from(xmlText.matchAll(/<item>([\s\S]*?)<\/item>/g));

  for (const match of itemMatches) {
    const itemXml = match[1];

    const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ||
                      itemXml.match(/<title>(.*?)<\/title>/);
    const linkMatch = itemXml.match(/<link>(.*?)<\/link>/);
    const pubDateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/);
    const descriptionMatch = itemXml.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) ||
                            itemXml.match(/<description>(.*?)<\/description>/);

    if (titleMatch && linkMatch && pubDateMatch) {
      const title = titleMatch[1];
      const description = descriptionMatch ? descriptionMatch[1] : '';
      const isGSARelated = /GSA|General Services Administration|Multiple Award Schedule|MAS Contract/i.test(title + ' ' + description);

      items.push({
        title,
        link: linkMatch[1],
        pubDate: new Date(pubDateMatch[1]).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        description: description.replace(/<[^>]*>/g, '').substring(0, 120) + '...',
        isGSARelated
      });
    }
  }

  return items;
}

export async function GET() {
  try {
    const xmlText = await fetchGovConNews();
    const allItems = parseRSSItems(xmlText);

    const gsaItems = allItems.filter(item => item.isGSARelated);
    const otherItems = allItems.filter(item => !item.isGSARelated);

    let selectedItems: NewsItem[] = [];

    if (gsaItems.length >= 4) {
      selectedItems = gsaItems.slice(0, 4);
    } else {
      selectedItems = [...gsaItems, ...otherItems].slice(0, 4);
    }

    return NextResponse.json(selectedItems.map(({ isGSARelated, ...item }) => item));

  } catch (error) {
    return NextResponse.json(
      { error: 'Unable to fetch government contracting news' },
      { status: 500 }
    );
  }
}
