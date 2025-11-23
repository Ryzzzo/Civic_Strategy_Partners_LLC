import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

export const revalidate = 300;

export async function GET() {
  const feedUrls = [
    'https://www.gsa.gov/blog/feed',
    'https://www.gsa.gov/blog/rss',
    'https://www.gsa.gov/about-us/newsroom/news-releases/rss'
  ];

  for (const feedUrl of feedUrls) {
    try {
      const feed = await parser.parseURL(feedUrl);

      const items = feed.items.slice(0, 4).map(item => ({
        title: item.title || 'Untitled',
        link: item.link || 'https://www.gsa.gov/blog',
        pubDate: item.pubDate || new Date().toISOString(),
        description: item.contentSnippet || item.content || ''
      }));

      return NextResponse.json({ items }, {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
        }
      });
    } catch (error) {
      console.error(`Error fetching GSA news from ${feedUrl}:`, error);
      continue;
    }
  }

  return NextResponse.json(
    { error: 'Failed to fetch GSA news', items: [] },
    { status: 500 }
  );
}
