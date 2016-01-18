import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import _ from 'underscore';

export default class Bar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <rect fill={this.props.fillColor}
        width={this.props.width} height={this.props.height}
        x={this.props.x} y={this.props.y}
        rx="10" ry="10" 
        style={{stroke: 'black', strokeWidth: '3px'}}>
        <title>Date: {this.props.date}</title>
      </rect>
    );
  }
}
