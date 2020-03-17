import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Typography, Button, Card, CardContent, CardActionArea, CardMedia, CardActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { pathwayType } from './types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '16em',
    minHeight: '24em',
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: ({ pathway, expanded }) => (expanded ? 'none'
      : `url('/assets/pathways/${pathway.slug}-card-unexpanded.png')`),
    backgroundRepeat: 'no reapeat',
    backgroundSize: '100% 100%',
    borderColor: theme.palette.common.white,
    borderStyle: 'solid',
    borderRadius: '1em',
    // FIXME this should be an asset:
    boxShadow: (
      'inset 0 0 0.6em gray,'
      + '0 0 0 0.15em gray,'
      + '-0.15em 0.15em 0 0.05em white,'
      + '-0.2em 0.2em 0 0.15em gray,'
      + '-0.35em 0.35em 0 0.05em white,'
      + '-0.4em 0.4em 0 0.15em gray'
    ),
  },
  media: {
    height: '12em',
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '1em',
    padding: '0 1em',
    // FIXME is changing from primary color to secondary colors on
    // hover part of the spec?
    '&:hover': {
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.main,
    },
  },
  actions: {
    justifyContent: 'flex-end',
    padding: '1em',
  },
  actionArea: {
    flexDirection: 'column',
    flexGrow: 1,
  },
}));

const PathwayCard = ({ pathway }) => {
  const [expanded, setExpanded] = useState(false);

  const classes = useStyles({ pathway, expanded });

  const handleMouseEnter = () => {
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
  };

  return (
    <Card className={classes.root} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {expanded && (
        <>
          <CardActionArea className={classes.actionArea}>
            <CardMedia
              className={classes.media}
              image={`/assets/pathways/${pathway.slug}-card-media.png`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5">
                { `${pathway.name} Pathway` }
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                { pathway.description }
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.actions}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              disableElevation
              className={classes.button}
              component={RouterLink}
              to={`/${pathway.slug}`}
            >
              Play
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
};

PathwayCard.propTypes = {
  pathway: pathwayType.isRequired,
};

export default PathwayCard;
