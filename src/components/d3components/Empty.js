import React from 'react';
import d3 from 'd3';
import _ from 'underscore';

export default class Empty extends React.Component {
  constructor (props) {
    super(props);
    this.state = { };
  }
  render () {
    return (
      // <text x={this.props.offset} y={this.props.availableHeight - this.props.height}>No data!</text>
      <text x={0} y={this.props.height/2} fontFamily="Lato" fontSize="20px" fill="white">Sorry, no data available!</text>
    );
  }
}
