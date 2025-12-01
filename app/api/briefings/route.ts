import { NextResponse } from 'next/server';

export async function GET() {
  const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!hubspotToken) {
    console.error('HubSpot access token not configured');
    return NextResponse.json(
      { error: 'HubSpot access token not configured', briefings: [] },
      { status: 500 }
    );
  }

  try {
    console.log('Fetching briefings from HubSpot...');
    const response = await fetch(
      'https://api.hubapi.com/cms/v3/blogs/posts?limit=10&state=PUBLISHED&sort=-publishDate',
      {
        headers: {
          Authorization: `Bearer ${hubspotToken}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('HubSpot API Error:', response.status, errorData);
      return NextResponse.json({ briefings: [], error: errorData }, { status: response.status });
    }

    const data = await response.json();
    console.log('HubSpot raw response:', JSON.stringify(data, null, 2));

    const briefings = (data.results || []).map((post: any) => {
      const date = new Date(post.publishDate || post.created);
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      let excerpt = '';
      if (post.postBody) {
        excerpt = post.postBody.replace(/<[^>]*>/g, '').substring(0, 200) + '...';
      } else if (post.metaDescription) {
        excerpt = post.metaDescription;
      }

      const linkedInUrl = post.linkRelCanonicalUrl || post.url;

      const briefing = {
        title: post.name || post.htmlTitle || 'Untitled',
        publishDate: formattedDate,
        excerpt: excerpt,
        fullContent: post.postBody || post.post_body || '',
        featuredImage: post.featuredImage || 'https://placehold.co/1200x627/1e3a5f/ffffff?text=CSP+Briefing',
        linkedInUrl: linkedInUrl,
        authorName: post.authorName || post.blogAuthor?.displayName || 'Kevin Martin, MBA',
        authorAvatar: post.blogAuthor?.avatar || '/1743701547902.jpeg'
      };

      console.log('Transformed briefing:', briefing);
      return briefing;
    });

    console.log('Total briefings transformed:', briefings.length);
    return NextResponse.json({ briefings });
  } catch (error) {
    console.error('Error fetching briefings:', error);
    return NextResponse.json({ briefings: [], error: 'Failed to fetch briefings' }, { status: 500 });
  }
}