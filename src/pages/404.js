import React, { Component } from 'react';

import ErrorLayout from '../components/layout/error-layout';

export default class NotFoundPage extends Component {
  render() {
    return <ErrorLayout code="404" title="Not Found" location={this.props.location} />;
  }
}
