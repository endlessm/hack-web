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
    airbnb(),
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
