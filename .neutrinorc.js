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
      ],
    }),
  ],
};
