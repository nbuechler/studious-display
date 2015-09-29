'use strict';

import React from 'react';

class ComponentName extends React.Component {

  constructor (props) {
    super(props);
    this.state = { title: this.props.title };
  }

  render () {

    return (
      <article className='ComponentName' onClick={ this.props.onClick }>
        <h3 className='ComponentName-title'>{ this.state.title }</h3>
        <p>Hellow owrld</p>
      </article>
    );
  }

}

export default ComponentName;
