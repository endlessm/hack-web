import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-terminal';

const CodePanel = ({
  code,
  compile,
  onChange,
}) => {
  const params = useSelector((state) => state.game);
  const text = code(params);

  const build = (c) => {
    const result = compile(c, params);
    if (result) {
      onChange(result);
    }
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
  onChange: PropTypes.func.isRequired,
};

export default CodePanel;
