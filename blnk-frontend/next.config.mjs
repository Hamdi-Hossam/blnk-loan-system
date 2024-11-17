import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  swcMinify: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // ! remove CSP for now, as it is not working for some reason.
          // {
          //   key: "Content-Security-Policy",
          //   value:
          //     "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.example.com;",
          // },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
  experimental: {
    optimizeCss: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // CSV/Excel file support
    config.module.rules.push({
      test: /\.(csv|xlsx|xls)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "static/files/",
          },
        },
      ],
    });
    // Optimize for large datasets
    if (!isServer) {
      if (config.optimization.splitChunks === false) {
        config.optimization.splitChunks = {};
      }
      if (typeof config.optimization.splitChunks.cacheGroups === "undefined") {
        config.optimization.splitChunks.cacheGroups = {};
      }
      config.optimization.splitChunks.cacheGroups.commons = {
        test: /[\\/]node_modules[\\/]/,
        name: "vendors",
        chunks: "all",
      };
    }
    // Add support for WebAssembly if needed for complex calculations
    config.experiments = { ...config.experiments, asyncWebAssembly: true };
    return config;
  },
};

export default withNextIntl(nextConfig);
