/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                hostname: "localhost"
            },
            {
                protocol: 'https',
                hostname: 'api.adzoner.com'
            }
        ],
    },
};

module.exports = nextConfig;
