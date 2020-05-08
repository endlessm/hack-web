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
      <Grid container>
        { grid.map((item) => (
          <GridItem key={tab.key + item.key} panel={item} />
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
