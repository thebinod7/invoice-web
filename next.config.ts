import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: '/invoice-builder',
                destination: '/create-invoice',
                permanent: true,
            },
            {
                source: '/invoice-builder/:path*',
                destination: '/create-invoice',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
