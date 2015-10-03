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
        <section>
          <Thing width={400} height={400} data={this.props.dummyData} />
        </section>
      </Layout>
    );
  }

}

export default App;
