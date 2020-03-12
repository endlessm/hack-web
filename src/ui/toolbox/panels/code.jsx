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
}) => {
  const params = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const text = code(params);

  let timeout = null;
  const delayBuild = (c) => {
    const result = compile(c, params);
    if (result) {
      Object.keys(result).forEach((p) => {
        dispatch(actions.gameSetParam([p], result[p]));
      });
    }
  };

  const build = (c) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => delayBuild(c), 1000);
  };

  return (
    <AceEditor
      width="100%"
      height="98vh"
      mode="javascript"
      theme="terminal"
      value={text}
      onChange={build}
      name="editor"
      editorProps={{ $blockScrolling: true }}
    />
  );
};
CodePanel.propTypes = {
  code: PropTypes.func.isRequired,
  compile: PropTypes.func.isRequired,
};

export default CodePanel;
