import React, { Component } from 'react';

import ErrorLayout from '../components/layout/error-layout';

export default class ForbiddenPage extends Component {
  render() {
    return <ErrorLayout code="403" title="Forbidden" location={this.props.location} />;
  }
}
