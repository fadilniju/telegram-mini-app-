/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // This allows Next.js to optimize images from the specified domains.
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.pollinations.ai',
                port: '',
                pathname: '/prompt/**',
            },
            {
                // This is for the fallback developer avatar I added.
                protocol: 'https://',
                hostname: 'placehold.co',
                port: '',
                pathname: '/**',
            }
        ],
    },
};

export default nextConfig;
