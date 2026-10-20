import path from 'node:path';
import { fileURLToPath } from 'node:url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import pkg from 'webpack';
const webpack = pkg;

// Recreate __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Loads .env into this Node process (webpack itself), not the browser bundle -
// DefinePlugin below is what actually makes REACT_APP_API_URL available to app code.
try {
  process.loadEnvFile(path.resolve(__dirname, '.env'));
} catch {
  // No .env file - fall back to whatever REACT_APP_API_URL is already in the environment.
}

export default {
  mode: 'development',
  entry: './src/index.tsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
    publicPath: '/',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    // 1. ADD AN ALIAS FALLBACK TO DIRECTLY LINK 'process' TO THE BROWSER COMPATIBLE VERSION
    alias: {
      process: 'process/browser.js',
      '@': path.resolve(__dirname, 'src'),
    },
    fallback: {
      process: 'process/browser.js',
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.ProvidePlugin({
      // 2. USE THE RESOLVED ALIAS PATH FOR GLOBAL INJECTION
      process: 'process',
    }),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_API_URL': JSON.stringify(process.env.REACT_APP_API_URL),
    }),
  ],

  module: {
    rules: [
      // 3. ALLOW LOOSE EXTENSION MATCHES FOR ALL JS/MJS FILES
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.svg$/i,
        resourceQuery: /react/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: { removeViewBox: false },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(svg|gif)$/i,
        resourceQuery: { not: [/react/] },
        type: 'asset/resource',
      },
    ],
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
};
