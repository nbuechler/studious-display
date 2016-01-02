import React from 'react';
import d3 from 'd3';
import _ from 'underscore';

import ForceMiddle from '../d3charts/ForceMiddle';

export default class ForceChart extends React.Component {

  static defaultProps = {
    width: 500,
    height: 500
  }
  constructor (props) {
    super(props);
  }

  state = {
    force: '',
  }

  render () {


    var tickCount = 0;
    var data = d3.range(1).map(function(){
      return {r: Math.floor(Math.random() * 8 + 2)};
    });

    var force = d3.layout.force()
      // .nodes(data)
      .links(this.props.data[5].allLinks)
      .nodes(this.props.data[6].allNodes)
      .charge(function(d){
        return -140;
      })
      .linkDistance(60)
      .size([this.props.width, this.props.height]);

      force.start();
      for (var i = 0; i < data; ++i) force.tick();

    var forceMiddle = <ForceMiddle  border={true} borderWeight={1}
      width={800} height={800} distinctColors={false} fillColors={false}
      chart={'force'} modulus={5} title={''}
      data={data} force={force}/>

    console.log(this.force=force);

    self =this;



    return (
      <ForceMiddle  border={this.props.border} borderWeight={this.props.borderWeight}
        width={this.props.width} height={this.props.height}distinctColors={this.props.distinctColors} fillColors={this.props.fillColors}
        chart={'force'} modulus={this.props.modulus} title={this.props.title}
        data={this.props.data} force={this.force}/>
    );

  }

}
