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
                // CORRECTED: The protocol should be 'https', not 'https://'.
                protocol: 'https',
                hostname: 'placehold.co',
                port: '',
                pathname: '/**',
            }
        ],
    },
};

export default nextConfig;
