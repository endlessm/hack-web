import React from 'react';
import {
  Build,
  Code,
} from '@material-ui/icons';
import PropTypes from 'prop-types';

import DynToolbox from './dynamic';

const SPECIES = 5;
const ASSETS = '/assets/toolbox/fizzics';
const BACKGROUNDS = [
  { key: '0', value: 'grid', image: `${ASSETS}/backgrounds/0.png` },
  { key: '1', value: 'space', image: `${ASSETS}/backgrounds/1.png` },
  { key: '2', value: 'grass', image: `${ASSETS}/backgrounds/2.png` },
];
const SKINS = [
  'green',
  'spikes',
  'amoeba',
  'spaceship',
  'rocky',
  'earth',
  'cricket',
  'mole',
  'star',
  'sphere',
  'diamond',
];

const SKIN_IMAGES = SKINS.map((id, idx) => (
  { key: idx.toString(), value: id, image: `${ASSETS}/skins/${idx}.png` }
));

function getPropsForGlobals() {
  return {
    background: 'backgroundImageIndex',
    showDragTool: 'moveToolActive',
    showFlingTool: 'flingToolActive',
    showAddTool: 'createToolActive',
    showDeleteTool: 'deleteToolActive',
  };
}

function getPropsForIndex(index) {
  return {
    radius: `radius_${index}`,
    gravity: `gravity_${index}`,
    bounce: `collision_${index}`,
    friction: `friction_${index}`,
    frozen: `usePhysics_${index}`,
    attraction0: `socialForce_${index}_0`,
    attraction1: `socialForce_${index}_1`,
    attraction2: `socialForce_${index}_2`,
    attraction3: `socialForce_${index}_3`,
    attraction4: `socialForce_${index}_4`,
    skin: `imageIndex_${index}`,
    vfxBad: `deathVisualBad_${index}`,
    sfxBad: `deathSoundBad_${index}`,
    vfxGood: `deathVisualGood_${index}`,
    sfxGood: `deathSoundGood_${index}`,
  };
}


function generateCodeForIndex(params, index) {
  let code = `
// ${index}
`;
  const props = getPropsForIndex(index);
  Object.keys(props).forEach((prop) => {
    const value = params[props[prop]];
    code += `species[${index}].${prop} = ${value};\n`;
  });
  return code;
}

function regenerateCode(params) {
  let code = `
////////////////////////////
// Globals
////////////////////////////

`;
  const props = getPropsForGlobals();
  Object.keys(props).forEach((prop) => {
    const value = params[props[prop]];
    code += `${prop} = ${value};\n`;
  });
  code += `
////////////////////////////
// Species
////////////////////////////
`;

  Array.from({ length: SPECIES }).forEach((value, index) => {
    code += `${generateCodeForIndex(params, index)}`;
  });

  return code;
}

function createScopeWithProps(props) {
  const scope = {};
  [BACKGROUNDS].forEach((names) => {
    names.forEach((item) => {
      scope[item.value] = item.key;
    });
  });
  Object.keys(props).forEach((prop) => {
    scope[prop] = null;
  });

  return scope;
}

function createScopeForObject(index) {
  const props = getPropsForIndex(index);
  return createScopeWithProps(props);
}

function createScope() {
  const props = getPropsForGlobals();
  const scope = createScopeWithProps(props);
  scope.species = Array.from({ length: SPECIES }).map((value, index) => (
    createScopeForObject(index)
  ));
  return scope;
}

const getSpeciesImage = (index, params) => {
  const idx = params[`imageIndex_${index}`];
  const image = `${ASSETS}/skins/${idx}.png`;
  return <img src={image} alt={index} />;
};

const updateAppWithCode = (scope, params) => {
  const species = Array.from({ length: SPECIES }).map((value, index) => index);
  const model = { ...params };
  const updateModel = (s, props) => {
    Object.keys(props).forEach((prop) => {
      if (s[prop] === null) {
        return;
      }
      const modelProp = props[prop];
      const val = s[prop];
      if (val === model[modelProp]) {
        return;
      }
      model[modelProp] = val;
    });
  };

  const updateModelFromObject = (object, index) => {
    const props = getPropsForIndex(index);
    updateModel(object, props);
  };

  updateModel(scope, getPropsForGlobals());
  species.forEach((index) => {
    updateModelFromObject(scope.species[index], index);
  });

  return model;
};

const compileCode = (code, params) => {
  if (code === '') {
    return null;
  }

  const scope = createScope();
  try {
    // eslint-disable-next-line no-new-func
    const func = new Function('scope', `with(scope){\n${code}\n;}`);
    func(scope);
  } catch (e) {
    // TODO: add annotations to editor
    // [{ row: 0, column: 2, type: 'error', text: 'Some error.'}]
    return null;
  }

  return updateAppWithCode(scope, params);
};

const TOOLBOX = {
  tabs: [
    {
      name: 'Tools',
      icon: <Build />,
      grid: [
        {
          title: 'Background',
          type: 'select',
          xs: 4,
          items: BACKGROUNDS,
          param: 'backgroundImageIndex',
        },
        {
          title: 'Tools',
          type: 'checkbox',
          xs: 8,
          items: [
            { label: 'Drag', key: 'moveToolActive' },
            { label: 'Fling', key: 'flingToolActive' },
            { label: 'Add', key: 'createToolActive' },
            { label: 'Delete', key: 'deleteToolActive' },
          ],
        },
        {
          type: 'tabs',
          items: [
            { label: '0', icon: getSpeciesImage.bind(this, 0) },
            { label: '1', icon: getSpeciesImage.bind(this, 1) },
            { label: '2', icon: getSpeciesImage.bind(this, 2) },
            { label: '3', icon: getSpeciesImage.bind(this, 3) },
            { label: '4', icon: getSpeciesImage.bind(this, 4) },
          ],
          // for each item we'll have the same panel
          panel: (item) => [
            {
              title: 'Image',
              type: 'select',
              xs: 4,
              items: SKIN_IMAGES,
              param: `imageIndex_${item.label}`,
            },
            {
              title: 'Physics',
              type: 'panel',
              xs: 8,
              grid: [
                {
                  xs: 4,
                  type: 'number',
                  label: 'Radius',
                  param: `radius_${item.label}`,
                  inputProps: { min: 0, max: 300, step: 10 },
                },
                {
                  xs: 4,
                  type: 'number',
                  label: 'Bounce',
                  param: `collision_${item.label}`,
                  inputProps: { min: 0, max: 0.2, step: 0.05 },
                },
                {
                  xs: 4,
                  type: 'bool',
                  label: 'Frozen',
                  param: `usePhysics_${item.label}`,
                },
                {
                  xs: 4,
                  type: 'number',
                  label: 'Gravity',
                  param: `gravity_${item.label}`,
                  inputProps: { min: -50, max: 50, step: 5 },
                },
                {
                  xs: 4,
                  type: 'number',
                  label: 'Friction',
                  param: `friction_${item.label}`,
                  inputProps: { min: 0, max: 100, step: 1 },
                },
              ],
            },
            {
              title: 'Attractions',
              type: 'panel',
              xs: 12,
              grid: Array.from({ length: SPECIES }).map((v, index) => (
                {
                  xs: 12,
                  type: 'slider',
                  icon: getSpeciesImage.bind(this, index),
                  min: -30,
                  max: 30,
                  param: `socialForce_${item.label}_${index}`,
                })),
            },
          ],
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
        },
      ],
    },
  ],
};

const Toolbox = ({ onChange }) => (
  <DynToolbox onChange={onChange} toolbox={TOOLBOX} />
);

Toolbox.propTypes = {
  onChange: PropTypes.func.isRequired,
};


export default Toolbox;
