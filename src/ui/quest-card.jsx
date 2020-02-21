import React, { useState } from 'react';
import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';
import {
  Typography, Button, Card, CardContent, Box, CardActions,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import theme from './theme';

import { pathwayType, questType } from './types';
import DifficultyBar from './difficulty-bar';

const useStyles = makeStyles({
  root: {
    width: '16em',
    minHeight: '24em',
    display: 'flex',
    backgroundRepeat: 'no reapeat',
    backgroundSize: '100% 100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    borderColor: 'white',
    borderStyle: 'solid',
    borderRadius: '1em',
    borderWidth: 0,
    position: 'relative',
    margin: '0.5em',
    transition: 'margin 0.5s ease',
  },
  rootExpanded: {
    margin: '0 0.5em',
  },
  backgroundBox: {
    backgroundImage: ({ pathway, quest }) => {
      const fallbackImg = `url('/assets/quests/pathway-card-${pathway.slug}.svg                                                                                                                                                                                     ')`;
      const bgImg = `url('/assets/quests/${quest.slug}/card.png')`;
      return `${fallbackImg}, ${bgImg}`;
    },
    position: 'absolute',
    width: '100%',
    height: '100%',
    transition: 'transform 0.5s linear',
  },
  backgroundBoxExpanded: {
    transform: 'scale(1.2)',
  },
  cardContent: {
    backgroundColor: 'white',
    zIndex: 1,
  },
  difficultyBar: {
    zIndex: 1,
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  collapsableBox: {
    display: 'flex',
    flexDirection: 'column',
    transition: 'max-height 0.5s linear, padding 0.5s linear',
    maxHeight: 0,
    overflow: 'hidden',
  },
  collapsableBoxExpanded: {
    // Just a big height.
    maxHeight: '16em',
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '1em',
    padding: '0 1em',
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  actions: {
    justifyContent: 'flex-end',
    padding: '1em',
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  difficultySubBar: {
    backgroundImage: ({ quest }) => {
      const { colors } = theme.difficultyBar[quest.difficulty];
      return `linear-gradient(to right, ${colors[0]}, ${colors[1]})`;
    },
    height: '0.5em',
    margin: '0.25em 0',
  },
});

const QuestCard = ({ pathway, quest }) => {
  const [expanded, setExpanded] = useState(false);

  const classes = useStyles({ pathway, quest, expanded });

  const handleMouseEnter = () => {
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
  };

  return (
    <Card
      className={clsx(classes.root, expanded && classes.rootExpanded)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box className={clsx(classes.backgroundBox, expanded && classes.backgroundBoxExpanded)} />
      {!expanded
        && <DifficultyBar difficulty={quest.difficulty} className={classes.difficultyBar} />}
      <CardContent className={classes.cardContent}>
        <Typography className={classes.title} gutterBottom component="p">
          { `${quest.name}` }
        </Typography>
        <Box className={clsx(classes.collapsableBox, expanded && classes.collapsableBoxExpanded)}>
          <Typography className={classes.subtitle} component="p">
            { quest.subtitle }
          </Typography>
          <Box width="100%" display="flex">
            <Box className={classes.difficultySubBar} flexGrow={1} />
            <Box flexGrow={2} />
          </Box>
          <Typography variant="body2" color="textSecondary" component="p">
            { quest.description }
          </Typography>
          <CardActions className={classes.cardActions}>
            <Button
              size="small"
              color="primary"
              className={classes.button}
              component={RouterLink}
              to={`/${quest.slug}`}
            >
              Play
            </Button>
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  );
};

QuestCard.propTypes = {
  pathway: pathwayType.isRequired,
  quest: questType.isRequired,
};

export default QuestCard;
