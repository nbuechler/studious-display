import React from 'react';
import d3 from 'd3';
import _ from 'underscore';

import DataSeries from '../d3components/DataSeries';
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
      <Wrapper border={true} width={this.props.width} height={this.props.height}>
        <DataSeries chart={'line'} data={this.props.data} width={this.props.width} height={this.props.height}/>
      </Wrapper>
    );

  }

}
