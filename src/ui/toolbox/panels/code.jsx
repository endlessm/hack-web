import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import {
  makeStyles,
  useTheme,
} from '@material-ui/core';

import 'ace-builds/webpack-resolver';
import AceEditor from 'react-ace';
import { Range } from 'ace-builds';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-monokai';

import { actions } from '../../../store';

// Hook
function useWindowSize() {
  function getSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

const useStyles = makeStyles(({ spacing, zIndex, palette }) => ({
  root: {
    // Converted from ace-monokai #272822, and with a small
    // transparency:
    backgroundColor: 'rgba(39, 40, 34, 0.6)',
    '& .ace_gutter': {
      backgroundColor: 'rgba(39, 40, 34, 0.8)',
      width: `${spacing(10)}px !important`,
    },
    '& .ace_scroller': {
      left: `${spacing(10)}px !important`,
    },
    '& .ace_gutter-layer': {
      width: `${spacing(10)}px !important`,
    },
  },
  errorHighlight: {
    position: 'absolute',
    zIndex: zIndex.drawer,
    backgroundColor: palette.error.dark,
    opacity: 0.3,
  },
}));

const CodePanel = ({
  code,
  compile,
  buildDelay,
  fullHeight,
  selector,
  mode,
}) => {
  const params = useSelector((state) => (
    selector ? state.hackableApp[selector] : state.hackableApp
  ));
  const dispatch = useDispatch();
  const text = code(params);
  const size = useWindowSize();

  const [annotations, setAnnotations] = useState([]);

  const classes = useStyles();

  // This is to store a reference to the ace editor javascript object on load,
  // to be able to modify markers
  const aceEditor = useRef(null);
  const highlightCode = (editor) => {
    if (!editor) {
      return;
    }

    aceEditor.current = editor;
    const markers = Object.values(editor.getSession().getMarkers());
    markers.forEach((m) => {
      if (m.clazz === classes.errorHighlight) {
        editor.getSession().removeMarker(m.id);
      }
    });

    const rows = editor.getSession().getAnnotations().map((a) => a.row);
    // Use the set constructor to remove duplicates
    const unique = [...(new Set(rows))];
    unique.forEach((r) => {
      editor.session.addMarker(
        new Range(r, 0, r, 144),
        classes.errorHighlight,
        'fullLine',
      );
    });
  };

  const build = (c) => {
    const result = compile(c, params);

    if (result) {
      Object.keys(result).forEach((p) => {
        dispatch(actions.hackableAppSetParam([p], result[p]));
      });
      setAnnotations(result.annotations || []);
    }
    highlightCode(aceEditor.current);
  };

  const theme = useTheme();
  const editorHeight = fullHeight ? `${size.height - theme.spacing(10)}px` : undefined;

  return (
    <AceEditor
      onLoad={highlightCode}
      width="100%"
      height={editorHeight}
      className={classes.root}
      mode={mode}
      theme="monokai"
      value={text}
      onChange={build}
      debounceChangePeriod={buildDelay}
      name="editor"
      editorProps={{ $blockScrolling: true }}
      setOptions={{ fixedWidthGutter: false }}
      annotations={annotations}
      wrapEnabled
      fontSize={14}
      showPrintMargin={false}
    />
  );
};
CodePanel.propTypes = {
  code: PropTypes.func.isRequired,
  compile: PropTypes.func.isRequired,
  buildDelay: PropTypes.number,
  fullHeight: PropTypes.bool,
  selector: PropTypes.string,
  mode: PropTypes.string,
};

CodePanel.defaultProps = {
  buildDelay: 1000,
  fullHeight: false,
  selector: null,
  mode: 'javascript',
};

export default CodePanel;
