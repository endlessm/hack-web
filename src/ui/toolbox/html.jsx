import React from 'react';
import {
  Code,
} from '@material-ui/icons';
import parseXML from 'xml-js';
import DynToolbox from './dynamic';

function regenerateCode(params) {
  if (!params.code) {
    return '';
  }

  const annotations = [];
  try {
    parseXML.xml2json(params.code);
  } catch (e) {
    const [message, row, column] = e.message.split('\n');

    const getNumber = (line) => {
      if (!line) {
        return 0;
      }

      return line.split(':')[1].trim();
    };

    annotations.push({
      text: message,
      row: getNumber(row),
      column: getNumber(column),
      type: 'error',
    });
  }

  return {
    text: params.code,
    annotations,
  };
}

function compileCode(code) {
  if (code.trim() === '') {
    return null;
  }

  return { code };
}

const TOOLBOX = {
  tabs: [
    {
      name: 'Code',
      icon: <Code />,
      grid: [
        {
          title: 'Code',
          type: 'code',
          xs: 12,
          code: regenerateCode,
          compile: compileCode,
          buildDelay: 500,
          fullHeight: true,
        },
      ],
    },
  ],
};

const Toolbox = () => (
  <DynToolbox toolbox={TOOLBOX} xs={12} />
);

export default Toolbox;
