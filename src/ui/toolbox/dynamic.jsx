import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

import {
  Tab,
  Tabs,
  ThemeProvider,
  Grid,
  Box,
  Fab,
} from '@material-ui/core';

import {
  SettingsBackupRestore,
} from '@material-ui/icons';

import { actions } from '../../store';

import GridTabPanel from './panels/gridtab';
import { TabType } from './panels/types';
import ToolboxTheme from './theme';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: theme.toolbox.backgroundImage,
  },
}));

const ToolBoxGrid = ({
  toolbox,
}) => {
  const [tab, setTab] = useState(0);
  const classes = useStyles();

  return (
    <Box className={classes.root} height="100vh" overflow="auto" p={3}>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Box boxShadow={4} bgcolor={ToolboxTheme.toolbox.colors.tabBackground}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={tab}
              onChange={(ev, newValue) => setTab(newValue)}
              textColor="primary"
              aria-label="Toolbox tabs"
            >
              { toolbox.tabs.map(({ name, icon }) => (
                <Tab key={name} label={name} icon={icon} />
              )) }
            </Tabs>
          </Box>
        </Grid>

        <Grid item xs={9}>
          { toolbox.tabs.map(({ name, grid }, index) => (
            <GridTabPanel key={name} index={index} tab={tab} grid={grid} />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

ToolBoxGrid.propTypes = {
  toolbox: PropTypes.shape({ tabs: PropTypes.arrayOf(TabType) }).isRequired,
};

const DynToolbox = ({
  toolbox,
}) => {
  const params = useSelector((state) => state.originalHackableApp);
  const dispatch = useDispatch();

  const resetToolbox = () => {
    dispatch(actions.hackableAppSet(params));
  };

  return (
    <ThemeProvider theme={ToolboxTheme}>
      <Grid container spacing={0}>
        <Grid item xs={8}>
          <ToolBoxGrid toolbox={toolbox} />
        </Grid>
        <Grid item xs={1}>
          <Box mt={2}>
            <Fab onClick={resetToolbox} variant="round" color="primary" aria-label="Restore">
              <SettingsBackupRestore />
            </Fab>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

DynToolbox.propTypes = {
  toolbox: PropTypes.shape({ tabs: PropTypes.arrayOf(TabType) }).isRequired,
};

export default DynToolbox;
