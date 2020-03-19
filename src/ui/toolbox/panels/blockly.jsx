import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Blockly from 'blockly/core';
import 'blockly/blocks';
import locale from 'blockly/msg/en';

import { Box } from '@material-ui/core';

import { actions } from '../../../store';

Blockly.setLocale(locale);

const BlocklyPanel = ({
  toolbox,
  initialXml,
  compile,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const primaryWorkspace = Blockly.inject(
      document.querySelector('#blocklyDiv'),
      { toolbox },
    );

    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml), primaryWorkspace);
    primaryWorkspace.addChangeListener(() => {
      const result = compile(primaryWorkspace);

      if (result) {
        Object.keys(result).forEach((p) => {
          dispatch(actions.hackableAppSetParam([p], result[p]));
        });
      }
    });

    return () => {
      document.querySelector('#blocklyDiv').innerHTML = '';
    };
  });

  return (
    <>
      <Box id="blocklyDiv" width="100%" height="500px" />
    </>
  );
};

BlocklyPanel.propTypes = {
  toolbox: PropTypes.string.isRequired,
  initialXml: PropTypes.string.isRequired,
  compile: PropTypes.func.isRequired,
};

export default BlocklyPanel;
