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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { PanelType } from './types';

import TabPanel from '../tab-panel';

import EmptyPanel from './empty';
import SelectPanel from './select';
import NumberPanel from './number';
import BoolPanel from './bool';
import CodePanel from './code';
import SliderPanel from './slider';
import CheckboxPanel from './checkbox';

const useStyles = makeStyles({
  smalltab: {
    '& .MuiTab-root': {
      minWidth: 80,
    },
  },
});

// Container panels, all panels that needs GridItem should be declared here
//
// Panel and TabsPanel should be in the same file as GridItem because in other
// case we'll have a circular import dependency
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
          <Box width="100%">
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
  onChange,
}) => {
  const xs = panel.xs || 12;
  let content = null;

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

export default GridItem;
