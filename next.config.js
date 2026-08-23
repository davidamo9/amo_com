/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        // SecondBrain was merged into the amoOS case study
        source: "/secondbrain",
        destination: "/amoos",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
