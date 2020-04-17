import React from 'react';
import { createClient } from 'contentful';

export default function withContentfulClient(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {}

    componentWillUnmount() {}

    handleChange() {}

    getClient = async () => {
      const createClientParam = {
        space: process.env.REACT_APP_CTF_SPACEID,
        accessToken: process.env.REACT_APP_CTF_CDN,
      };

      const client = await createClient(createClientParam);
      return client;
    };

    getEntryFnc = async (id) => {
      const client = await this.getClient();
      const entry = await client.getEntry(id, { include: 10 });
      return entry;
    };

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent {...this.props} getEntry={this.getEntryFnc} />;
    }
  };
}
