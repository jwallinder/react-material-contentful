import React from 'react';
import { Link } from 'react-router-dom';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// @material-ui/icons
import Email from '@material-ui/icons/Email';
import People from '@material-ui/icons/People';
import Message from '@material-ui/icons/Message';

// core components

import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import CustomInput from 'components/CustomInput/CustomInput.jsx';

import productStyle from 'assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx';

import { withFirebase } from '../../components/Firebase';
import { compose } from 'recompose';
import axios from 'axios';
import ReactGA from 'react-ga';

class AboutNoP extends React.Component {
  state = {
    dataSent: false,
    open: false,
    name: '',
    email: '',
    message: '',
  };

  componentDidMount() {
    this.templateId = process.env.REACT_APP_SENDGRID_WELCOME_TEMPLATEID;
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleMessageChange = (event) => {
    this.setState({ message: event.target.value });
  };

  handleFormSubmit = () => {
    const email = this.state.email;
    if (!this.validateEmail(email)) {
      this.setState({
        open: true,
      });

      ReactGA.event({
        category: 'Signup',
        action: 'Signup email validation fail',
      });

      return;
    }

    this.writeUserData(this.state.name, this.state.email, this.state.message);
    this.sendWelcomeMail(this.state.email, this.state.name);
    ReactGA.event({
      category: 'Signup',
      action: 'Signup ok',
    });
  };

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  sendWelcomeMail = (mailTo, name) => {
    const mailConfig = {
      to: mailTo,
      from: {
        name: 'Sender name',
        email: 'sender email',
      },
      subject: 'sender subject',
      text: 'sender text',
      html: 'sender html',
      templateId: this.templateId,
    };
    const mailSenderUrl = process.env.REACT_APP_MAILSENDER_URL;
    const mailSenderUser = process.env.REACT_APP_MAILSENDER_USER;
    const mailSenderPass = process.env.REACT_APP_MAILSENDER_PASS;

    axios
      .post(mailSenderUrl, mailConfig, {
        auth: {
          username: mailSenderUser,
          password: mailSenderPass,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  writeUserData = (name, email, message) => {
    this.props.firebase.doAddNewUserData(name, email, message);
    this.setState({ dataSent: true });
  };

  render() {
    const dataSent = this.state.dataSent;
    const { classes } = this.props;

    if (dataSent) {
      return (
        <div className={classes.section}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <h2 className={classes.title}>Email sent</h2>
              <h5 className={classes.description}>Email sent using sendgrid</h5>
              <Link to={'/'} className={classes.link}>
                <Button color="primary">OK</Button>
              </Link>
            </GridItem>
          </GridContainer>
        </div>
      );
    } else {
      return (
        <div className={classes.section}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <form id="signup-form">
                <CustomInput
                  labelText="Name"
                  id="name"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: this.handleNameChange,
                    type: 'text',
                    endAdornment: (
                      <InputAdornment position="end">
                        <People className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                />
                <CustomInput
                  labelText="Email"
                  id="email"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: this.handleEmailChange,
                    type: 'email',
                    autoComplete: 'email',
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                />
                <CustomInput
                  labelText="Message"
                  id="message"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    onChange: this.handleMessageChange,
                    type: 'text',
                    endAdornment: (
                      <InputAdornment position="end">
                        <Message className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button type="button" color="primary" size="lg" onClick={this.handleFormSubmit}>
                  Bli medlem!
                </Button>
              </form>
            </GridItem>
          </GridContainer>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{'Felaktig epost'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">Email has an invalid format</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary" autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }
}

export default compose(withFirebase, withStyles(productStyle))(AboutNoP);
