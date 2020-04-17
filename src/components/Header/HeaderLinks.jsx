/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import { Apps, CloudDownload, AccountCircle } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import ReactGA from 'react-ga'

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";


class HeaderLinks extends React.Component {

  handleSignout = () => {
    ReactGA.event({
      category: 'MyAccount',
      action: 'Signout clicked'
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <List className={classes.list}>

        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            buttonText="Mitt konto "
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            buttonIcon={AccountCircle}
            dropdownList={[
              <Link to={"/login-page"} className={classes.link}>
                <Button
                  color="transparent"
                  className={classes.navLink}>
                  Sign in
                       </Button>
              </Link>,
              <Link to={"/"} className={classes.link}>
              <Button
                color="transparent"
                onClick={this.handleSignout}
                className={classes.navLink}
              >

                Sign out
            </Button>
            </Link>,

            ]
            }
          />
        </ListItem>

      </List>
    );
  };
}

export default withStyles(headerLinksStyle)(HeaderLinks);
