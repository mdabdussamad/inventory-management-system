/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',  
        hostname: 'res.cloudinary.com', 
        pathname: "/**", // Allow all paths under Cloudinary         
      },  
      {
        protocol: "https",
        hostname: "gs9lry6mx0.ufs.sh",
        pathname: "/f/**", // Allow UploadThing file paths
      }   
    ],
  },
};

export default nextConfig;

