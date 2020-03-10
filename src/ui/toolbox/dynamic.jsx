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

// TODO: move to theme?
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

// TODO: move each panel to their own jsx file

const PanelType = PropTypes.shape({
  type: PropTypes.string.isRequired,
  xs: PropTypes.number,
});

const TabType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  grid: PropTypes.arrayOf(PanelType).isRequired,
});

const EmptyPanel = ({ type }) => (
  <p>
    {`TYPE '${type}' NOT IMPLEMENTED`}
  </p>
);
EmptyPanel.propTypes = {
  type: PropTypes.string.isRequired,
};

const NumberPanel = ({
  label,
  param,
  inputProps,
  onChange,
}) => {
  const params = useSelector((state) => state.game);

  if (typeof params[param] === 'undefined') {
    return <></>;
  }

  return (
    <TextField
      label={label}
      type="number"
      inputProps={inputProps}
      value={params[param]}
      onChange={(ev) => onChange({
        [param]: ev.target.value,
      })}
    />
  );
};
NumberPanel.propTypes = {
  label: PropTypes.string.isRequired,
  param: PropTypes.string.isRequired,
  inputProps: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
  }),
  onChange: PropTypes.func.isRequired,
};
NumberPanel.defaultProps = {
  inputProps: {},
};

const BoolPanel = ({
  label,
  param,
  onChange,
}) => {
  const params = useSelector((state) => state.game);

  if (typeof params[param] === 'undefined') {
    return <></>;
  }

  return (
    <FormControlLabel
      control={(
        <GreenCheckbox
          checked={!params[param]}
          onChange={(ev) => onChange({ [param]: !ev.target.checked })}
        />
      )}
      label={label}
    />
  );
};
BoolPanel.propTypes = {
  label: PropTypes.string.isRequired,
  param: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const SelectPanel = ({
  title,
  items,
  param,
  onChange,
}) => {
  const params = useSelector((state) => state.game);

  if (typeof params[param] === 'undefined') {
    return <></>;
  }

  return (
    <Select
      title={title}
      items={items}
      value={params[param].toString()}
      onChange={(ev) => onChange({
        [param]: ev.target.value,
      })}
    />
  );
};
SelectPanel.propTypes = {
  title: PropTypes.string.isRequired,
  param: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
};

const CheckboxPanel = ({
  title,
  items,
  onChange,
}) => {
  const params = useSelector((state) => state.game);

  if (typeof params[items[0].key] === 'undefined') {
    return <></>;
  }

  const customItems = items.map((item) => ({ ...item, value: params[item.key] }));

  return (
    <Checkbox
      title={title}
      items={customItems}
      onChange={onChange}
    />
  );
};
CheckboxPanel.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.bool,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
};

const TabsPanel = ({
  items,
  panel,
  onChange,
}) => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);

  const panels = items.map((item, i) => ({ ...item, id: i, grid: panel(item) }));
  const params = useSelector((state) => state.game);

  const calculateIcon = (icon) => {
    if (icon instanceof Function) {
      return icon(params);
    }

    return icon;
  };

  return (
    <>
      <Paper>
        <Tabs
          variant="fullWidth"
          value={tab}
          className={classes.smalltab}
          onChange={(ev, newValue) => setTab(newValue)}
        >

          { items.map(({ label, icon }) => (
            <Tab key={label} label={label} icon={calculateIcon(icon)} />
          ))}
        </Tabs>
      </Paper>

      { panels.map((p, index) => (
        <TabPanel key={p.id} value={tab} index={index}>
          <Box width="100%" className={classes.grid}>
            <Grid container spacing={3}>
              { p.grid.map((grid, i) => ({ ...grid, id: i })).map((grid) => (
                <GridItem key={grid.id} panel={grid} onChange={onChange} />
              ))}
            </Grid>
          </Box>
        </TabPanel>
      ))}
    </>
  );
};
TabsPanel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    icon: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func,
    ]),
  })).isRequired,
  panel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Panel = ({
  title,
  grid,
  onChange,
}) => (
  <Card>
    <CardHeader title={title} />
    <CardContent>
      <Box width="100%">
        <Grid container spacing={3}>
          { grid.map((item, i) => ({ ...item, id: i })).map((item) => (
            <GridItem key={item.id} panel={item} onChange={onChange} />
          ))}
        </Grid>
      </Box>
    </CardContent>
  </Card>
);
Panel.propTypes = {
  title: PropTypes.string.isRequired,
  grid: PropTypes.arrayOf(PanelType).isRequired,
  onChange: PropTypes.func.isRequired,
};

const CodePanel = ({
  code,
  compile,
  onChange,
}) => {
  const params = useSelector((state) => state.game);
  const text = code(params);

  const build = (c) => {
    const result = compile(c, params);
    if (result) {
      onChange(result);
    }
  };

  return (
    <AceEditor
      width="100%"
      height="98vh"
      mode="javascript"
      theme="terminal"
      value={text}
      onChange={build}
      name="editor"
      editorProps={{ $blockScrolling: true }}
    />
  );
};
CodePanel.propTypes = {
  code: PropTypes.func.isRequired,
  compile: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const SliderPanel = ({
  icon,
  min,
  max,
  param,
  onChange,
}) => {
  const params = useSelector((state) => state.game);

  if (typeof params[param] === 'undefined') {
    return <></>;
  }

  let realIcon = icon;
  if (icon instanceof Function) {
    realIcon = icon(params);
  }

  return (
    <Grid container spacing={2}>
      <Grid item>
        { realIcon }
      </Grid>
      <Grid item>
        <Remove />
      </Grid>
      <Grid item xs>
        <Slider
          min={min}
          max={max}
          value={params[param]}
          onChange={(ev, val) => onChange({ [param]: val })}
          valueLabelDisplay="on"
        />
      </Grid>
      <Grid item>
        <Add />
      </Grid>
    </Grid>
  );
};
SliderPanel.propTypes = {
  icon: PropTypes.node.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  param: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const GridItem = ({
  panel,
  onChange,
}) => {
  const xs = panel.xs || 12;
  let content = null;

  const PANELS = {
    select: SelectPanel,
    checkbox: CheckboxPanel,
    number: NumberPanel,
    bool: BoolPanel,
    code: CodePanel,
    tabs: TabsPanel,
    slider: SliderPanel,
    panel: Panel,
  };

  const klass = PANELS[panel.type] || EmptyPanel;
  content = klass({ ...panel, onChange });

  return (
    <Grid item xs={xs}>
      { content }
    </Grid>
  );
};

GridItem.propTypes = {
  panel: PanelType.isRequired,
  onChange: PropTypes.func.isRequired,
};

const GridTabPanel = ({
  index,
  tab,
  grid,
  onChange,
}) => {
  const classes = useStyles();

  return (
    <TabPanel value={tab} index={index}>
      <Box width="100%" className={classes.grid}>
        <Grid container spacing={3}>
          { grid.map((item, i) => ({ ...item, id: i })).map((item) => (
            <GridItem key={item.id} panel={item} onChange={onChange} />
          ))}
        </Grid>
      </Box>
    </TabPanel>
  );
};

GridTabPanel.propTypes = {
  tab: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  grid: PropTypes.arrayOf(PanelType).isRequired,
  onChange: PropTypes.func.isRequired,
};

const DynToolbox = ({
  toolbox,
  onChange,
}) => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);

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
        { toolbox.tabs.map(({ name, icon }) => <Tab key={name} label={name} icon={icon} />) }
      </Tabs>

      { toolbox.tabs.map(({ name, grid }, index) => (
        <GridTabPanel key={name} index={index} tab={tab} grid={grid} onChange={onChange} />
      ))}
    </div>
  );
};

DynToolbox.propTypes = {
  toolbox: PropTypes.shape({ tabs: PropTypes.arrayOf(TabType) }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DynToolbox;
