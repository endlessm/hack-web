import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core';


const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>hack-computer.com</title>
      <style>
        body {
          overflow:hidden;
          margin: 0;
        }
      </style>
    </head>
    <body>
    <iframe id="iframe" src="http://hack-computer.com/products" height=4000 width=100% frameBorder="0" scrolling=no>
    </body>
  </html>
`;


const useStyles = makeStyles({
  root: {
    height: 800,
  },
});

const PathwayOSIframe = () => {
  const classes = useStyles();
  let iframeElement = null;

  useEffect(() => {
    if (iframeElement) {
      iframeElement.onload = () => {
        iframeElement.contentWindow.scrollTo(0, 280);
      };
    }
  }, [iframeElement]);

  return (
    <iframe
      title="hack-computer-products"
      srcDoc={html}
      className={classes.root}
      ref={(el) => { iframeElement = el; }}
      width="100%"
    />
  );
};

export default PathwayOSIframe;
