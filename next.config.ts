import type { NextConfig } from "next";

const useBasePath = process.env.USE_BASE_PATH === 'true';
const useStandalone = process.env.USE_STANDALONE === 'true';

const nextConfig: NextConfig = {
  output: useStandalone ? 'standalone' : undefined,
  basePath: useBasePath ? "/wyn" : "",
  assetPrefix: useBasePath ? "/wyn" : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: useBasePath ? "/wyn" : "",
  },
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

// Import withNextIntl for next-intl plugin support
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);
