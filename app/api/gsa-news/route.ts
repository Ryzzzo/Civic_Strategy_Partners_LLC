import { NextResponse } from 'next/server';

const FALLBACK_NEWS = [
  {
    title: 'GSA Announces Initiatives to Modernize Federal Acquisition',
    link: 'https://www.gsa.gov/about-us/newsroom',
    pubDate: 'Nov 20, 2025',
    description: 'The General Services Administration continues modernizing federal procurement processes for improved efficiency...'
  },
  {
    title: 'Updates to GSA Multiple Award Schedule Program',
    link: 'https://www.gsa.gov/about-us/newsroom',
    pubDate: 'Nov 18, 2025',
    description: 'Recent updates to the MAS program provide greater flexibility for contract holders and improved access for buyers...'
  },
  {
    title: 'Federal Marketplace Trends for Government Contractors',
    link: 'https://www.gsa.gov/about-us/newsroom',
    pubDate: 'Nov 15, 2025',
    description: 'Industry insights show increasing emphasis on commercial solutions and streamlined procurement processes...'
  },
  {
    title: 'GSA Technology Initiatives Support Agency Modernization',
    link: 'https://www.gsa.gov/about-us/newsroom',
    pubDate: 'Nov 12, 2025',
    description: 'New technology acquisition vehicles help federal agencies access cutting-edge solutions with compliance...'
  }
];

const RSS_FEED_URLS = [
  'https://www.gsa.gov/about-us/newsroom/news-releases.rss',
  'https://www.gsa.gov/blog/feed',
  'https://gsablogs.gsa.gov/gsablog/feed/',
];

async function tryFetchRSS(url: string) {
  const response = await fetch(url, {
    next: { revalidate: 300 },
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; GSANewsFetcher/1.0)'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const xmlText = await response.text();

  if (!xmlText.includes('<item>') && !xmlText.includes('<entry>')) {
    throw new Error('Not a valid RSS/Atom feed');
  }

  return xmlText;
}

export async function GET() {
  try {
    let xmlText = '';

    for (const url of RSS_FEED_URLS) {
      try {
        xmlText = await tryFetchRSS(url);
        break;
      } catch {
        continue;
      }
    }

    if (!xmlText) {
      return NextResponse.json(FALLBACK_NEWS);
    }

    const items = [];
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
        items.push({
          title: titleMatch[1],
          link: linkMatch[1],
          pubDate: new Date(pubDateMatch[1]).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }),
          description: descriptionMatch ? descriptionMatch[1].substring(0, 120) + '...' : ''
        });
      }
    }

    if (items.length === 0) {
      return NextResponse.json(FALLBACK_NEWS);
    }

    return NextResponse.json(items.slice(0, 4));

  } catch {
    return NextResponse.json(FALLBACK_NEWS);
  }
}
