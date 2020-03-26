import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CssBaseline,
  Container,
  ExpansionPanelDetails,
  ExpansionPanel,
  ExpansionPanelSummary,
  Grid,
  Divider,
  Link,
  Typography,
  ThemeProvider,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

import { sectionTheme } from './theme';


const useStyles = makeStyles({
  button: {
    color: 'white',
    borderRadius: '3em',
  },
});

const GettingStartedButton = ({ url }) => {
  const classes = useStyles();
  return (
    <Button
      component="a"
      href={url}
      target="_blank"
      variant="contained"
      color="primary"
      disableElevation
      className={classes.button}
    >
      Get Started
    </Button>
  );
};

GettingStartedButton.propTypes = {
  url: PropTypes.string.isRequired,
};


const GettingStartedExpanderItem = ({ title, children }) => {
  const classes = useStyles();
  return (
    <Box py={1}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.panelSummary}
        >
          <Typography variant="subtitle2">{title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.panelDetails}>
          <Box>
            {children}
          </Box>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Box>
  );
};

GettingStartedExpanderItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};


const GettingStartedSection = () => (
  <ThemeProvider theme={sectionTheme}>
    <CssBaseline />
    <Container maxWidth="md">
      <Box py={8}>
        <Grid container fixed component="section" justify="center">
          <Grid item>
            <Typography variant="subtitle1">
              Getting Started
            </Typography>
            <Box pt={2} pb={2}>
              <Divider />
            </Box>
          </Grid>
          <Typography variant="body1" align="center">
            <p>
              The OS Pathway runs on The Endless Operating System is simple
              and easy for anyone to use. It is fully equipped with the essential
              apps to work, learn, play and connect.
              All for free.
            </p>
            <p>
              There are a number of ways to access endless.
            </p>
          </Typography>
        </Grid>

        <GettingStartedExpanderItem title="Endless OS">
          <Box>
            <p>
              The OS Pathway runs on The Endless Operating System is simple
              and easy for anyone to use. It is fully equipped with the essential
              apps to work, learn, play and connect.
              All for free.
            </p>
            <p>
              There are a number of ways to access endless.
            </p>
          </Box>
          <Grid container justify="flex-end">
            <GettingStartedButton url="https://endlessos.com/download/" />
          </Grid>
        </GettingStartedExpanderItem>

        <GettingStartedExpanderItem title="Non-Endless OS">
          <Box>
            <p><b>Windows</b></p>
            <p>
              Start enjoying Endless OS instantly through our simple download-and-install
              process. After installation, you will still be able to use your existing
              Windows® system.
            </p>
            <p>
              * With this download, you can also create an Endless USB Stick for more
              advanced installation options.
            </p>
            <p>
              ** Endless OS is also available as an ISO image; to download it, click the
              &quot;Download from Linux or Mac&quot; tab
            </p>
          </Box>
          <Grid container justify="flex-end">
            <GettingStartedButton url="https://endlessos.com/thank-you/" />
          </Grid>
          <Box>
            <p><b>Linux/Mac (English)</b></p>
            <p>
              If you are running Linux or Mac OS X, you will need to create an Endless USB
              Stick to try a live version of Endless OS or reformat compatible computers.
            </p>
            <p>
              To begin, download an ISO of the version you’d like to try and read how to
              create a USB stick using this image.
            </p>
          </Box>
          <Grid container justify="flex-end">
            <GettingStartedButton
              url="https://torrents.endlessm.com/torrents/eos-amd64-amd64-en-3.7.6-iso.torrent"
            />
          </Grid>
        </GettingStartedExpanderItem>
        <GettingStartedExpanderItem title="Hack Laptop">
          <Box>
            <p>
              The only laptop that allows kids ages 10+ to learn to code by hacking
              their own device.
            </p>
            <p>
              A high-performance, award-winning laptop
            </p>
            <p>
              Hack utilizes the 14” ASUS E406MA laptop to deliver the world’s only
              completely hackable computer. Note that this computer must be purchased
              through Hack to access the Hack experience.
            </p>
          </Box>
          <Grid container justify="flex-end">
            <GettingStartedButton url="https://www.amazon.com/gp/product/B07KZXBKN7" />
          </Grid>
        </GettingStartedExpanderItem>
        <GettingStartedExpanderItem title="Hack Key" url="https://www.amazon.com/gp/product/B07KZXBKN7">
          <p>
            Get the full Hack experience on your own computer. The Hack Key comes on a
            USB so kids can plug it in when they&apos;re ready to play Hack.
          </p>
          <p>
            <b>System Requirements</b>
          </p>
          <p>
            <ul>
              <li>
                Operating System: Windows 10
                <span> </span>
                <Link
                  target="_blank"
                  href="https://support.hack-computer.com/hc/en-us/articles/360027685691-How-to-tell-if-you-have-Windows-10-"
                >
                  (Learn more)
                </Link>
              </li>
              <li>
                BIOS: UEFI BIOS
                <span> </span>
                <Link
                  target="_blank"
                  href="https://support.hack-computer.com/hc/en-us/articles/360027406112-How-to-check-your-Bios-"
                >
                  (Learn more)
                </Link>
              </li>
              <li>
                Other: USB 3.0
                <span> </span>
                <Link
                  target="_blank"
                  href="https://support.hack-computer.com/hc/en-us/articles/360027402332-How-to-check-if-your-computer-has-USB-3-0-"
                >
                  (Learn more)
                </Link>
              </li>
            </ul>
          </p>
          <Grid container justify="flex-end">
            <GettingStartedButton url="https://www.amazon.com/gp/product/B07RL8G5J4" />
          </Grid>
        </GettingStartedExpanderItem>
      </Box>
    </Container>
  </ThemeProvider>
);

export default GettingStartedSection;
