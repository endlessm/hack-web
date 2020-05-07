import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import {
  useTheme,
} from '@material-ui/core';

import 'ace-builds/webpack-resolver';
import AceEditor from 'react-ace';
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

  let timeout = null;
  const delayBuild = (c) => {
    const result = compile(c, params);

    if (result) {
      Object.keys(result).forEach((p) => {
        dispatch(actions.hackableAppSetParam([p], result[p]));
      });
      setAnnotations(result.annotations || []);
    }
  };

  const build = (c) => {
    if (!buildDelay) {
      delayBuild(c);
      return;
    }

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => delayBuild(c), buildDelay);
  };

  useEffect(() => {
    const result = compile(text, params);
    if (result && result.annotations) {
      setAnnotations(result.annotations);
    }
  }, [text, compile, params]);

  const theme = useTheme();
  const editorHeight = fullHeight ? `${size.height - theme.spacing(10)}px` : undefined;

  return (
    <AceEditor
      width="100%"
      height={editorHeight}
      mode={mode}
      theme="monokai"
      value={text}
      onChange={build}
      name="editor"
      editorProps={{ $blockScrolling: true }}
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
