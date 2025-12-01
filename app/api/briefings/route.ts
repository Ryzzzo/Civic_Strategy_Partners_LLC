import { NextResponse } from 'next/server';

interface HubSpotBlogPost {
  id: string;
  name: string;
  publishDate: string;
  metaDescription: string;
  postBody: string;
  featuredImage: string;
  url: string;
  linkRelCanonicalUrl: string; // This is the canonical URL field (LinkedIn link)
  tagIds: number[];
  blogAuthor?: {
    displayName: string;
    avatar: string;
  };
}

interface HubSpotResponse {
  results: HubSpotBlogPost[];
}

export async function GET() {
  const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!hubspotToken) {
    return NextResponse.json(
      { error: 'HubSpot access token not configured', briefings: [] },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      'https://api.hubapi.com/cms/v3/blogs/posts?limit=5&state=PUBLISHED&sort=-publishDate',
      {
        headers: {
          Authorization: `Bearer ${hubspotToken}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('HubSpot API error:', response.status, errorText);
      throw new Error(`HubSpot API error: ${response.status}`);
    }

    const data: HubSpotResponse = await response.json();

    const briefings = data.results
      .slice(0, 5)
      .map((post) => {
        const publishDate = new Date(post.publishDate);
        const formattedDate = publishDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        const excerpt =
          post.metaDescription ||
          (post.postBody
            ? post.postBody.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
            : '');

        return {
          title: post.name,
          publishDate: formattedDate,
          excerpt,
          featuredImage: post.featuredImage || 'https://placehold.co/1200x627/1e3a5f/ffffff?text=Civic+Strategy+Briefing',
          linkedInUrl: post.linkRelCanonicalUrl || post.url, // Use canonical URL (LinkedIn) if set, fallback to HubSpot URL
          authorName: post.blogAuthor?.displayName || 'Kevin Martin, MBA',
          authorAvatar: post.blogAuthor?.avatar || '',
        };
      });

    return NextResponse.json({ briefings }, { status: 200 });
  } catch (error) {
    console.error('Error fetching HubSpot blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch briefings', briefings: [] },
      { status: 500 }
    );
  }
}