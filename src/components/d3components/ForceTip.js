import React from 'react';
import d3 from 'd3';
import _ from 'underscore';

import MiniPieChart from '../../components/d3charts/MiniPieChart';

export default class ForceTip extends React.Component {
  constructor (props) {
    super(props);
    this.state = { };
  }
  render () {
    var ttRectWidth = this.props.ttRectWidth,
        ttRectHeight = this.props.ttRectHeight;

    var textElement = '';

      textElement = <text id={this.props.tipId} x={'400'}
                          y={this.props.availableHeight/2}
                          fill={'white'}>Error</text>;

    return (
      <g style={{visibility: this.props.visibility, fontWeight: 900, textAlign: 'center'}}>
        <rect width={ttRectWidth} height={ttRectHeight} fill="#111" opacity="0.9" stroke="black" strokeWidth="3px"
              x={400 + this.props.width/2 - ttRectWidth/2} y={this.props.availableHeight/2 - 30} >
        </rect>
        {textElement}
        <MiniPieChart data={[1,2,4,3,2]} x={400 + this.props.width/2 - ttRectWidth/2} y={this.props.availableHeight/2 - 30} />
      </g>
    );
  }

}
