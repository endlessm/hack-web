import React, { Component } from "react";
import AceEditor from "react-ace";

import "ace-builds/webpack-resolver";



class Codeview extends Component {
    constructor(...args) {
        super(...args);
        this.editor = React.createRef();
    }

    render() {
        return(
            <AceEditor
                mode="javascript"
                theme="monokai"
                height="100%"
                width="100%"
                ref={this.editor}
            >
            </AceEditor>
        );
    }
}

export default Codeview;