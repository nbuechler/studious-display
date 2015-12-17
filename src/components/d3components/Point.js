import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import _ from 'underscore';

export default class Point extends React.Component {
  constructor (props) {
    super(props);
    this.state = { };
  }
  _handleOver(d) {
    /*
     * Assumption: the dataLength is always half the size of the array of children
     */
    ReactDOM.findDOMNode(this).parentElement.children[this.props.dataLength + d].style.visibility = 'visible';
  }
  _handleOut(d) {
    /*
     * Assumption: the dataLength is always half the size of the array of children
     */
    ReactDOM.findDOMNode(this).parentElement.children[this.props.dataLength + d].style.visibility = 'hidden';
  }
  render () {
    return (
      <circle fill={this.props.fillColor}
        r={this.props.r}
        cx={this.props.offset + this.props.width/2}
        cy={this.props.availableHeight - this.props.height}
        stroke={this.props.stroke}
        style={{strokeWidth: '3px'}}
        onMouseOver={this._handleOver.bind(this, this.props.id)}
        onMouseOut={this._handleOut.bind(this, this.props.id)}
        />
    );
  }
}
