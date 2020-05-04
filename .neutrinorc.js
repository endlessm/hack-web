const path = require('path');

const neutrino = require('neutrino');
const airbnb = require('@neutrinojs/airbnb');
const react = require('@neutrinojs/react');
const jest = require('@neutrinojs/jest');
const copy = require('@neutrinojs/copy');


module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    airbnb({
      eslint: {
        baseConfig: {
          plugins: ['unused-imports'],
          globals: {
            CONFIG: true,
          },
          rules: {
            'no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 2,
            'unused-imports/no-unused-vars': 1,
          },
        },
      },
    }),
    react({
      html: {
        title: 'Hack',
        favicon: 'src/favicons/favicon.png',
        template: 'src/template.ejs',
      },
    }),
    jest(),
    copy({
      patterns: [
        {
          from: 'src/avatars',
          to: 'assets/avatars',
        },
        {
          from: 'src/cards',
          to: 'assets/cards',
        },
        {
          from: 'src/articles',
          to: 'assets/articles',
        },
        {
          from: 'src/favicons',
          to: 'favicons/',
        },
        {
          from: 'apps',
          to: 'apps/',
        },
        {
          from: 'src/ui/toolbox/assets',
          to: 'assets/toolbox',
        },
        {
          from: 'src/sounds',
          to: 'assets/sounds',
        },
        {
          from: 'node_modules/pdfjs-dist/build/pdf.worker.js',
        },
      ],
    }),
    (neutrino) => {
      neutrino.config.module
              .rule('ink')
              .test(/\.ink$/)
              .use('ink')
              .loader(path.resolve('./webpack-loaders/ink-loader.js'))
              .options({});

      // Remove default rule for SVG image:
      const test = neutrino.config.module
                           .rule('image')
                           .get('test')
                           .toString()
                           .slice(1, -1)
                           .replace('|svg', '');
      neutrino.config.module.rule('image').test(new RegExp(test));

      // Handle SVG using svgr library:
      neutrino.config.module
                           .rule('svg')
                           .test(/\.svg$/)
                           .use('webpack')
                           .loader('@svgr/webpack')
                           .options({
                             svgoConfig: { "plugins": [
                               { "removeStyleElement": true },
                               { "inlineStyles": false },
                             ] },
                           });
    },
  ],
};
