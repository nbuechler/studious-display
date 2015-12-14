import React from 'react';
import d3 from 'd3';
import _ from 'underscore';

export default class Bar extends React.Component {
  constructor (props) {
    super(props);
    this.state = { };
  }
  _handleOver(d) {
    console.log(d);
  }
  _handleOut(d) {
    console.log(d);
  }
  render () {
    function test(key) {
      console.log(key);
    }
    return (
      <rect fill={this.props.fillColor}
        width={this.props.width} height={this.props.height}
        x={this.props.offset} y={this.props.availableHeight - this.props.height}
        style={{stroke: 'black', strokeWidth: '3px'}}
        onMouseOver={this._handleOver.bind(this, this.props.id)}
        onMouseOut={this._handleOut.bind(this, null)}
        />
    );
  }
}
