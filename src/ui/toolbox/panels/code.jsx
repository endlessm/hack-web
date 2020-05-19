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
    '& .ace_tooltip': {
      backgroundColor: palette.background.default,
      color: palette.text.secondary,
      border: `1px solid ${palette.error.dark}`,
      padding: `${spacing(1)}px`,
    },
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
  onErrors,
}) => {
  const params = useSelector((state) => (
    selector ? state.hackableApp[selector] : state.hackableApp
  ));
  const dispatch = useDispatch();
  const size = useWindowSize();
  const [text, setText] = useState(code(params));
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

  const timeoutId = useRef(null);
  const delayBuild = (c) => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      const result = compile(c, params);

      if (result) {
        Object.keys(result).forEach((p) => {
          dispatch(actions.hackableAppSetParam([p], result[p]));
        });
        setAnnotations(result.annotations || []);
      }
    }, buildDelay);
  };

  // Ref to store the current value of text to be able to use in effects
  // without triggering the callback on every user edit.
  const textRef = useRef(null);

  const build = (c) => {
    textRef.current = c;
    setText(c);
    delayBuild(c);
  };

  useEffect(() => (
    () => { clearTimeout(timeoutId.current); }
  ), []);

  useEffect(() => {
    const result = compile(text, params);
    if (result && result.annotations) {
      setAnnotations(result.annotations);
    }
  }, [text, params, compile]);

  // Recalculate the text when the params change, in other case it's not
  // possible to update the editor code after creation
  useEffect(() => {
    const result = code(params);
    if (result !== textRef.current) {
      textRef.current = result;
      setText(result);
    }
  }, [params, code]);

  const prevText = useRef();
  useEffect(() => {
    // Reset the undo if the previous text was empty
    if (!prevText.current && text) {
      aceEditor.current.getSession().getUndoManager().reset();
    }
    prevText.current = text;
  }, [text]);

  // https://github.com/securingsincity/react-ace/issues/483
  // react-ace has a bug with mixing custom annotations and worker annotations.
  // This function adds custom annotations to the list of editor annotations
  // when the worker removes them.
  const onValidate = (editorAnnotations) => {
    const editor = aceEditor.current;

    if (editor) {
      // custom annotations have an id, worker annotations doesn't
      const customAnnotations = editor.getSession().getAnnotations()
        .filter((a) => typeof a.id !== 'undefined');
      // If the customAnnotations length is different from the annotations
      // length, we only have the worker annotations so we should add the
      // custom annotations here with setAnnotations. In other case the custom
      // annotations are here and we shouldn't do anything more.
      if (customAnnotations.length !== annotations.length) {
        editor.getSession().setAnnotations([...editorAnnotations, ...annotations]);
      }

      if (onErrors) {
        onErrors(editor.getSession().getAnnotations());
      }
    }

    highlightCode(editor);
  };

  const theme = useTheme();
  const editorHeight = fullHeight ? `${size.height - theme.spacing(10)}px` : undefined;

  return (
    <AceEditor
      onLoad={highlightCode}
      onValidate={onValidate}
      annotations={annotations}
      width="100%"
      height={editorHeight}
      className={classes.root}
      mode={mode}
      theme="monokai"
      value={text}
      onChange={build}
      name="editor"
      editorProps={{ $blockScrolling: true }}
      setOptions={{ fixedWidthGutter: false, behavioursEnabled: false }}
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
  onErrors: PropTypes.func,
};

CodePanel.defaultProps = {
  buildDelay: 1000,
  fullHeight: false,
  selector: null,
  mode: 'javascript',
  onErrors: null,
};

export default CodePanel;
