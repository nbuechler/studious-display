import React from 'react';
import d3 from 'd3';
import _ from 'underscore';

import Bar from '../d3components/Bar';
import Empty from '../d3components/Empty';

export default class DataSeries extends React.Component {
  constructor (props) {
    super(props);
    this.state = { };
  }
  render () {
    var props = this.props;

    var yScale = d3.scale.linear()
      .domain([0, d3.max(this.props.data)])
      .range([0, this.props.height]);

    var xScale = d3.scale.ordinal()
      .domain(d3.range(this.props.data.length))
      .rangeRoundBands([0, this.props.width], 0.05);

    var color = '#AAA';

    /**
     * The return statement needs to know what chart to apply the DataSeries to.
     * And, here's the thing, this.props.chart actually gets defined in the
     * React Component that calls DataSeries, where the defnition is, sort of
     * like dependency injection.
     */
    switch (this.props.chart) {
      case 'bar':
        var bars = _.map(this.props.data, function(point, i) {
          return (
            <Bar height={yScale(point)} width={xScale.rangeBand()} offset={xScale(i)} availableHeight={props.height} color={color} key={i} />
          );
        });

        return (
          <g>{bars}</g>
        );
      default:
        return (
          <Empty height={this.props.height} width={this.props.width}></Empty>
        );
    }
  }
}
