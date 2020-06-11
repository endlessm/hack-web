import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  IconButton,
  Drawer,
  Grid,
  makeStyles,
  Tooltip,
  Typography,
} from '@material-ui/core';

import {
  Close,
} from '@material-ui/icons';

import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { actions } from '../store';

const defaultBadge = '/assets/badges/default.svg';

const useStyles = makeStyles(({ spacing }) => ({
  inventory: {
    minWidth: spacing(50),
  },
  badge: {
    backgroundImage: ({ achievement }) => `url('/assets/badges/${achievement}.svg'), url('${defaultBadge}')`,
    backgroundSize: 'auto 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: spacing(20),
    opacity: 0.8,
    '&:hover': {
      opacity: 1,
    },
  },
}));

const HackBadge = ({ achievement }) => {
  const classes = useStyles({ achievement });
  const achievementsData = useSelector((state) => state.achievementsData);
  const tooltip = achievementsData[achievement] || achievement;

  return (
    <Tooltip title={tooltip}>
      <Box mt={2} className={classes.badge} />
    </Tooltip>
  );
};

HackBadge.propTypes = {
  achievement: PropTypes.string.isRequired,
};

const InventoryContent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.gameState);
  const classes = useStyles();

  const questAchievements = gameState['quests.achievements'] || {};
  const achievements = Object.keys(questAchievements);

  return (
    <Box px={4} py={2} className={classes.inventory}>
      <Grid container>
        <Grid item xs={11}>
          <Typography variant="h4">
            {t('Inventory')}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton aria-label="close" onClick={() => dispatch(actions.inventoryToggle())}>
            <Close />
          </IconButton>
        </Grid>
        { achievements.length ? (
          achievements.map((a) => (
            <Grid key={a} item xs={6}>
              <HackBadge achievement={a} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography gutterBottom variant="subtitle1" color="textSecondary">
              {t('Nothing here. Explore the Hack web to win badges')}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

const Inventory = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.inventory);

  return (
    <Drawer anchor="left" open={open} onClose={() => dispatch(actions.inventoryToggle())}>
      <InventoryContent />
    </Drawer>
  );
};

export default Inventory;
