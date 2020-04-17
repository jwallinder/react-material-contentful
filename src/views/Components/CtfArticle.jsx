import React from 'react';
import { Link } from 'react-router-dom';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.jsx';

import productStyle from 'assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx';
import withContentfulClient from 'components/Contentful/withContentfulClient.jsx';

import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Skeleton from '@material-ui/lab/Skeleton';

class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      document: null,
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    const { documentId, getEntry } = this.props;

    getEntry(documentId)
      .then((result) => {
        this.setState({
          document: result,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log('error from withCtf: ', error);
      });
  }

  render() {
    const { classes } = this.props;
    const { document } = this.state;
    const options = {
      renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) => <h5 className={classes.description}>{children}</h5>,
        //[BLOCKS.QUOTE]: (node, children) => <div className="quotation">{children}</div>,
        //[MARKS.BOLD]: (node, children) => <span className="bold-title">{children}</span>,
      },
    };

    const renderCTA = (ctaArray) => {
      return ctaArray ? (
        <Link to={ctaArray[0].fields.link} className={classes.link}>
          <Button color="primary">{ctaArray[0].fields.text}</Button>
        </Link>
      ) : null;
    };

    const renderArticle = (document, classes) => {
      const body = document.fields.body;
      const title = document.fields.title;
      const cta = document.fields.cta;
      const article = documentToReactComponents(body, options);

      return (
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>{title}</h2>
            <div className={classes.description}>{article}</div>
            {renderCTA(cta)}
          </GridItem>
        </GridContainer>
      );
    };

    const renderSkeleton = () => {
      return (
        <GridContainer justify="center">
          x
          <GridItem xs={12} sm={12} md={8}>
            <Skeleton animation="wave" variant="text" width="60%" height="50%" />
            <Skeleton animation="wave" variant="text" width="100%" />
            <Skeleton animation="wave" variant="text" width="85%" />
            <Skeleton animation="wave" variant="text" width="90%" />
            <Skeleton animation="wave" variant="text" width="60%" />
          </GridItem>
        </GridContainer>
      );
    };
    return <div className={classes.section}>{document ? renderArticle(document, classes) : renderSkeleton()}</div>;
  }
}
export default withContentfulClient(withStyles(productStyle)(Article));
