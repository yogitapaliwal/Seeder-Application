import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-webpack5';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-webpack5-compiler-babel'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (webpackConfig) => {
    if (webpackConfig.resolve) {
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        '@': path.resolve(dirname, '../src'),
      };
    }

    // Storybook's own default asset rule matches `*.svg` even with a `?react`
    // query string, so it double-processes the same file as our SVGR rule
    // below and clobbers the result (Icon ends up with a raw URL instead of
    // a component). Exclude `?react` requests from it explicitly.
    webpackConfig.module?.rules?.forEach((rule) => {
      if (
        rule &&
        typeof rule === 'object' &&
        'test' in rule &&
        rule.test instanceof RegExp &&
        rule.test.source.includes('svg')
      ) {
        rule.resourceQuery = { not: [/react/] };
      }
    });

    webpackConfig.module?.rules?.unshift({
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
    });
    return webpackConfig;
  },
};

export default config;
