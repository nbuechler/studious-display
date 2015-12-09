import React from 'react';
import d3 from 'd3';
import _ from 'underscore';

export default class Bar extends React.Component {
  constructor (props) {
    super(props);
    this.state = { };
  }
  render () {
    return (
      <rect fill={this.props.color}
        width={this.props.width} height={this.props.height}
        x={this.props.offset} y={this.props.availableHeight - this.props.height}
        style={{stroke: 'black', strokeWidth: '3px'}} />
    );
  }
}
