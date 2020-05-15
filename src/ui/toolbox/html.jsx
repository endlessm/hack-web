import React from 'react';
import PropTypes from 'prop-types';
import {
  Code,
} from '@material-ui/icons';
import DynToolbox from './dynamic';

function regenerateCode(params) {
  if (!params.code) {
    return '';
  }

  return params.code;
}

function compileCode(code) {
  if (code.trim() === '') {
    return null;
  }

  return { code };
}

const Toolbox = ({ onErrors }) => {
  const toolbox = {
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
            mode: 'html',
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
