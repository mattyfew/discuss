
import React, { Component } from 'react';

export default class App extends Component {
  render() {
      // this.props.children comes from ReactRouter
    return (
      <div>
          {this.props.children}
      </div>
    );
  }
}
