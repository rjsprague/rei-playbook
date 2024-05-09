/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // experimental: {
    //     nextScriptWorkers: true,
    // },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname:'s3.us-east-2.amazonaws.com',
                port: '',
                pathname: '/sendlift/seller-site-images/167/**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/dltbdqbm0/image/upload/**/**'
            }
        ],
    },
}

module.exports = nextConfig
