import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'Missing url' }, { status: 400 });
    }

    const oembedUrl = `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(url)}`;

    const res = await fetch(oembedUrl, { next: { revalidate: 3600 } });
    if (!res.ok) {
        return NextResponse.json(
            { error: 'SoundCloud oEmbed failed' },
            { status: 502 }
        );
    }

    const data = await res.json();

    return NextResponse.json({
        title: data.title,
        description: data.description,
        author: data.author_name,
        thumbnailUrl: data.thumbnail_url,
        height: data.height,
        width: data.height,
        embedHtml: data.html,
        authorUrl: data.author_url,
    });
}
