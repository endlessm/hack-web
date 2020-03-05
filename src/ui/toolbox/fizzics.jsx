import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Box,
  Tab,
  Tabs,
  Grid,
  Paper,
  Card,
  CardHeader,
  CardContent,
  TextField,
  FormControlLabel,
  Slider,
} from '@material-ui/core';
import {
  Build,
  Code,
  Remove,
  Add,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-terminal';

import Checkbox, { GreenCheckbox } from './checkbox';
import TabPanel from './tab-panel';
import Select from './select';

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
const VFXS = [
  { key: '0', value: 'confetti' },
  { key: '1', value: 'explosion' },
  { key: '2', value: 'level_down_red' },
  { key: '3', value: 'level_down_dark' },
  { key: '4', value: 'life_up' },
  { key: '5', value: 'level_up_blue' },
  { key: '6', value: 'level_up_dark' },
  { key: '7', value: 'vaporized' },
  { key: '8', value: 'rainbow' },
  { key: '9', value: 'skull' },
];
const SFXS = [
  'pop',
  'horn',
  'drum',
  'beam',
  'goal',
  'gem',
  'win',
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
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  tabs: {
    background: '#4a3a37',
    boxShadow: '4px 0 5px 0 rgba(0, 0, 0, 0.5)',
    opacity: '0.9',
    minWidth: 200,
    color: 'white',
  },
  smalltab: {
    '& .MuiTab-root': {
      minWidth: 80,
    },
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

const getSpeciesImage = (params, index) => {
  const idx = params[`imageIndex_${index}`];
  const image = `${ASSETS}/skins/${idx}.png`;
  return <img src={image} alt={index} />;
};

const PhysicsPanel = ({
  onUpdate,
  index,
}) => {
  const params = useSelector((state) => state.game);
  const radiusKey = `radius_${index}`;
  const bounceKey = `collision_${index}`;
  const gravityKey = `gravity_${index}`;
  const frictionKey = `friction_${index}`;
  const frozenKey = `usePhysics_${index}`;

  return (
    <Card>
      <CardHeader title="Physics" />
      <CardContent>
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <TextField
                label="Radius"
                type="number"
                inputProps={{ min: 0, max: 300, step: 10 }}
                value={params[radiusKey]}
                onChange={(ev) => onUpdate({
                  [radiusKey]: parseInt(ev.target.value, 10),
                })}
              />
              <TextField
                label="Gravity"
                type="number"
                inputProps={{ min: -50, max: 50, step: 5 }}
                value={params[gravityKey]}
                onChange={(ev) => onUpdate({
                  [gravityKey]: parseFloat(ev.target.value, 10),
                })}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Bounce"
                type="number"
                inputProps={{ min: 0, max: 0.2, step: 0.05 }}
                value={params[bounceKey]}
                onChange={(ev) => onUpdate({
                  [bounceKey]: parseFloat(ev.target.value, 10),
                })}
              />
              <TextField
                label="Friction"
                type="number"
                inputProps={{ min: 0, max: 100, step: 1 }}
                value={params[frictionKey]}
                onChange={(ev) => onUpdate({
                  [frictionKey]: parseFloat(ev.target.value, 10),
                })}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControlLabel
                control={(
                  <GreenCheckbox
                    checked={!params[frozenKey]}
                    onChange={(ev) => onUpdate({ [frozenKey]: !ev.target.checked })}
                  />
                )}
                label="Frozen"
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

PhysicsPanel.propTypes = {
  index: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

const AttractionsPanel = ({
  index,
  onUpdate,
}) => {
  const params = useSelector((state) => state.game);
  const socialForceKeys = Array.from({ length: SPECIES }).map((value, i) => `socialForce_${index}_${i}`);

  return (
    <Card>
      <CardHeader title="Attractions" />
      <CardContent>
        <Box>

          {socialForceKeys.map((k, i) => (
            <Grid key={k} container spacing={2}>
              <Grid item>
                {getSpeciesImage(params, i)}
              </Grid>
              <Grid item>
                <Remove />
              </Grid>
              <Grid item xs>
                <Slider
                  min={-30}
                  max={30}
                  value={params[k]}
                  onChange={(ev, val) => onUpdate({ [k]: parseInt(val, 10) })}
                  valueLabelDisplay="on"
                />
              </Grid>
              <Grid item>
                <Add />
              </Grid>
            </Grid>
          ))}

        </Box>
      </CardContent>
    </Card>
  );
};

AttractionsPanel.propTypes = {
  index: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

const SpeciesPanel = ({
  index,
  onUpdate,
  tab,
}) => {
  const params = useSelector((state) => state.game);
  const images = SKINS.map((id, idx) => (
    { key: idx.toString(), value: id, image: `${ASSETS}/skins/${idx}.png` }
  ));

  const imageKey = `imageIndex_${index}`;

  return (
    <TabPanel value={tab} index={index}>
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Select
              title="Image"
              items={images}
              value={params[imageKey].toString()}
              onChange={(ev) => onUpdate({
                [imageKey]: parseInt(ev.target.value, 10),
              })}
            />
          </Grid>
          <Grid item xs={8}>
            <PhysicsPanel index={index} onUpdate={onUpdate} />
          </Grid>
          <Grid item xs={12}>
            <AttractionsPanel index={index} onUpdate={onUpdate} />
          </Grid>
          { /* TODO:
             *  Animations? (Good / Bad)
             *  Sound? (Good / Bad)
          */ }
        </Grid>
      </Box>
    </TabPanel>
  );
};

SpeciesPanel.propTypes = {
  tab: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

const PropertiesEditor = ({
  onUpdate,
}) => {
  const [speciesTab, setSpeciesTab] = useState(0);
  const params = useSelector((state) => state.game);
  const classes = useStyles();

  const species = Array.from({ length: SPECIES }).map((value, index) => index);
  const toolsItems = [
    { label: 'Drag', key: 'moveToolActive', value: params.moveToolActive },
    { label: 'Fling', key: 'flingToolActive', value: params.flingToolActive },
    { label: 'Add', key: 'createToolActive', value: params.createToolActive },
    { label: 'Delete', key: 'deleteToolActive', value: params.deleteToolActive },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Select
          title="Background"
          items={BACKGROUNDS}
          value={params.backgroundImageIndex.toString()}
          onChange={(ev) => onUpdate({
            backgroundImageIndex: parseInt(ev.target.value, 10),
          })}
        />
      </Grid>
      <Grid item xs={8}>
        <Checkbox
          title="Tools"
          items={toolsItems}
          onChange={onUpdate}
        />
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <Tabs
            variant="fullWidth"
            value={speciesTab}
            className={classes.smalltab}
            onChange={(ev, newValue) => setSpeciesTab(newValue)}
            aria-label="Species tab"
          >

            { species.map((index) => (
              <Tab key={index} label={index} icon={getSpeciesImage(params, index)} />
            ))}
          </Tabs>
        </Paper>

        { species.map((index) => (
          <SpeciesPanel key={index} tab={speciesTab} onUpdate={onUpdate} index={index} />
        ))}
      </Grid>
    </Grid>
  );
};

PropertiesEditor.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

const Toolbox = ({ updateApp }) => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);

  const params = useSelector((state) => state.game);

  if (typeof params.backgroundImageIndex === 'undefined') {
    return <></>;
  }

  const updateParams = (newParams) => {
    const newValue = { ...params, ...newParams };
    updateApp(newValue);
  };

  const species = Array.from({ length: SPECIES }).map((value, index) => index);

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
    species.forEach((index) => {
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
        value={tab}
        onChange={(ev, newValue) => setTab(newValue)}
        aria-label="Toolbox tabs"
        className={classes.tabs}
        classes={{
          indicator: classes.indicator,
        }}
      >
        <Tab label="Tools" icon={<Build />} />
        <Tab label="Code" icon={<Code />} />
      </Tabs>

      <TabPanel value={tab} index={0}>
        <Box className={classes.grid}>
          <PropertiesEditor onUpdate={updateParams} />
        </Box>
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <Box width="100%" className={classes.grid}>
          <AceEditor
            width="100%"
            height="98vh"
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
