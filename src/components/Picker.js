import React, { Component, PropTypes } from 'react';

import { Grid, Row, Col } from 'react-bootstrap';

export default class Picker extends Component {
  render () {
    const { value, onChange, options } = this.props;

    return (
      <Grid>
        <Row>
          <Col xs={12} sm={12} md={6}>
            <h1 className='alert alert-success' style={{textAlign: 'center'}}>{value.toUpperCase()}</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6} className='pull-left'>
            <div className='well'>
              <label>Description:</label>
              <p>This is a description about the graph and it should eventually be pretty dynamically generated.</p>
              <p>This is another line for the description about the graph and it should eventually be pretty dynamically generated.</p>
            </div>
          </Col>
          <Col xs={12} sm={12} md={4} className='pull-right'>
              <label>Change Display</label>
              <select onChange={e => onChange(e.target.value)}
                      value={value}
                      className='form-control'
                      style={{minWidth: '300px', background: '#111', border: 'white solid 1px'}}>
                {options.map(option =>
                  <option value={option} key={option}>
                    {option}
                  </option>)
                }
              </select>
          </Col>
        </Row>
      </Grid>
    );
  }
}

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
