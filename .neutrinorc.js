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
        title: 'Hack'
      }
    }),
    jest(),
    copy({
      patterns: [
        {
          from: 'src/pathways',
          to: 'assets/pathways',
        },
        {
          from: 'src/quests',
          to: 'assets/quests',
        },
        {
          from: 'hack-toy-apps/com.hack_computer.Fizzics/app',
          to: 'apps/com.hack_computer.Fizzics/',
        },
        {
          from: 'src/ui/toolbox/assets',
          to: 'assets/toolbox',
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
    },
  ],
};
