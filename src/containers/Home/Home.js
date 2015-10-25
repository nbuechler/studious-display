import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button, Jumbotron } from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
      <Jumbotron style={{margin: '0%', padding: '10%', background: '#111 none repeat scroll 0% 0%'}}>
        <h2 style={{textAlign: 'right'}}>Studious Display</h2>
        <h5>Figure out something cool to say here about the display!</h5>
        <h5>Then write it here!</h5>
        <Link to="/login">
          <Button bsStyle="success" className="pull-right">
            Great!
          </Button>
        </Link>
      </Jumbotron>
    );
  }
}

export default Home
