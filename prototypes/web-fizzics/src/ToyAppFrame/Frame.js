import React, { Component } from "react";
import SafeSrcDocIframe from 'react-safe-src-doc-iframe';
import PropTypes from 'prop-types';

const html = `
<!DOCTYPE html>
<html>
    <head>
    </head>
    <body>
    </body>
</html>
`;


class Frame extends Component {
    static defaultProps = {
        title: 'Frame',
        srcDoc: html,
        width: '100%',
        height: '100%',
        sandbox: 'allow-same-origin allow-scripts'
    }

    constructor(...args) {
        super(...args);
        this.parentRef = React.createRef();
    }
  
    loadScriptFile(scriptFile) {
        const document = this.parentRef.current.iframeElement.contentWindow.document;
        const scriptElement = document.createElement("script");
        scriptElement.src = scriptFile;
        scriptElement.async = true;
        document.body.appendChild(scriptElement);
    }
  
    loadScript(script) {
        const document = this.parentRef.current.iframeElement.contentWindow.document;
        const scriptElement = document.createElement("script");
        scriptElement.textContent = script;
        scriptElement.async = true;
        document.body.appendChild(scriptElement);
    }

    componentDidMount() {
        const iFrame = this.parentRef.current.iframeElement;
        if (!iFrame)
            return;

        iFrame.onload = () => {
            this.props.scriptFiles.forEach(scriptFile => {
                this.loadScriptFile(scriptFile);
            });
        };
    }
   
    render() {
        const {
            title,
            srcDoc,
            sandbox,
            width,
            height
        } = this.props;

        return (
            <div style={{height: height}}>
                <SafeSrcDocIframe
                    ref={this.parentRef}
                    title={title}
                    srcDoc={srcDoc}
                    sandbox={sandbox}
                    width={width}
                    height={height}
                />
            </div>
        );
    }
}

export default Frame;