import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';

import { graphql } from 'gatsby';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

//import { Helmet } from 'react-helmet';
import get from 'lodash/get';
//import Img from 'gatsby-image';
//import Layout from '../components/layout';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
//import heroStyles from '../components/hero.module.css';

// core components
import Header from 'components/Header/Header.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Parallax from 'components/Parallax/Parallax.jsx';

//import productStyle from '../assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx';
//import withContentfulClient from '../components/Contentful/withContentfulClient.jsx';
import landingPageStyle from 'assets/jss/material-kit-react/views/landingPage.jsx';

class ArticleTemplate extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    const dashboardRoutes = [];
    const post = get(this.props, 'data.contentfulArticle');
    const options = {
      renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) => <h5>{children}</h5>,
        //[BLOCKS.QUOTE]: (node, children) => <div className="quotation">{children}</div>,
        //[MARKS.BOLD]: (node, children) => <span className="bold-title">{children}</span>,
      },
    };

    console.log('render: post=', post);

    const renderArticle = (document, classes) => {
      //const body = document.fields.body;
      // const title = document.fields.title;
      //const cta = document.fields.cta;
      const body = JSON.parse(document.body);
      console.log('body: ', body);
      console.log('classes:', classes);
      console.log('classes.section:', classes.section);
      const title = ' foobar';
      const article = documentToReactComponents(body, options);

      return (
        <div data-foo="bars" className={classes.section}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <h2 className={classes.title}>{title}</h2>
              <div className={classes.description}>{article}</div>
            </GridItem>
          </GridContainer>
        </div>
      );
    };

    const productStyle = {
      section: {
        padding: '70px 0',
        textAlign: 'center',
      },
      title: {
        marginBottom: '1rem',
        marginTop: '30px',
        minHeight: '32px',
        textDecoration: 'none',
      },
      description: {
        color: '#999',
      },
    };
    return (
      <div>
        {/* <Header
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
        /> */}
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
          <div className={classes.container}>{renderArticle(post.body, productStyle)}</div>
        </div>
        {/*
        <Footer />
        */}
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(ArticleTemplate);

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulArticle(slug: { eq: $slug }) {
      title
      slug
      body {
        body
      }
    }
  }
`;
