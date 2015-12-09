import React from 'react';
import d3 from 'd3';
import _ from 'underscore';

import FiveColorDataSeries from '../d3components/FiveColorDataSeries';
import Wrapper from '../d3components/Wrapper';

export default class BarChart extends React.Component {

  static defaultProps = {
    width: 500,
    height: 500
  }
  constructor (props) {
    super(props);
    this.state = { };
  }

  render () {
    return (
      <Wrapper width={this.props.width} height={this.props.height}>
        <FiveColorDataSeries data={this.props.data} width={this.props.width} height={this.props.height}/>
      </Wrapper>
    );

  }

}
