/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                hostname: ["localhost", "api.adzoner.com"]
            },
        ],
    },
};

module.exports = nextConfig;
