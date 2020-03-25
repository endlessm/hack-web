import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  makeStyles,
  Avatar,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(({
  custom, palette, spacing, typography,
}) => {
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
      '& tt': {
        color: palette.common.messageCodeBlock,
        backgroundColor: palette.grey[50],
        border: `1px solid ${palette.grey[300]}`,
        padding: '0 0.3em',
      },
      '& a': {
        color: palette.common.messageLink,
      },
    },
    leftMessageBox: {
      textAlign: 'left',
    },
    rightMessageBox: {
      textAlign: 'right',
      flexDirection: 'row-reverse',
    },
    message: {
      maxWidth: custom.chatMessageMaxWidth,
      padding: spacing(1, 2),
      display: 'inline-block',
      wordBreak: 'break-word',
      fontSize: typography.fontSize,
      marginTop: spacing(3),
    },
    left: {
      borderTopLeftRadius: 0,
    },
    right: {
      borderTopRightRadius: 0,
      backgroundColor: palette.primary.main,
    },
  };
});

const ChatMessage = ({
  avatar, messages, side, style,
}) => {
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
      spacing={1}
      justify={side === 'right' ? 'flex-end' : 'flex-start'}
      style={style}
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
              <Paper
                elevation={3}
                align="left"
                className={clsx(styles.message, styles[side], attachClass(i))}
              >
                <Typography>
                  {/* eslint-disable-next-line react/no-danger */}
                  <div dangerouslySetInnerHTML={{ __html: message }} />
                </Typography>
              </Paper>
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
  style: PropTypes.shape({
    opacity: PropTypes.number,
  }),
};

ChatMessage.defaultProps = {
  avatar: '',
  messages: [],
  side: 'left',
  style: {},
};

export default ChatMessage;
