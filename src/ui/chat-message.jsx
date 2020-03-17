import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  makeStyles,
  Avatar,
  Grid,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(({ palette, spacing, typography }) => {
  const radius = spacing(2.5);
  const size = spacing(6);
  return {
    avatar: {
      width: size,
      height: size,
    },
    rightRow: {
      marginLeft: 'auto',
    },
    messageBox: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: spacing(0.25),
    },
    leftMessageBox: {
      textAlign: 'left',
    },
    rightMessageBox: {
      textAlign: 'right',
      flexDirection: 'row-reverse',
    },
    message: {
      maxWidth: '70%',
      padding: spacing(1, 2),
      display: 'inline-block',
      wordBreak: 'break-word',
      fontSize: typography.fontSize,
    },
    left: {
      borderTopRightRadius: radius,
      borderBottomRightRadius: radius,
      borderBottomLeftRadius: radius,
      backgroundColor: palette.grey[200],
    },
    right: {
      borderTopLeftRadius: radius,
      borderBottomLeftRadius: radius,
      borderBottomRightRadius: radius,
      backgroundColor: palette.primary.main,
    },
    leftFirst: {
      marginTop: spacing(3),
    },
  };
});

const ChatMessage = ({ avatar, messages, side }) => {
  const styles = useStyles();

  const attachClass = (index) => {
    if (index === 0) {
      return styles[`${side}First`];
    }
    if (index === messages.length - 1) {
      return styles[`${side}Last`];
    }
    return '';
  };

  return (
    <Grid
      container
      spacing={2}
      justify={side === 'right' ? 'flex-end' : 'flex-start'}
    >
      {side === 'left' && (
        <Grid item>
          <Avatar src={avatar} className={styles.avatar} />
        </Grid>
      )}
      <Grid item xs>
        {messages.map((message, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div
            key={message.id || i}
            className={clsx(styles.row, styles[`${side}Row`])}
          >
            <div className={clsx(styles.messageBox, styles[`${side}MessageBox`])}>
              <Typography
                align="left"
                className={clsx(styles.message, styles[side], attachClass(i))}
              >
                {message}
              </Typography>
            </div>
          </div>
        ))}
      </Grid>
    </Grid>
  );
};

ChatMessage.propTypes = {
  avatar: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.string),
  side: PropTypes.oneOf(['left', 'right']),
};

ChatMessage.defaultProps = {
  avatar: '',
  messages: [],
  side: 'left',
};

export default ChatMessage;
