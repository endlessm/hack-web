import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Typography,
  Slider,
  Box,
  Tab,
  Tabs,
  Grid,
} from '@material-ui/core';
import {
  Build,
  Code,
  ZoomOut,
  ZoomIn,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-terminal';

import Checkbox from '../toolbox/checkbox';
import TabPanel from '../toolbox/tab-panel';
import Select from '../toolbox/select';

const SPECIES = 5;
const BACKGROUNDS = [
  { key: '0', value: 'grid' },
  { key: '1', value: 'space' },
  { key: '2', value: 'grass' },
];

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    display: 'flex',
    height: '100vh',
    width: '900px',
    backgroundImage: `url('assets/toolbox/background.png'),
                      radial-gradient(at -47% 158%,
                                      rgba(197, 163, 93, 0.81) 0%,
                                      rgba(208, 95, 52, 0.80) 14%,
                                      rgba(32, 69, 108, 0.63) 66%,
                                      #1C3753 100%)`,
    boxShadow: '4px 0 3px 0 rgba(0, 0, 0, 0.3)',
  },
  tabs: {
    background: '#4a3a37',
    boxShadow: '4px 0 5px 0 rgba(0, 0, 0, 0.5)',
    opacity: '0.9',
    color: 'white',
  },
  indicator: {
    width: '100%',
    zIndex: -1,
    backgroundColor: '#f18c22',
  },
  grid: {
    padding: 10,
    '& .MuiGrid-root': {
      color: 'white',
    },
    '& .MuiPaper-root': {
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    '& .MuiSelect-icon': {
      color: 'white',
    },
    '& .MuiInputBase-root': {
      color: 'white',
    },
  },
});

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

const Toolbox = ({ updateApp }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const params = useSelector((state) => state.game);

  if (typeof params.backgroundImageIndex === 'undefined') {
    return <></>;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const updateParams = (newParams) => {
    const newValue = { ...params, ...newParams };
    updateApp(newValue);
  };

  const toolsItems = [
    { label: 'Drag', key: 'moveToolActive', value: params.moveToolActive },
    { label: 'Fling', key: 'flingToolActive', value: params.flingToolActive },
    { label: 'Add', key: 'createToolActive', value: params.createToolActive },
    { label: 'Delete', key: 'deleteToolActive', value: params.deleteToolActive },
  ];

  const codeValue = regenerateCode(params);

  const updateAppWithCode = (scope) => {
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
    Array.from({ length: SPECIES }).forEach((v, index) => {
      updateModelFromObject(scope.species[index], index);
    });

    updateApp(model);
  };

  const compileCode = (code) => {
    if (code === '') {
      return;
    }

    const scope = createScope();
    try {
      // eslint-disable-next-line no-new-func
      const func = new Function('scope', `with(scope){\n${code}\n;}`);
      func(scope);
    } catch (e) {
      // TODO: add annotations to editor
      // [{ row: 0, column: 2, type: 'error', text: 'Some error.'}]
      return;
    }

    updateAppWithCode(scope);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Toolbox tabs"
        className={classes.tabs}
        classes={{
          indicator: classes.indicator,
        }}
      >
        <Tab label="Tools" icon={<Build />} />
        <Tab label="Code" icon={<Code />} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Box className={classes.grid}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Select
                title="Background"
                items={BACKGROUNDS}
                value={params.backgroundImageIndex}
                onChange={(ev) => updateParams({
                  backgroundImageIndex: parseInt(ev.target.value, 10),
                })}
              />
            </Grid>
            <Grid item xs={8}>
              <Checkbox
                title="Tools"
                items={toolsItems}
                onChange={updateParams}
              />
            </Grid>
            <Grid item xs={12}>

              <Typography id="size-slider">
                Size
              </Typography>
              <Grid container spacing={2}>
                <Grid item>
                  <ZoomOut />
                </Grid>
                <Grid item xs>
                  <Slider
                    min={10}
                    max={300}
                    value={params.radius_0}
                    valueLabelDisplay="auto"
                    onChange={(ev, newVal) => updateParams({ radius_0: newVal })}
                    aria-labelledby="size-slider"
                  />
                </Grid>
                <Grid item>
                  <ZoomIn />
                </Grid>
              </Grid>

            </Grid>
          </Grid>
        </Box>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Box className={classes.grid}>
          <AceEditor
            mode="javascript"
            theme="terminal"
            value={codeValue}
            onChange={compileCode}
            name="editor"
            editorProps={{ $blockScrolling: true }}
          />
        </Box>
      </TabPanel>
    </div>
  );
};

Toolbox.propTypes = {
  updateApp: PropTypes.func.isRequired,
};

export default Toolbox;
