import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://www.gsa.gov/blog/feed', {
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch RSS feed');
    }

    const xmlText = await response.text();

    const items = [];
    const itemMatches = Array.from(xmlText.matchAll(/<item>([\s\S]*?)<\/item>/g));

    for (const match of itemMatches) {
      const itemXml = match[1];

      const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
      const linkMatch = itemXml.match(/<link>(.*?)<\/link>/);
      const pubDateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/);
      const descriptionMatch = itemXml.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/);

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

    return NextResponse.json(items.slice(0, 4));

  } catch (error) {
    console.error('Error fetching GSA news:', error);
    return NextResponse.json({ error: 'Failed to load GSA news' }, { status: 500 });
  }
}
