import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Grid,
  Tab,
  Tabs,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core';

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

  const showTabs = toolbox.tabs.length > 1;

  return (
    <Box className={classes.root} height="100vh" overflow="auto" p={3}>
      <Grid container spacing={1}>
        { showTabs && (
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
        )}

        <Grid item xs={showTabs ? 9 : 12}>
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
  width,
}) => (
  <ThemeProvider theme={ToolboxTheme}>
    <Grid container spacing={0}>
      <Grid item xs={width}>
        <ToolBoxGrid toolbox={toolbox} />
      </Grid>
    </Grid>
  </ThemeProvider>
);

DynToolbox.propTypes = {
  toolbox: PropTypes.shape({ tabs: PropTypes.arrayOf(TabType) }).isRequired,
  width: PropTypes.number,
};

DynToolbox.defaultProps = {
  width: 8,
};

export default DynToolbox;
