import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Typography,
  Slider,
  Box,
  Tab,
  Tabs,
  TextField,
  Grid,
} from '@material-ui/core';
import {
  Build,
  Code,
  ZoomOut,
  ZoomIn,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import Checkbox from '../toolbox/checkbox';
import TabPanel from '../toolbox/tab-panel';
import Select from '../toolbox/select';

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
  },
  tabs: {
    background: '#4a3a37',
    boxShadow: '4px 0 5px 0 rgba(0, 0, 0, 0.5)',
    opacity: '0.9',
    color: 'white',
  },
  indicator: {
    width: '100%',
    zIndex: -1,
    backgroundColor: '#f18c22',
  },
  codeview: {
    '& .MuiTextField-root': {
      width: 400,
      '& label': {
        color: 'white',
      },
    },
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

const Toolbox = ({ updateApp }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const params = useSelector((state) => state.game);

  if (typeof params.backgroundImageIndex === 'undefined') {
    return <></>;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const updateParams = (newParams) => {
    const newValue = { ...params, ...newParams };
    updateApp(newValue);
  };

  const bgItems = {
    0: 'Blueprint',
    1: 'Galaxy',
    2: 'Grass',
  };

  const toolsItems = [
    { label: 'Drag', key: 'moveToolActive', value: params.moveToolActive },
    { label: 'Fling', key: 'flingToolActive', value: params.flingToolActive },
    { label: 'Add', key: 'createToolActive', value: params.createToolActive },
    { label: 'Delete', key: 'deleteToolActive', value: params.deleteToolActive },
  ];

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Toolbox tabs"
        className={classes.tabs}
        classes={{
          indicator: classes.indicator,
        }}
      >
        <Tab label="Tools" icon={<Build />} />
        <Tab label="Code" icon={<Code />} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Box className={classes.grid}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Select
                title="Background"
                items={bgItems}
                value={params.backgroundImageIndex}
                onChange={(ev) => updateParams({
                  backgroundImageIndex: parseInt(ev.target.value, 10),
                })}
              />
            </Grid>
            <Grid item xs={8}>
              <Checkbox
                title="Tools"
                items={toolsItems}
                onChange={updateParams}
              />
            </Grid>
            <Grid item xs={12}>

              <Typography id="size-slider">
                Size
              </Typography>
              <Grid container spacing={2}>
                <Grid item>
                  <ZoomOut />
                </Grid>
                <Grid item xs>
                  <Slider
                    min={10}
                    max={300}
                    value={params.radius_0}
                    valueLabelDisplay="auto"
                    onChange={(ev, newVal) => updateParams({ radius_0: newVal })}
                    aria-labelledby="size-slider"
                  />
                </Grid>
                <Grid item>
                  <ZoomIn />
                </Grid>
              </Grid>

            </Grid>
          </Grid>
        </Box>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <div id="codeview" className={classes.codeview}>
          <TextField
            label="Code"
            placeholder="Placeholder"
            multiline
            variant="outlined"
          />
        </div>
      </TabPanel>
    </div>
  );
};

Toolbox.propTypes = {
  updateApp: PropTypes.func.isRequired,
};

export default Toolbox;
