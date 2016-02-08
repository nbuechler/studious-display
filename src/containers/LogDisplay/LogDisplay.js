import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { selectLogDataset, fetchDataIfNeeded, invalidateDataset } from '../../actions/actions';
import Picker from '../../components/Picker';
import PieChart from '../../components/d3charts/PieChart';
import BarChart from '../../components/d3charts/BarChart';
import CalendarChart from '../../components/d3charts/CalendarChart';
import ForceChart from '../../components/d3charts/ForceChart';

import { Table, Panel, Row, Col, Button,
  Modal, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
    this.incrementMonth = this.incrementMonth.bind(this);
    this.decrementMonth = this.decrementMonth.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  componentDidMount() {
    const { dispatch, selectedLogDataset } = this.props;
    dispatch(fetchDataIfNeeded(selectedLogDataset));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedLogDataset !== this.props.selectedLogDataset) {
      const { dispatch, selectedLogDataset } = nextProps;
      dispatch(fetchDataIfNeeded(selectedLogDataset));
    }
  }

  handleChange(nextDataset) {
    this.props.dispatch(selectLogDataset(nextDataset));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedLogDataset } = this.props;
    dispatch(invalidateDataset(selectedLogDataset));
    dispatch(fetchDataIfNeeded(selectedLogDataset));
  }

  incrementMonth(e) {
    e.preventDefault();

    var month = parseInt(localStorage.getItem('focusedMonth'))
    if(month == 11) {
      localStorage.setItem('focusedMonth', 0);
      localStorage.setItem('focusedYear', parseInt(localStorage.getItem('focusedYear')) + 1);
    } else {
      localStorage.setItem('focusedMonth', parseInt(localStorage.getItem('focusedMonth')) + 1);
    }

    this.handleRefreshClick(e)
  }

  decrementMonth(e) {
    e.preventDefault();

    var month = parseInt(localStorage.getItem('focusedMonth'))
    if(month == 0) {
      localStorage.setItem('focusedMonth', 11);
      localStorage.setItem('focusedYear', parseInt(localStorage.getItem('focusedYear') - 1));
    } else {
      localStorage.setItem('focusedMonth', parseInt(localStorage.getItem('focusedMonth')) - 1);
    }



    this.handleRefreshClick(e)
  }

  render () {
    const { selectedLogDataset, data, isFetching, lastUpdated } = this.props;

    var primaryArea = '',
        secondaryArea = '';

    if (this.props.data.length > 0) {
      switch (this.props.selectedLogDataset) {
        case 'logsOverview':
          //Primary Area
          primaryArea = <BarChart
                          title={'Totals for Each Category'}
                          distinctColors={true}
                          modulus={5}
                          fillColors={['#EB493A', '#5078A9', '#8B2E74', '#4E981F', '#D69C30']}
                          data={this.props.data[1].logCounts} />

          //Secondary Area
          var pieCharts = [];
          if (this.props.data[0] != null) {
            for (var i = 0; i < this.props.data[0].pies.length; i++) {
                pieCharts.push(
                  <div>
                    <Panel header={data[0].pies[i].name}>
                      <Row>
                        <Col style={{padding: '30px'}}xs={12} md={3} lg={33}>
                          <PieChart data={data[0].pies[i].data} />
                        </Col>
                        <Col xs={12} md={9} lg={9}>
                          <Table style={{margin: 'auto', textAlign: 'center'}} striped bordered condensed hover>
                            <tbody>
                              <tr>
                                <td style={{background: '#EB493A', color: 'black', width: '50px'}}>{data[0].pies[i].data[0]}</td>
                                <td>{data[0].pies[i].values[0]}</td>
                              </tr>
                              <tr>
                                <td style={{background: '#5078A9', color: 'black', width: '50px'}}>{data[0].pies[i].data[1]}</td>
                                <td>{data[0].pies[i].values[1]}</td>
                              </tr>
                              <tr>
                                <td style={{background: '#8B2E74', color: 'black', width: '50px'}}>{data[0].pies[i].data[2]}</td>
                                <td>{data[0].pies[i].values[2]}</td>
                              </tr>
                              <tr>
                                <td style={{background: '#4E981F', color: 'black', width: '50px'}}>{data[0].pies[i].data[3]}</td>
                                <td>{data[0].pies[i].values[3]}</td>
                              </tr>
                              <tr>
                                <td style={{background: '#D69C30', color: 'black', width: '50px'}}>{data[0].pies[i].data[4]}</td>
                                <td>{data[0].pies[i].values[4]}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                    </Panel>
                  </div>
                );
            }
          }
          secondaryArea = pieCharts;
          break;
        case 'characterLengths':
          var barCharts = [];
          if (this.props.data[0] != null) {
            for (var j = 0; j < this.props.data[1].characterLengthCounts.length; j++) {
                barCharts.push(<BarChart
                                title={''}
                                width={'100'}
                                height={'100'}
                                border={'true'}
                                borderWeight={1}
                                distinctColors={true}
                                modulus={5}
                                fillColors={['#EB493A', '#5078A9', '#8B2E74', '#4E981F', '#D69C30']}
                                data={this.props.data[1].characterLengthCounts[j]} />
                              );
            }
          }
          primaryArea = barCharts;
          break;
        case 'wordLengths':
          var barCharts = [];
          if (this.props.data[0] != null) {
            for (var j = 0; j < this.props.data[1].wordLengthCounts.length; j++) {
                barCharts.push(<BarChart
                                title={''}
                                width={'100'}
                                height={'100'}
                                border={'true'}
                                borderWeight={1}
                                distinctColors={true}
                                modulus={5}
                                fillColors={['#EB493A', '#5078A9', '#8B2E74', '#4E981F', '#D69C30']}
                                data={this.props.data[1].wordLengthCounts[j]} />
                              );
            }
          }
          primaryArea = barCharts;
          break;
        case 'logHasWord':
        //Primary Area
        primaryArea = <ForceChart
                        title={''}
                        width={'800'}
                        height={'800'}
                        border={'true'}
                        borderWeight={1}
                        distinctColors={false}
                        modulus={5}
                        fillColors={['#EB493A', '#5078A9', '#8B2E74', '#4E981F', '#D69C30']}
                        data={this.props.data} />
        secondaryArea = [];
        //Secondary Area
        secondaryArea.push(
                          <Table style={{width: '500px', margin: 'auto', textAlign: 'center'}} striped bordered condensed hover>
                            <thead>
                              <tr>
                                <th style={{background: '#111', textAlign: 'center', fontSize: '18'}} colSpan={2}>Key Statistics</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Total Links</td>
                                <td>{data[9].totalLinks}</td>
                              </tr>
                              <tr>
                                <td>Total Nodes</td>
                                <td>{data[10].totalNodes}</td>
                              </tr>
                              <tr>
                                <td>Total Log Nodes</td>
                                <td>{data[11].totalLogs}</td>
                              </tr>
                              <tr>
                                <td>Total Words</td>
                                <td>{data[12].totalWords}</td>
                              </tr>
                            </tbody>
                          </Table>
                        )
          break;
        case 'eventSummary':
        // TODO: Refactor this into a graph somewhere else.
        //Primary Area
        primaryArea = [];
        primaryArea.push(
                          <Button bsSize="small"
                            style={{margin: '20px'}}
                            onClick={this.decrementMonth}>
                            Last Month
                          </Button>
                        )
        primaryArea.push(
                          <CalendarChart
                            title={''}
                            width={'400'}
                            height={'400'}
                            border={'false'}
                            borderWeight={0}
                            distinctColors={true}
                            modulus={5}
                            fillColors={['#EB493A', '#5078A9', '#8B2E74', '#4E981F', '#D69C30']}
                            data={this.props.data[5].allEvents}
                            eventfulDates={this.props.data[1].eventfulDates}
                            openModal={this.open}/>
                        )
        primaryArea.push(
                          <Button bsSize="small"
                            style={{margin: '20px'}}
                            onClick={this.incrementMonth}>
                            Next Month
                          </Button>
                        )
        secondaryArea = [];
        //Secondary Area
        secondaryArea.push(
                        <BarChart
                              title={'Totals for Each Category from 1st Log to Now'}
                              distinctColors={true}
                              modulus={5}
                              fillColors={['#EB493A', '#5078A9', '#8B2E74', '#4E981F', '#D69C30']}
                              data={[data[1].aggregateData[0].physicSum, data[1].aggregateData[0].emotionSum, data[1].aggregateData[0].academicSum, data[1].aggregateData[0].communeSum, data[1].aggregateData[0].etherSum]} />
                          )
        secondaryArea.push(
                        <Table style={{width: '500px', margin: 'auto', textAlign: 'center'}} striped bordered condensed hover>
                          <thead>
                            <tr>
                              <th style={{background: '#111', textAlign: 'center', fontSize: '18'}} colSpan={2}>Event Statistics</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Total Words</td>
                              <td>{data[1].aggregateData[0].physicSum + data[1].aggregateData[0].emotionSum + data[1].aggregateData[0].academicSum + data[1].aggregateData[0].communeSum + data[1].aggregateData[0].etherSum}</td>
                            </tr>
                          </tbody>
                        </Table>
                        )
          break;
        default:
          break;
      }
    }

    /*Modal variables*/
    var popover = <Popover title="Motivational Message">{localStorage.getItem('popoverMessage')}</Popover>;
    var tooltip = <Tooltip>Keep it up!</Tooltip>;

    return (
      <div style={{paddingBottom: '100px'}}>
        <h1>Log Perspective</h1>

        <hr></hr>
        {data.length > 0 &&
        <Picker value={selectedLogDataset}
                onChange={this.handleChange}
                options={['0', '1', '2', '3', '4']}
                apiOptions={['logsOverview', 'characterLengths', 'wordLengths', 'logHasWord', 'eventSummary']}
                displayOptions={['View all logs', 'Character Lengths', 'Word Lengths', 'Log Clusters', 'Event Summary']}
                descriptionPrimary={data[2].description_primary}
                descriptionSecondary={data[3].description_secondary}
                title={data[4].title} />
        }
          <p style={{borderTop: 'solid #BBB 1px', margin: '50px'}}>
            <br></br>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
            <br></br>
            <br></br>
          {!isFetching &&
            <a href='#'
               className='btn btn-default'
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isFetching && data.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && data.length === 0 &&
          <h2>Empty.</h2>
        }
        {data.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <div>
              <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                  <Modal.Title>{localStorage.getItem('reflectionDate')}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <p>There are <OverlayTrigger overlay={popover}><a href="#">{localStorage.getItem('eventCount')}</a></OverlayTrigger> total events.</p>
                  <hr></hr>

                  <p>Introspection is a daily task! Stay <OverlayTrigger overlay={tooltip}><a href="#">motivated!</a></OverlayTrigger></p>

                </Modal.Body>

                <Modal.Footer>
                  <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
              </Modal>
            </div>
            <div style={{ textAlign: 'center' }}>
              {primaryArea}
            </div>
            <br></br>
            <div style={{ textAlign: 'center' }}>
              {secondaryArea}
            </div>
          </div>
        }
      </div>
    );
  }
}

Display.propTypes = {
  selectedLogDataset: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { selectedLogDataset, dataByDataset } = state;
  const {
    isFetching,
    lastUpdated,
    items: data
  } = dataByDataset[selectedLogDataset] || {
    isFetching: true,
    items: []
  };

  return {
    selectedLogDataset,
    data,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(Display);
