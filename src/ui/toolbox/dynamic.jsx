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
                { toolbox.tabs.map(({ name, icon, disabled }) => (
                  <Tab key={name} label={name} icon={icon} disabled={disabled} />
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

const controlsStyles = makeStyles(({ spacing, zIndex }) => ({
  toolboxWrap: {
    position: 'relative',
  },
  controlsContainer: {
    position: 'absolute',
    top: 0,
    right: spacing(2),
    zIndex: zIndex.drawer + 1,
  },
}));

const DynToolbox = ({
  controls,
  toolbox,
  xs,
}) => {
  const classes = controlsStyles();

  return (
    <Box className={classes.toolboxWrap}>
      {controls && (
        <Box className={classes.controlsContainer}>
          {controls}
        </Box>
      )}
      <ThemeProvider theme={ToolboxTheme}>
        <Grid container>
          <Grid item xs={xs}>
            <ToolBoxGrid toolbox={toolbox} />
          </Grid>
        </Grid>
      </ThemeProvider>
    </Box>
  );
};

DynToolbox.propTypes = {
  toolbox: PropTypes.shape({ tabs: PropTypes.arrayOf(TabType) }).isRequired,
  xs: PropTypes.number,
  controls: PropTypes.element,
};

DynToolbox.defaultProps = {
  xs: 12,
  controls: null,
};

export default DynToolbox;
