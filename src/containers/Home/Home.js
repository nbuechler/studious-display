import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button, Jumbotron } from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
      <Jumbotron style={{margin: '0%', padding: '10%', background: '#111 none repeat scroll 0% 0%'}}>
        <h2 style={{textAlign: 'right'}}>Studious Display</h2>
        <h5>The introspective learning tool includes a variety of data visualizations.</h5>
        <h5>Fantastic understandings about your log entries are synthesized to enhance your emotional intelligence.</h5>
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
