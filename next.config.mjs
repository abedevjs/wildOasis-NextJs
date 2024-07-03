/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vzgwozhamclptaujkszo.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  // output: "export",//Utk static. Pastikan semua route sdh static lewat fn generateStaticParams
};

export default nextConfig;
