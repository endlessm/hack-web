import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-terminal';

import { actions } from '../../../store';

const CodePanel = ({
  code,
  compile,
  buildDelay,
}) => {
  const params = useSelector((state) => state.hackableApp);
  const dispatch = useDispatch();
  const text = code(params);

  let annotations = [];
  try {
    // eslint-disable-next-line no-new,no-new-func
    new Function(text);
  } catch (err) {
    annotations = [{
      row: err.lineNumber - 3,
      column: err.columnNumber,
      type: 'error',
      text: err.message,
    }];
  }

  let timeout = null;
  const delayBuild = (c) => {
    const result = compile(c, params);

    if (result) {
      Object.keys(result).forEach((p) => {
        dispatch(actions.hackableAppSetParam([p], result[p]));
      });
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

    timeout = setTimeout(() => delayBuild(c), 1000);
  };

  return (
    <AceEditor
      width="100%"
      mode="javascript"
      theme="terminal"
      value={text}
      onChange={build}
      name="editor"
      annotations={annotations}
      editorProps={{ $blockScrolling: true }}
    />
  );
};
CodePanel.propTypes = {
  code: PropTypes.func.isRequired,
  compile: PropTypes.func.isRequired,
  buildDelay: PropTypes.number,
};

CodePanel.defaultProps = {
  buildDelay: 1000,
};

export default CodePanel;
