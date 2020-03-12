import React from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  Box,
} from '@material-ui/core';

import GridItem from './grid';
import TabPanel from '../tab-panel';

import { PanelType } from './types';

const GridTabPanel = ({
  index,
  tab,
  grid,
}) => (
  <TabPanel value={tab} index={index}>
    <Box width="100%">
      <Grid container spacing={3}>
        { grid.map((item, i) => ({ ...item, id: i })).map((item) => (
          <GridItem key={item.id} panel={item} />
        ))}
      </Grid>
    </Box>
  </TabPanel>
);

GridTabPanel.propTypes = {
  tab: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  grid: PropTypes.arrayOf(PanelType).isRequired,
};

export default GridTabPanel;
