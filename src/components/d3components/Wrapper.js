import React from 'react';
import d3 from 'd3';
import _ from 'underscore';

export default class Wrapper extends React.Component {
  render () {
    // var {props} = this;
    // var color = ['#EB493A', '#5078A9', '#8B2E74', '#4E981F', '#D69C30'];
    return (
      <svg style={{border: '0px solid black', padding: '0px', background: '#222'}} width={this.props.width} height={this.props.height}>{this.props.children}</svg>
    );

  }

}
