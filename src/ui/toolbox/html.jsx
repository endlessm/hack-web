/* Copyright © 2020 Endless OS LLC
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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

const Toolbox = ({ onErrors, controls }) => {
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
    <DynToolbox toolbox={toolbox} xs={12} controls={controls} />
  );
};

Toolbox.propTypes = {
  onErrors: PropTypes.func,
  controls: PropTypes.element,
};

Toolbox.defaultProps = {
  onErrors: null,
  controls: null,
};

export default Toolbox;
