'use strict';

import React from 'react';
import d3 from 'd3';


class Chart extends React.Component {
    render () {
      return (
        <h1>Hellow!</h1>
      );
    }

}



class Thing extends React.Component {


  constructor (props) {
    super(props);
    this.state = { title: this.props.title };
  }

  static defaultProps = {
    width: 100,
    height: 100
  }

  render () {

    return (
      <div>
        <Chart/>
      </div>

    );

  }

}

export default Thing;
