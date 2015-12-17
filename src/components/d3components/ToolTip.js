import React from 'react';
import d3 from 'd3';
import _ from 'underscore';

export default class ToolTip extends React.Component {
  constructor (props) {
    super(props);
    this.state = { };
  }
  render () {
    return (
      <g style={{visibility: ''}}>
        <rect width="50" height="50" fill="#111" opacity="0.7" stroke="black" strokeWidth="3px"
              x={this.props.offset } y={this.props.availableHeight + this.props.buffers.top/2 - this.props.height} >
        </rect>
        <text id={this.props.tipId} x={this.props.offset + 5 } y={this.props.availableHeight + this.props.buffers.top/2 - this.props.height}
              fill={'white'}>{this.props.mainText}</text>
      </g>
    );
  }

}
