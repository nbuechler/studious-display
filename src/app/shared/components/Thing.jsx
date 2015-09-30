'use strict';

import React from 'react';
import d3 from 'd3';

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
      <div>hello</div>
    );

  }

}

export default Thing;
