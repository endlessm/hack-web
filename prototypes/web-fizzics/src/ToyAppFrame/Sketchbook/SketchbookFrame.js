import React, { Component } from "react";
import SafeSrcDocIframe from 'react-safe-src-doc-iframe';
import PropTypes from 'prop-types';
import Frame from "../Frame";


class SketchbookFrame extends Component {
    constructor(...args) {
        super(...args);
        this.frameRef = React.createRef();
    }

    render() {
        const { scriptFiles } = this.props;

        return <Frame title="sketchbook"
            scriptFiles={[
                'https://cdn.jsdelivr.net/npm/p5@0.10.2/lib/p5.js',
                'ToyApp/Sketchbook/main.js'
            ]}
            ref={this.frameRef}
        />
    }
}

export default SketchbookFrame;