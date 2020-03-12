import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import GridTabPanel from './panels/gridtab';
import { TabType } from './panels/types';

// TODO: move to theme?
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
    overflowY: 'auto',
    overflowX: 'hidden',

    '& .MuiGrid-container': {
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
  },
  tabs: {
    background: '#4a3a37',
    boxShadow: '4px 0 5px 0 rgba(0, 0, 0, 0.5)',
    opacity: '0.9',
    minWidth: 200,
    color: 'white',
  },
  indicator: {
    width: '100%',
    zIndex: -1,
    backgroundColor: '#f18c22',
  },
});

const DynToolbox = ({
  toolbox,
}) => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tab}
        onChange={(ev, newValue) => setTab(newValue)}
        aria-label="Toolbox tabs"
        className={classes.tabs}
        classes={{
          indicator: classes.indicator,
        }}
      >
        { toolbox.tabs.map(({ name, icon }) => <Tab key={name} label={name} icon={icon} />) }
      </Tabs>

      { toolbox.tabs.map(({ name, grid }, index) => (
        <GridTabPanel key={name} index={index} tab={tab} grid={grid} />
      ))}
    </div>
  );
};

DynToolbox.propTypes = {
  toolbox: PropTypes.shape({ tabs: PropTypes.arrayOf(TabType) }).isRequired,
};

export default DynToolbox;
