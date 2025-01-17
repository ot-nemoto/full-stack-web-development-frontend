import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/industry/products',
        permanent: true, // 永続的なリダイレクト（301）
      },
    ];
  },
};

export default nextConfig;
