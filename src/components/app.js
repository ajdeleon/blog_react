import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    ); //in routes, nested components are passed to parent as this.props.children
  }
}
