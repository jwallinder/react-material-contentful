import React from 'react';
import ReactGA from 'react-ga';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// pages for this product
import LandingPage from 'views/LandingPage/LandingPage.jsx';
import FormPage from 'views/FormPage/FormPage.jsx';

const history = createBrowserHistory();
history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

export default class AppRoutes extends React.Component {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/landing-page" component={LandingPage} />
          <Route path="/form" component={FormPage} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </Router>
    );
  }
}
