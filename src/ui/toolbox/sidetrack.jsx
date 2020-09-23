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
import {
  Code,
  Casino,
  BugReport,
} from '@material-ui/icons';
import DynToolbox from './dynamic';

const ASSETS = 'assets/toolbox/sidetrack';

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

// The following code used to validate the instructionCode and the levelCode is copied from
// the hack-toy-apps mosly from the file src/RileyMaze/userFunctions.js
const FORWARD = 1;
const UP = 2;
const DOWN = 3;
const JUMP = 4;
const PUSH = 5;
const MAX_QUEUE_LEN = 8;

const Riley = {
  queue: [],
  checkMoves() {
    if (this.queue.length > MAX_QUEUE_LEN) {
      throw new Error('Instructions must have 8 moves.');
    }
  },
  forward() {
    this.queue.push(FORWARD);
    this.checkMoves();
  },
  up() {
    this.queue.push(UP);
    this.checkMoves();
  },
  down() {
    this.queue.push(DOWN);
    this.checkMoves();
  },
  jump() {
    this.queue.push(JUMP);
    this.checkMoves();
  },
  push() {
    this.queue.push(PUSH);
    this.checkMoves();
  },
};

const Handler = {
  get(target, name, receiver) {
    if (name in target) {
      return Reflect.get(target, name, receiver);
    }

    throw new Error(`unknown instruction ${name}`);
  },
};

const UNITS = ['wall', 'pit', 'robotA', 'robotB'];
const LevelEditScope = {
  wall: 'wall',
  pit: 'pit',
  robotA: 'robotA',
  robotB: 'robotB',
  rileyPosition: 0,
  goalPosition: 2,
  add(unit, x, y) {
    if (Number.isNaN(Number(x))) {
      throw new TypeError(`${x} isn't a number.`);
    }
    if (Number.isNaN(Number(y))) {
      throw new TypeError(`${y} isn't a number.`);
    }
    if (!UNITS.includes(unit)) {
      throw new Error(`${unit} isn't a valid unit.`);
    }
    if (x < 0 || x > 7) {
      throw new RangeError('x must be between 0 and 7.');
    }
    if (y < 0 || y > 4) {
      throw new RangeError('y must be between 0 and 4.');
    }
  },
};

const PositionHandler = {
  set(obj, prop, value) {
    if ((prop === 'rileyPosition' || prop === 'goalPosition') && Number.isNaN(Number(value))) {
      throw new TypeError(`Value for ${prop} must be a number.`);
    } else if ((prop === 'rileyPosition' || prop === 'goalPosition') && (value < 0 || value > 4)) {
      throw new RangeError(`${prop} must be between 0 and 4.`);
    } else {
      return Reflect.set(obj, prop, value);
    }
  },
};

const RileyProxy = new Proxy(Riley, Handler);

const validateInstructions = (code) => {
  Riley.queue.length = 0;
  const scope = { riley: RileyProxy };

  // eslint-disable-next-line no-new-func
  const factoryFunc = new Function('scope', `with(scope) { ${code} };`);
  factoryFunc(scope);

  if (scope.riley.queue.length < MAX_QUEUE_LEN) {
    throw new Error('Instructions in code must have 8 moves.');
  }
};

const validateLevel = (code) => {
  const scope = new Proxy({ ...LevelEditScope }, PositionHandler);

  // eslint-disable-next-line no-new-func
  const factoryFunc = new Function('scope', `with(scope) { ${code} };`);
  factoryFunc(scope);
};

// This function is copied from the repo hack-toy-apps, file src/codeview.js
const getErrorLine = (exception) => {
  window.err = exception;
  const stackFrames = exception.stack.split('\n');
  // The format of stack frames originating inside a function created with
  // new Function(...) looks like this:
  // /original/file.js line 321 > Function:12:3. We are looking for the
  // topmost such line, since that will contain the line and column where
  // the exception was thrown in the user code (12 and 3 in this example)
  const fixedDelta = 3;
  // FIXME: However, for some reason, the trace shows up that the error is
  // in the next 3 lines where the error actually is. For more details,
  // see https://phabricator.endlessm.com/T29104#793998

  // Firefox: > Function:row:column
  // Chrome: <anonymous>:row:column
  const userScriptStackFrame = stackFrames.find((line) => (/ (> Function|<anonymous>):/).test(line));
  if (!userScriptStackFrame) {
    return [0, 0];
  }

  const [line, column] = userScriptStackFrame.split(':').slice(-2);
  return [Math.max(0, line - fixedDelta), column ? column - 1 : 0];
};

function instructionCode(_p, code) {
  if (!code) {
    return '';
  }

  return code;
}

let lastAnnotationId = 0;
function compileCode(p, code) {
  const annotations = [];

  if (code.trim() === '') {
    return null;
  }

  const validateFunction = p === 'instructionCode' ? validateInstructions : validateLevel;
  try {
    validateFunction(code);
  } catch (e) {
    const [row, column] = getErrorLine(e);
    lastAnnotationId += 1;
    annotations.push({
      type: 'error',
      text: e.message,
      row,
      column,
      // Unique id to make each compilation annotation object different, to
      // ensure that the annotations are updated and the code editor is
      // rendered.
      id: lastAnnotationId,
    });
  }

  return { [p]: code, annotations };
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
          code: instructionCode.bind(this, 'instructionCode'),
          compile: compileCode.bind(this, 'instructionCode'),
          mode: '',
          buildDelay: 2000,
          fullHeight: true,
          selector: 'instructionCode',
        },
      ],
    },
    {
      name: 'Level',
      icon: <Casino />,
      disabled: true,
      grid: [
        {
          title: 'Code',
          type: 'code',
          xs: 12,
          code: instructionCode.bind(this, 'levelCode'),
          compile: compileCode.bind(this, 'levelCode'),
          mode: 'javascript',
          buildDelay: 2000,
          fullHeight: true,
          selector: 'levelCode',
        },
      ],
    },
    {
      name: 'Robots',
      icon: <BugReport />,
      disabled: true,
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
          type: 'panel',
          xs: 12,
          grid: [
            {
              title: 'Code',
              type: 'code',
              xs: 12,
              code: robotsCode,
              compile: compileRobotsCode,
              mode: 'javascript',
              buildDelay: 2000,
            },
          ],
        },
      ],
    },
  ],
};

const Toolbox = () => (
  <DynToolbox toolbox={TOOLBOX} />
);

export { Toolbox as default, validateLevel, validateInstructions };
