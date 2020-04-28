import React from 'react';

// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/icons

// core components
import Header from 'components/Header/Header.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Parallax from 'components/Parallax/Parallax.jsx';
import SnackbarContent from 'components/Snackbar/SnackbarContent.jsx';

import landingPageStyle from 'assets/jss/material-kit-react/views/landingPage.jsx';

//Contentful
import withContentfulClient from 'components/Contentful/withContentfulClient.jsx';
import CtfArticle from '../Components/CtfArticle.jsx';

// Sections for this page
import Form from './Form.jsx';

const dashboardRoutes = [];

class FormPage extends React.Component {
  constructor(props) {
    console.log('FormPage constructor');
    super(props);

    this.state = {
      articles: null,
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    const { getEntry } = this.props;
    const documentId = process.env.REACT_APP_FORM_PAGE;
    console.log('documentId: ', documentId);

    getEntry(documentId)
      .then((result) => {
        this.setState({ articles: result.fields.articles });
      })
      .catch((error) => {
        console.log('error from withCtf: ', error);
      });
  }

  render() {
    const { classes, ...rest } = this.props;
    const emailLinkStyle = { color: '#FFFFFF' };
    const articles = this.state.articles;

    const showMsg = true;
    const msg = () =>
      showMsg ? (
        <SnackbarContent
          message={
            <span>
              An important message! please mail us on{' '}
              <a style={emailLinkStyle} href="mailto:foo@example.com">
                foo@example.com
              </a>
            </span>
          }
          color="primary"
          icon="info"
        />
      ) : null;

    const renderArticles = () => {
      return articles ? articles.map((article, index) => <CtfArticle key={index} documentId={article.sys.id} />) : null;
    };

    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="react-material-contentful"
          //rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 100,
            color: 'white',
          }}
          {...rest}
        />
        <Parallax filter image={require('assets/img/bg.jpg')}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>react-material-contentful</h1>
                <h4>React. Material-UI. Contentful</h4>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            {msg()}
            {renderArticles()}
            <Form />
          </div>
        </div>
        {/*
        <Footer />
        */}
      </div>
    );
  }
}
export default withContentfulClient(withStyles(landingPageStyle)(FormPage));
