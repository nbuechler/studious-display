import React from 'react';
import d3 from 'd3';
import _ from 'underscore';

import ToolTip from '../d3components/ToolTip';
import Label from '../d3components/Label';
import Bar from '../d3components/Bar';
import Point from '../d3components/Point';
import Line from '../d3components/Line';
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

    var fillColors = this.props.fillColors,
        stroke = 'black',
        strokeAlt = 'white';

    /**
     * The return statement needs to know what chart to apply the DataSeries to.
     * And, here's the thing, this.props.chart actually gets defined in the
     * React Component that calls DataSeries, where the defnition is, sort of
     * like dependency injection.
     */
    var computedColor = '#AAA',
        computedColorAlt = '#222',
        distinctColors = this.props.distinctColors,
        modulus = this.props.modulus;

    var buffers = {
      'top': 30,
      'bottom': 30,
      'left': 30,
      'right': 30,
    }

    var tempStore = {};
        tempStore.data = this.props.data;


    switch (this.props.chart) {
      case 'bar': //chart
        var bars = _.map(this.props.data, function(dataPoint, i) {
          if (distinctColors){
            computedColor = fillColors[i % modulus];
          }
          return (
            <Bar id={i} height={yScale(dataPoint) - buffers.top} width={xScale.rangeBand()} offset={xScale(i)} availableHeight={props.height} fillColor={computedColor} key={i} />
          );
        });

        var labels = _.map(this.props.data, function(dataPoint, i) {
          if (distinctColors){
            computedColor = fillColors[i % modulus];
          }
          return (
            <Label id={i} buffers={buffers} mainText={dataPoint}
              height={yScale(dataPoint)} width={xScale.rangeBand()} offset={xScale(i)} availableHeight={props.height} fillColor={computedColor} key={i} />
          );
        });

        var tips = _.map(this.props.data, function(dataPoint, i) {
          if (distinctColors){
            computedColor = fillColors[i % modulus];
          }
          return (
            <ToolTip id={i} buffers={buffers} mainText={dataPoint} visibility={'hidden'}
              height={yScale(dataPoint)} width={xScale.rangeBand()} offset={xScale(i)} availableHeight={props.height} fillColor={computedColor} key={i} />
          );
        });

        return (
          <g>
            {bars}
            {labels}
          </g>
        );
      case 'line': //chart
        var points = _.map(this.props.data, function(dataPoint, i) {
          if (distinctColors){
            computedColor = fillColors[i % modulus];
          }
          return (
            <Point id={i} height={yScale(dataPoint)} width={xScale.rangeBand()} offset={xScale(i)} r={'10px'} availableHeight={props.height} stroke={stroke} fillColor={computedColor} key={i} />
          );
        });
        var lines = _.map(this.props.data, function(dataPoint, i) {
          if (distinctColors){
            computedColor = fillColors[i % modulus];
          }
          return (
            <Line id={i}
              height={yScale(dataPoint)} width={xScale.rangeBand()} availableHeight={props.height}
              y2={yScale(dataPoint)} y1={yScale(tempStore.data[i-1])}
              x2={xScale(i)} x1={xScale(i-1)}
              stroke={stroke} fillColor={computedColor} key={i} />
          );
        });

        return (
          <g>
            {lines.slice(1, lines.length)}
            {points}
          </g>
        );
        case 'scatter': //chart
          var points = _.map(this.props.data, function(dataPoint, i) {
            if (distinctColors){
              computedColor = fillColors[i % modulus];
            }
            return (
              <Point id={i} height={yScale(dataPoint)} width={xScale.rangeBand()} offset={xScale(i)} r={'5px'} availableHeight={props.height} stroke={strokeAlt} fillColor={computedColorAlt} key={i} />
            );
          });

          return (
            <g>
              {points}
            </g>
          );
      default:
        return (
          <Empty height={this.props.height} width={this.props.width}></Empty>
        );
    }
  }
}
