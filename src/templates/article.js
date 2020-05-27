import React from 'react';
import { graphql } from 'gatsby';
//import { Helmet } from 'react-helmet';
import get from 'lodash/get';
//import Img from 'gatsby-image';
//import Layout from '../components/layout';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
//import heroStyles from '../components/hero.module.css';

// core components
import GridContainer from '../components/Grid/GridContainer.jsx';
import GridItem from '../components/Grid/GridItem.jsx';

class BlogPostTemplate extends React.Component {
  render() {
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
      const title = ' foobar';
      const article = documentToReactComponents(body, options);

      return (
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className="">{title}</h2>
            <div className="">{article}</div>
          </GridItem>
        </GridContainer>
      );
    };

    return (
      <div className="wrapper">
        <h1 className="section-headline">{post.title}</h1>
        {renderArticle(post.body)}
      </div>
    );
  }
}

export default BlogPostTemplate;

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
