import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import sanitizeHtml from 'sanitize-html';
import {
  makeStyles,
  Avatar,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';

import AceEditor from 'react-ace';
// Adds syntax highlighting for: javascript, css, html, xml
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-monokai';

const sanitizeOptions = {
  allowedTags: ['b', 'i', 's', 'tt', 'u', 'a', 'p'],
  allowedAttributes: {
    a: ['href', 'target'],
  },
  transformTags: {
    a: sanitizeHtml.simpleTransform('a', { target: '_blank' }),
  },
};

const useStyles = makeStyles(({
  breakpoints, custom, palette, spacing, typography,
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
      '& p:first-child': {
        marginBlockStart: 0,
      },
      '& p:last-child': {
        marginBlockEnd: 0,
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
      [breakpoints.down('md')]: {
        maxWidth: custom.chatMessageMaxWidths.downMd,
        padding: spacing(0.5, 1),
        marginTop: spacing(1),
      },
      [breakpoints.only('lg')]: {
        maxWidth: custom.chatMessageMaxWidths.onlyLg,
        padding: spacing(1, 2),
        marginTop: spacing(3),
      },
      [breakpoints.only('xl')]: {
        maxWidth: custom.chatMessageMaxWidths.onlyXl,
        padding: spacing(1, 2),
        marginTop: spacing(3),
      },
      display: 'inline-block',
      wordBreak: 'break-word',
      fontSize: typography.fontSize,
    },
    messageWithSnippet: {
      [breakpoints.down('md')]: {
        maxWidth: custom.chatMessageMaxWidths.downMd,
      },
      [breakpoints.only('lg')]: {
        maxWidth: custom.chatMessageMaxWidths.onlyLg,
      },
      [breakpoints.only('xl')]: {
        maxWidth: custom.chatMessageMaxWidths.onlyXl,
      },
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

  const sanitize = (message) => (
    // FIXME: We should sanitize when converting the ink to json, not at run-time.
    sanitizeHtml(message, sanitizeOptions)
  );

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid
      container
      spacing={isSmall ? 0 : 1}
      justify={side === 'right' ? 'flex-end' : 'flex-start'}
      style={style}
    >
      {side === 'left' && (
        <Grid item xs={isSmall ? 12 : 0}>
          <Avatar src={avatar} className={styles.avatar} />
        </Grid>
      )}
      <Grid item xs>
        {messages.map((message) => (
          <div
            key={message.id}
            className={clsx(styles.row, styles[`${side}Row`])}
          >
            <div className={clsx(styles.messageBox, styles[`${side}MessageBox`])}>
              <Paper
                elevation={3}
                align="left"
                className={clsx(
                  styles.message,
                  message.codeSnippet && styles.messageWithSnippet,
                  styles[side],
                )}
              >
                {/* eslint-disable-next-line react/no-danger */}
                <Typography dangerouslySetInnerHTML={{ __html: sanitize(message.text) }} />
                {message.codeSnippet && (
                  <AceEditor
                    width="100%"
                    height={theme.spacing(15)}
                    mode={message.codeSnippet.language}
                    theme="monokai"
                    value={message.codeSnippet.text}
                    name="editor"
                    readOnly
                    showGutter={false}
                    highlightActiveLine={false}
                    editorProps={{ $blockScrolling: true }}
                    enableSnippets
                  />
                )}
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
  messages: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
  })),
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
