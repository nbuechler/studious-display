import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectLogDataset, fetchDataIfNeeded, invalidateDataset } from '../../actions/actions';
import Picker from '../../components/Picker';
import PieChart from '../../components/d3charts/PieChart';
import BarChart from '../../components/d3charts/BarChart';
import ForceChart from '../../components/d3charts/ForceChart';

import { Table } from 'react-bootstrap';

class Display extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
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

  render () {
    const { selectedLogDataset, data, isFetching, lastUpdated } = this.props;

    var primaryArea = '',
        secondaryArea = '';

    if (this.props.data.length > 0) {
      switch (this.props.selectedLogDataset) {
        case 'logsOverview':
          //Primary Area
          primaryArea = <BarChart
                          title={'Category Totals for each Log'}
                          distinctColors={true}
                          modulus={5}
                          fillColors={['#EB493A', '#5078A9', '#8B2E74', '#4E981F', '#D69C30']}
                          data={this.props.data[1].logCounts} />

          //Secondary Area
          var pieCharts = [];
          if (this.props.data[0] != null) {
            for (var i = 0; i < this.props.data[0].pies.length; i++) {
                pieCharts.push(<PieChart data={data[0].pies[i].data} />);
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
        default:
          break;
      }
    }
    return (
      <div style={{paddingBottom: '100px'}}>
        <h1>Log Perspective</h1>

        <hr></hr>
        {data.length > 0 &&
        <Picker value={selectedLogDataset}
                onChange={this.handleChange}
                options={['0', '1', '2', '3']}
                apiOptions={['logsOverview', 'characterLengths', 'wordLengths', 'logHasWord']}
                displayOptions={['View all logs', 'Character Lengths', 'Word Lengths', 'Log Clusters']}
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
