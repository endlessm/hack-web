import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  IconButton,
  Drawer,
  Grid,
  makeStyles,
  Tooltip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';

import {
  Close,
  Delete,
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

const ResetGameStateDialog = ({ open, setOpen }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const reset = () => {
    dispatch(actions.gameStateReset());
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{t('Do you want to remove the game state?')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('Removing the Game State will remove the progress in all quests and all the achievements reached.')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          {t('No')}
        </Button>
        <Button onClick={reset}>
          {t('Yes')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ResetGameStateDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

const InventoryContent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.gameState);
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);

  const questAchievements = gameState['quests.achievements'] || {};
  const achievements = Object.keys(questAchievements);

  return (
    <Box px={4} py={2} className={classes.inventory}>
      <ResetGameStateDialog open={dialogOpen} setOpen={setDialogOpen} />
      <Grid container>
        <Grid item xs={8}>
          <Typography variant="h4">
            {t('Inventory')}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography align="right">
            <IconButton aria-label="reset" edge="end" onClick={() => setDialogOpen(true)}>
              <Delete />
            </IconButton>
            <IconButton aria-label="close" edge="end" onClick={() => dispatch(actions.inventoryToggle())}>
              <Close />
            </IconButton>
          </Typography>
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
