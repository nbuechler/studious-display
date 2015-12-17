import React from 'react';
import d3 from 'd3';
import _ from 'underscore';

export default class ToolTip extends React.Component {
  constructor (props) {
    super(props);
    this.state = { };
  }
  render () {
    var ttRectWidth= this.props.ttRectWidth,
        ttRectHeight= this.props.ttRectHeight;

    var textElement = '';

    if(this.props.mainText > 99){
      textElement = <text id={this.props.tipId} x={this.props.offset + ttRectWidth/2 }
                          y={this.props.availableHeight + this.props.buffers.top/2 - this.props.height + ttRectHeight/2}
                          fill={'white'}>{this.props.mainText}</text>;
    } else if (this.props.mainText > 9) {
      textElement = <text id={this.props.tipId} x={this.props.offset + ttRectWidth/2 + 5 }
                          y={this.props.availableHeight + this.props.buffers.top/2 - this.props.height + ttRectHeight/2}
                          fill={'white'}>{this.props.mainText}</text>;
    } else {
      textElement = <text id={this.props.tipId} x={this.props.offset + ttRectWidth/2 + 10 }
                          y={this.props.availableHeight + this.props.buffers.top/2 - this.props.height + ttRectHeight/2}
                          fill={'white'}>{this.props.mainText}</text>;
    }

    return (
      <g style={{visibility: '', fontWeight: 900, textAlign: 'center'}}>
        <rect width={ttRectWidth} height={ttRectHeight} fill="#111" opacity="0.9" stroke="black" strokeWidth="3px"
              x={this.props.offset + this.props.width/2 - ttRectWidth/2} y={this.props.availableHeight + this.props.buffers.top/2 - this.props.height} >
        </rect>
        {textElement}
      </g>
    );
  }

}
