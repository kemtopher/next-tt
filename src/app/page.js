import HomeContent from '../components/HomeContent/HomeContent';
import { createClient } from '../prismicio';

async function fetchSoundCloudData(url) {
    try {
        // Absolute URL required on the server
        const baseUrl =
            process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL
                ? `https://${process.env.VERCEL_URL}`
                : 'http://localhost:3000';

        const res = await fetch(
            `${baseUrl}/api/soundcloud?url=${encodeURIComponent(url)}`,
            {
                // Cache/revalidate 1 hour
                next: { revalidate: 3600 },
            }
        );

        if (!res.ok) {
            console.error('SoundCloud API failed:', res.status);
            return null;
        }

        return await res.json();
    } catch (err) {
        console.error('ERROR fetching SoundCloud:', err);
        return null;
    }
}

export default async function Home() {
    const client = createClient();
    const homePage = await client.getSingle('home_page');

    const soundCloudUrl = homePage.data.soundcloud_embed_link?.[0]?.text;
    const soundCloudData = soundCloudUrl
        ? await fetchSoundCloudData(soundCloudUrl)
        : null;

    return (
        <HomeContent
            homePage={homePage}
            soundCloudUrl={soundCloudUrl}
            soundCloudData={soundCloudData}
        />
    );
}
