import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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

const useStyles = makeStyles(({ spacing, toolbox }) => ({
  root: {
    backgroundImage: toolbox.backgroundImage,
  },
  toolboxTab: {
    width: spacing(10),
  },
  toolboxTabContent: {
    width: `calc(100% - ${spacing(10)}px)`,
  },
  toolboxTabContentSingle: {
    width: '100%',
  },
}));

const ToolBoxGrid = ({
  toolbox,
}) => {
  const [tab, setTab] = useState(0);
  const classes = useStyles();

  const showTabs = toolbox.tabs.length > 1;

  return (
    <Box className={classes.root} height="100vh" overflow="auto">
      <Grid container>
        { showTabs && (
          <Grid className={classes.toolboxTab}>
            <Box boxShadow={4} bgcolor={ToolboxTheme.toolbox.colors.tabBackground}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={tab}
                onChange={(ev, newValue) => setTab(newValue)}
                textColor="primary"
                aria-label="Toolbox tabs"
              >
                { toolbox.tabs.map(({ key, name, icon }) => (
                  <Tab key={key} label={name} icon={icon} />
                )) }
              </Tabs>
            </Box>
          </Grid>
        )}

        <Grid
          item
          className={clsx(classes.toolboxTabContent, {
            [classes.toolboxTabContentSingle]: !showTabs,
          })}
        >
          { toolbox.tabs.map(({ key, grid }, index) => (
            <GridTabPanel key={key} index={index} tab={tab} grid={grid} />
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
  xs,
}) => (
  <ThemeProvider theme={ToolboxTheme}>
    <Grid container>
      <Grid item xs={xs}>
        <ToolBoxGrid toolbox={toolbox} />
      </Grid>
    </Grid>
  </ThemeProvider>
);

DynToolbox.propTypes = {
  toolbox: PropTypes.shape({ tabs: PropTypes.arrayOf(TabType) }).isRequired,
  xs: PropTypes.number,
};

DynToolbox.defaultProps = {
  xs: 12,
};

export default DynToolbox;
