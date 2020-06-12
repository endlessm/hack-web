import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import sanitizeHtml from 'sanitize-html';
import {
  makeStyles,
  Avatar,
  Box,
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

import typingAsset from './typing.gif';

const sanitizeOptions = {
  allowedTags: ['b', 'i', 's', 'tt', 'u', 'a', 'p', 'img'],
  allowedAttributes: {
    a: ['href', 'target'],
    img: ['src'],
  },
  allowedSchemesByTag: {
    img: [],
  },
  transformTags: {
    a: sanitizeHtml.simpleTransform('a', { target: '_blank' }),
  },
};

const useStyles = makeStyles(({
  breakpoints, custom, palette, spacing, typography,
}) => {
  const size = spacing(8);
  return {
    root: {
      marginTop: spacing(1),
    },
    avatar: {
      width: size,
      height: size,
      marginLeft: spacing(1),
      marginRight: spacing(1),
      [breakpoints.down('md')]: {
        marginLeft: 0,
        marginRight: 0,
      },
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
        marginTop: spacing(0),
      },
      [breakpoints.only('xl')]: {
        maxWidth: custom.chatMessageMaxWidths.onlyXl,
        padding: spacing(1, 2),
        marginTop: spacing(0),
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
    messageTyping: {
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundImage: `url('${typingAsset}')`,
    },
    left: {
      minHeight: spacing(8),
      [breakpoints.down('md')]: {
        minWidth: custom.chatMessageMinWidths.downMd,
      },
      [breakpoints.only('lg')]: {
        minWidth: custom.chatMessageMinWidths.onlyLg,
      },
      [breakpoints.only('xl')]: {
        minWidth: custom.chatMessageMinWidths.onlyXl,
      },
      borderTopLeftRadius: 0,
    },
    right: {
      borderTopRightRadius: 0,
      backgroundColor: palette.grey[300],
    },
  };
});

const ChatMessage = ({
  avatar, messages, side, style, typing,
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
      className={styles.root}
    >
      {side === 'left' && (
        <Grid item xs={isSmall ? 12 : false}>
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
                  typing && styles.messageTyping,
                  styles[side],
                )}
              >
                <Box my={side === 'left' ? 1.5 : 0}>
                  {typing ? (<div />) : (
                    <>
                      <Typography dangerouslySetInnerHTML={{ __html: sanitize(message.text) }} />
                      {message.codeSnippet && (
                        <AceEditor
                          width="100%"
                          height={`${theme.spacing(15)}px`}
                          mode={message.codeSnippet.language}
                          theme="monokai"
                          value={message.codeSnippet.text}
                          name="editor"
                          readOnly
                          showGutter={false}
                          highlightActiveLine={false}
                          editorProps={{ $blockScrolling: true }}
                          setOptions={{ useWorker: false }}
                          enableSnippets
                        />
                      )}
                    </>
                  )}
                </Box>
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
  typing: PropTypes.bool,
};

ChatMessage.defaultProps = {
  avatar: '',
  messages: [],
  side: 'left',
  style: {},
  typing: false,
};

export default ChatMessage;
