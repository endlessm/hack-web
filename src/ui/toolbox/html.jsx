import React from 'react';
import PropTypes from 'prop-types';
import {
  Code,
  Style,
} from '@material-ui/icons';
import DynToolbox from './dynamic';

function regenerateCode(sourceName, params) {
  if (!params[sourceName]) {
    return '';
  }

  return params[sourceName];
}

function compileCode(sourceName, code) {
  if (code.trim() === '') {
    return null;
  }

  return { [sourceName]: code };
}

const Toolbox = ({ onErrors }) => {
  const toolbox = {
    tabs: [
      {
        name: 'HTML',
        icon: <Code />,
        grid: [
          {
            title: 'HTML',
            type: 'code',
            xs: 12,
            code: regenerateCode.bind(this, 'html'),
            compile: compileCode.bind(this, 'html'),
            mode: 'html',
            buildDelay: 500,
            fullHeight: true,
            onErrors,
          },
        ],
      },
      {
        name: 'CSS',
        icon: <Style />,
        grid: [
          {
            title: 'Styles',
            type: 'code',
            xs: 12,
            code: regenerateCode.bind(this, 'css'),
            compile: compileCode.bind(this, 'css'),
            mode: 'css',
            buildDelay: 500,
            fullHeight: true,
            onErrors,
          },
        ],
      },
    ],
  };

  return (
    <DynToolbox toolbox={toolbox} xs={12} />
  );
};

Toolbox.propTypes = {
  onErrors: PropTypes.func,
};

Toolbox.defaultProps = {
  onErrors: null,
};

export default Toolbox;
