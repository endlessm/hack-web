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
