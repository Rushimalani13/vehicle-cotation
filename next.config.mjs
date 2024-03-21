/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, 
    images : { 
      domains : ['imgd.aeplcdn.com','images.pexels.com'] 
    },
    eslint: {
      ignoreDuringBuilds: true,
  }, 
};

export default nextConfig;
