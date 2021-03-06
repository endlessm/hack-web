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
import { useSelector } from 'react-redux';

import {
  Box,
  Grid,
  Paper,
  Tabs,
  Tab,
  Card,
  CardHeader,
  CardContent,
  makeStyles,
} from '@material-ui/core';

import { PanelType } from './types';

import TabPanel from '../tab-panel';

import EmptyPanel from './empty';
import SelectPanel from './select';
import NumberPanel from './number';
import BoolPanel from './bool';
import CodePanel from './code';
import SliderPanel from './slider';
import CheckboxPanel from './checkbox';

const useStyles = makeStyles(({ spacing }) => ({
  panelContent: {
    '&:last-child': {
      paddingBottom: spacing(1),
    },
  },
}));

// Container panels, all panels that needs GridItem should be declared here
//
// Panel and TabsPanel should be in the same file as GridItem because in other
// case we'll have a circular import dependency
const Panel = ({
  title,
  grid,
}) => {
  const classes = useStyles();

  return (
    <Card>
      {title && (<CardHeader title={title} />)}
      <CardContent className={classes.panelContent}>
        <Box width="100%">
          <Grid container spacing={1}>
            { grid.map((item, i) => ({ ...item, id: i })).map((item) => (
              <GridItem key={item.id} panel={item} />
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

Panel.propTypes = {
  grid: PropTypes.arrayOf(PanelType).isRequired,
  title: PropTypes.string,
};

Panel.defaultProps = {
  title: null,
};

const TabsPanel = ({
  items,
  panel,
}) => {
  const [tab, setTab] = useState(0);

  const panels = items.map((item, i) => ({ ...item, id: i, grid: panel(item) }));
  const params = useSelector((state) => state.hackableApp);

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
          onChange={(ev, newValue) => setTab(newValue)}
        >

          { items.map(({ label, icon }) => (
            <Tab key={label} label={label} icon={calculateIcon(icon)} />
          ))}
        </Tabs>
      </Paper>

      { panels.map((p, index) => (
        <TabPanel key={p.id} value={tab} index={index}>
          <Box width="100%" pt={1}>
            <Grid container spacing={1}>
              { p.grid.map((grid, i) => ({ ...grid, id: i })).map((grid) => (
                <GridItem key={grid.id} panel={grid} />
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
};

const PANELS = {
  select: SelectPanel,
  checkbox: CheckboxPanel,
  number: NumberPanel,
  bool: BoolPanel,
  code: CodePanel,
  slider: SliderPanel,
  tabs: TabsPanel,
  panel: Panel,
};

const GridItem = ({
  panel,
}) => {
  const xs = panel.xs || 12;
  let content = null;

  const klass = PANELS[panel.type] || EmptyPanel;
  content = klass({ ...panel });

  return (
    <Grid item xs={xs}>
      { content }
    </Grid>
  );
};

GridItem.propTypes = {
  panel: PanelType.isRequired,
};

export default GridItem;
