import React from 'react';
import {
  Code,
  Widgets,
} from '@material-ui/icons';
import Blockly from 'blockly/core';
// eslint-disable-next-line unused-imports/no-unused-imports
import BlocklyJS from 'blockly/javascript';

import DynToolbox from './dynamic';
import toolbox from './p5.toolbox.xml';
import initialBlocks from './p5.blocks.xml';

function regenerateCode(params) {
  if (!params.code) {
    return '';
  }

  return params.code;
}

function compileCode(code) {
  if (code === '') {
    return null;
  }

  return { code };
}

// Custom blockly blocks
const P5_BLOCKS = {
  p5_background: {
    init: {
      tooltip: 'Set the background.',
      message0: 'background %1',
      args0: [{ type: 'input_value', name: 'COLOUR' }],
      previousStatement: null,
      nextStatement: null,
    },
    generator: {
      fn: 'background',
    },
  },
  p5_strokeWeight: {
    init: {
      tooltip: 'Set the stroke weight.',
      message0: 'stroke %1',
      args0: [{ type: 'input_value', name: 'WEIGHT', check: 'Number' }],
      previousStatement: null,
      nextStatement: null,
    },
    generator: {
      fn: 'strokeWeight',
    },
  },
  p5_strokeColor: {
    init: {
      tooltip: 'Set the stroke colour.',
      message0: 'stroke colour %1',
      args0: [{ type: 'input_value', name: 'COLOUR' }],
      previousStatement: null,
      nextStatement: null,
    },
    generator: {
      fn: 'stroke',
    },
  },
  p5_fill: {
    init: {
      tooltip: 'Set the fill colour.',
      message0: 'fill %1',
      args0: [{ type: 'input_value', name: 'COLOUR' }],
      previousStatement: null,
      nextStatement: null,
    },
    generator: {
      fn: 'fill',
    },
  },
  p5_noFill: {
    init: {
      tooltip: 'Clean the fill color.',
      message0: 'no fill',
      previousStatement: null,
      nextStatement: null,
    },
    generator: {
      fn: 'noFill',
    },
  },
  p5_circle: {
    init: {
      tooltip: 'Draw a circle.',
      message0: 'circle with radius %3 x %1 y %2',
      previousStatement: null,
      nextStatement: null,
      args0: [
        { type: 'input_value', name: 'X', check: 'Number' },
        { type: 'input_value', name: 'Y', check: 'Number' },
        { type: 'input_value', name: 'RADIUS', check: 'Number' },
      ],
    },
    generator: {
      fn: 'circle',
    },
  },
  p5_rect: {
    init: {
      tooltip: 'Draw a rectangle.',
      message0: 'rectangle with x %1 y %2 width %3 height %4',
      previousStatement: null,
      nextStatement: null,
      args0: [
        { type: 'input_value', name: 'X', check: 'Number' },
        { type: 'input_value', name: 'Y', check: 'Number' },
        { type: 'input_value', name: 'WIDTH', check: 'Number' },
        { type: 'input_value', name: 'HEIGHT', check: 'Number' },
      ],
    },
    generator: {
      fn: 'rect',
    },
  },
  p5_triangle: {
    init: {
      tooltip: 'Draw a triangle.',
      message0: 'triangle with x1 %1 y1 %2 x2 %3 y2 %4 x3 %5 y3 %6',
      previousStatement: null,
      nextStatement: null,
      args0: [
        { type: 'input_value', name: 'X1', check: 'Number' },
        { type: 'input_value', name: 'Y1', check: 'Number' },
        { type: 'input_value', name: 'X2', check: 'Number' },
        { type: 'input_value', name: 'Y2', check: 'Number' },
        { type: 'input_value', name: 'X3', check: 'Number' },
        { type: 'input_value', name: 'Y3', check: 'Number' },
      ],
    },
    generator: {
      fn: 'triangle',
    },
  },
  p5_text: {
    init: {
      tooltip: 'Draw text.',
      message0: 'text %1 in x %2 y %3',
      previousStatement: null,
      nextStatement: null,
      args0: [
        { type: 'input_value', name: 'TEXT', check: 'String' },
        { type: 'input_value', name: 'X', check: 'Number' },
        { type: 'input_value', name: 'Y', check: 'Number' },
      ],
    },
    generator: {
      fn: 'text',
    },
  },
  p5_textSize: {
    init: {
      tooltip: 'Set the text size.',
      message0: 'text size %1',
      previousStatement: null,
      nextStatement: null,
      args0: [
        { type: 'input_value', name: 'SIZE', check: 'number' },
      ],
    },
    generator: {
      fn: 'textSize',
    },
  },
  p5_line: {
    init: {
      tooltip: 'Draw a line.',
      message0: 'line x1 %1 y1 %2 x2 %3 y2 %4',
      previousStatement: null,
      nextStatement: null,
      args0: [
        { type: 'input_value', name: 'X1', check: 'Number' },
        { type: 'input_value', name: 'Y1', check: 'Number' },
        { type: 'input_value', name: 'X2', check: 'Number' },
        { type: 'input_value', name: 'Y2', check: 'Number' },
      ],
    },
    generator: {
      fn: 'line',
    },
  },
};

Object.keys(P5_BLOCKS).forEach((key, index) => {
  const b = P5_BLOCKS[key];
  Blockly.Blocks[key] = {
    init() {
      this.jsonInit({ ...b.init, colour: (20 * index) % 360 });
    },
  };
  Blockly.JavaScript[key] = (block) => {
    if (!b.init.args0) {
      return `  ${b.generator.fn}();\n`;
    }

    const params = b.init.args0.map((p) => (
      Blockly.JavaScript.valueToCode(
        block, p.name, Blockly.JavaScript.ORDER_ATOMIC,
      )
    ));
    return `  ${b.generator.fn}(${params.join(', ')});\n`;
  };
});

const compileBlocks = (workspace) => {
  const jscode = Blockly.JavaScript.workspaceToCode(workspace);

  const code = `
function setup() {
  createCanvas(400, 400);
}

function draw() {
${jscode}
}
`;

  return { code };
};

const TOOLBOX = {
  tabs: [
    {
      name: 'Blocks',
      icon: <Widgets />,
      grid: [
        {
          title: 'Blocks',
          type: 'blockly',
          xs: 12,
          compile: compileBlocks,
          initialXml: initialBlocks,
          toolbox,
        },
      ],
    },
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
