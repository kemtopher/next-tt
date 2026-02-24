/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.sndcdn.com',
            },
            {
                protocol: 'https',
                hostname: 'soundcloud.com',
            },
            {
                protocol: 'https',
                hostname: 'images.prismic.io',
            },
        ],
    }
};

export default nextConfig;
