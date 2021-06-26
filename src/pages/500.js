import React, { Component } from 'react';

import ErrorLayout from '../components/layout/error-layout';

export default class InternalErrorPage extends Component {
  render() {
    return <ErrorLayout code="500" title="Internal Error" location={this.props.location} />;
  }
}
