import React from 'react';
import {
  Code,
  Casino,
  BugReport,
} from '@material-ui/icons';
import DynToolbox from './dynamic';

const ASSETS = '/assets/toolbox/sidetrack';

const ROBOTA = [
  { key: 'up', value: 'up', image: `${ASSETS}/robotAUp.png` },
  { key: 'down', value: 'down', image: `${ASSETS}/robotADown.png` },
];

const ROBOTB = [
  { key: 'up', value: 'up', image: `${ASSETS}/robotBUp.png` },
  { key: 'down', value: 'down', image: `${ASSETS}/robotBDown.png` },
];

function robotsCode(params) {
  return `
    robotADirection = '${params.robotADirection}';
    robotBDirection = '${params.robotBDirection}';
`;
}

function compileRobotsCode(code) {
  const scope = {
    robotADirection: 'up',
    robotBDirection: 'down',
  };

  try {
    // eslint-disable-next-line no-new-func
    const func = new Function('scope', `with(scope){\n${code}\n;}`);
    func(scope);
  } catch (e) {
    return null;
  }

  return {
    robotADirection: scope.robotADirection,
    robotBDirection: scope.robotBDirection,
  };
}

function instructionCode(p, params) {
  if (!params[p]) {
    return '';
  }
  return params[p];
}

function compileCode(p, code) {
  if (code.trim() === '') {
    return null;
  }

  return { [p]: code };
}

const TOOLBOX = {
  tabs: [
    {
      name: 'Instructions',
      icon: <Code />,
      grid: [
        {
          title: 'Code',
          type: 'code',
          xs: 12,
          code: instructionCode.bind(this, 'instructionCode'),
          compile: compileCode.bind(this, 'instructionCode'),
          buildDelay: 0,
        },
      ],
    },
    {
      name: 'Level',
      icon: <Casino />,
      grid: [
        {
          title: 'Code',
          type: 'code',
          xs: 12,
          code: instructionCode.bind(this, 'levelCode'),
          compile: compileCode.bind(this, 'levelCode'),
          buildDelay: 0,
        },
      ],
    },
    {
      name: 'Robots',
      icon: <BugReport />,
      grid: [
        {
          title: 'Robots',
          type: 'panel',
          xs: 12,
          grid: [
            {
              title: 'Robot A',
              type: 'select',
              xs: 6,
              items: ROBOTA,
              param: 'robotADirection',
            },
            {
              title: 'Robot B',
              type: 'select',
              xs: 6,
              items: ROBOTB,
              param: 'robotBDirection',
            },
          ],
        },
        {
          title: 'Code',
          type: 'code',
          xs: 12,
          code: robotsCode,
          compile: compileRobotsCode,
          buildDelay: 0,
        },
      ],
    },
  ],
};

const Toolbox = () => (
  <DynToolbox toolbox={TOOLBOX} />
);

export default Toolbox;
