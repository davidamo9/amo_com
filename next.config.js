/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        // Canonical host: send www to the apex domain
        source: "/:path*",
        has: [{ type: "host", value: "www.aungmyintoo.com" }],
        destination: "https://aungmyintoo.com/:path*",
        permanent: true,
      },
      {
        // SecondBrain was merged into the amoOS case study
        source: "/secondbrain",
        destination: "/amoos",
        permanent: true,
      },
      {
        // Atlas (abandoned) was replaced by the amoOS MCP case study
        source: "/atlas",
        destination: "/amoos-mcp",
        permanent: true,
      },
      {
        // Speech analysis grew into the meeting intelligence stack
        source: "/asr",
        destination: "/meeting-intelligence",
        permanent: true,
      },
      {
        // AI Chat grew into the agentic chat systems case study
        source: "/ai-chat",
        destination: "/agentic-chat",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
