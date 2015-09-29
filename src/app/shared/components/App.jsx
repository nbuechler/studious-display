'use strict';

import React from 'react';
import { RouteHandler, Link } from 'react-router';
import Layout from './Layout.jsx';
import Thing from './Thing.jsx';

class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = { components: this.props.components };
  }


  render () {
    return (
      <Layout {...this.props }>
        <header>
          <h1>{ this.props.title }</h1>
        </header>
        <nav>
          <ul>
            <li><Link to="/components">Components List</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
        <main role="application">
          <RouteHandler {...this.props}/>
        </main>
        <footer>
          <Thing data={[
            {label: 'A', value: 5},
            {label: 'B', value: 6},
            {label: 'F', value: 7}
          ]}>
          </Thing>
        </footer>
      </Layout>
    );
  }

}

export default App;
