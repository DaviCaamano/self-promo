require('dotenv').config({ path: '../../.env' });
const jsonImporter = require('node-sass-json-importer');

let backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT;
backendPort = !backendPort || backendPort === '80' ? '' : ':' + backendPort;
let backendHost = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost';
//Next.js redirection does not allow localhost.
if (backendHost === 'http://localhost') {
    backendHost = 'http://127.0.0.1';
}

module.exports = {
    reactStrictMode: true,
    transpilePackages: ['shared'],
    experimental: {
        serverActions: true,
    },
    async rewrites() {
        return {
            fallback: [
                {
                    source: '/api/:path*',
                    destination: `${backendHost}${backendPort}/data/:path*`, // Proxy to Backend
                },
            ],
        };
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/i,
            use: ['@svgr/webpack'],
        });
        return config;
    },
    sassOptions: {
        importer: jsonImporter(),
    },
};
