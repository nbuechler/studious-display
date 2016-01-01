import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import _ from 'underscore';

export default class Node extends React.Component {
  constructor (props) {
    super(props);
    this.state = { };
  }
  render () {
    return (
      <circle fill={this.props.fillColor}
        r={this.props.r}
        cx={this.props.cx}
        cy={this.props.cy}
        stroke={this.props.stroke}
        style={{strokeWidth: '3px'}}
        />
    );
  }
}
