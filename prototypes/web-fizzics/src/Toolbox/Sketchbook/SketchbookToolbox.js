import React, { Component } from "react";

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmIcon from '@material-ui/icons/Alarm';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CodeView from '../Codeview';
import { Box } from "@material-ui/core";
import ArrowLeft from "@material-ui/icons/ArrowLeft";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Replay from '@material-ui/icons/Replay';

class SketchbookToolbox extends Component {
    constructor(...args) {
        super(...args);
        this.codeView = React.createRef();
    }

    run() {
        const code = this.codeView.current.editor.current.editor.getValue();
        const frame = this.props.frameRef.current.frameRef.current;

        console.log(frame)
        frame.loadScript(code);

        frame.forceUpdate();
    }

    render() {
        return (
            <Box height="100%" width="100%" bgcolor="secondary.main">
                <ButtonGroup size="small" aria-label="small outlined button group">
                    <Button onClick={this.run.bind(this)}>
                        <PlayArrow />
                    </Button>
                    <Button>
                        <Replay />
                    </Button>
                </ButtonGroup>
                <CodeView ref={this.codeView}/>
            </Box>
        )
    }
}

export default SketchbookToolbox;