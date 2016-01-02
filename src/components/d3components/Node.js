import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import _ from 'underscore';

export default class Node extends React.Component {
  constructor (props) {
    super(props);
    this.state = { };
  }

  _handleOver(d) {
    var forceTipDOM = ReactDOM.findDOMNode(this).parentElement.parentElement.children[3];

    forceTipDOM.children[1].innerHTML = 'pooppooppooppooppoop';
    forceTipDOM.children[1].setAttribute('x', d.cx + 20);
    forceTipDOM.children[1].setAttribute('y', d.cy + 20);
    forceTipDOM.children[1].setAttribute('visibility', 'visible');

    console.log(forceTipDOM.children[1], d);
  }
  _handleOut(d) {
    var forceTipDOM = ReactDOM.findDOMNode(this).parentElement.parentElement.children[3];

    forceTipDOM.children[1].innerHTML = 'Hello world!';
    forceTipDOM.children[1].setAttribute('visibility', 'hidden');

    console.log(d);
  }

  render () {
    var node = '';

    switch (this.props.nodeType) {
      case 'log':
      node = <circle  fill={'white'}
                      r={this.props.r + 'px'}
                      cx={this.props.cx}
                      cy={this.props.cy}
                      stroke={this.props.stroke}
                      style={{strokeWidth: '3px'}}
                      onMouseOver={this._handleOver.bind(this, this.props)}
                      onMouseOut={this._handleOut.bind(this, this.props)}
                      />
        break;
      case 'word':
      node = <circle  fill={this.props.fillColor}
                      r={this.props.r * ('.' + this.props.characters) + 'px'}
                      cx={this.props.cx}
                      cy={this.props.cy}
                      stroke={this.props.stroke}
                      style={{strokeWidth: '3px'}}
                      onMouseOver={this._handleOver.bind(this, this.props)}
                      onMouseOut={this._handleOut.bind(this, this.props)}
                      />
        break;
      default:
        break;
    }

    return (
      node
    );
  }
}
