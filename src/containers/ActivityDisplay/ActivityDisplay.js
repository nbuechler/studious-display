import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectActivityDataset, fetchDataIfNeeded, invalidateDataset } from '../../actions/actions';

import Picker from '../../components/Picker';
import PieChart from '../../components/d3charts/PieChart';
import BarChart from '../../components/d3charts/BarChart';
import LineChart from '../../components/d3charts/LineChart';
import ForceChart from '../../components/d3charts/ForceChart';

import { Table } from 'react-bootstrap';

class Display extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedActivityDataset } = this.props;
    dispatch(fetchDataIfNeeded(selectedActivityDataset));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedActivityDataset !== this.props.selectedActivityDataset) {
      const { dispatch, selectedActivityDataset } = nextProps;
      dispatch(fetchDataIfNeeded(selectedActivityDataset));
    }
  }

  handleChange(nextDataset) {
    this.props.dispatch(selectActivityDataset(nextDataset));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedActivityDataset } = this.props;
    dispatch(invalidateDataset(selectedActivityDataset));
    dispatch(fetchDataIfNeeded(selectedActivityDataset));
  }

  render () {
    const { selectedActivityDataset, data, isFetching, lastUpdated } = this.props;

    var primaryArea = '',
        secondaryArea = '';

    if (this.props.data.length > 0) {
      switch (this.props.selectedActivityDataset) {
        case 'activitiesOverview':
          //Primary Area
          primaryArea = <BarChart
                          title={'Importance for each Activity'}
                          distinctColors={false}
                          modulus={1}
                          fillColors={['none']}
                          data={data[1].importanceCounts} />

          //Secondary Area
          secondaryArea = <div></div>;
          break;
        case 'activitiesStatistics':
            primaryArea = [];
            secondaryArea = [];
            //Primary Area
            primaryArea.push(
                            <LineChart
                              title={'Word Length for each Activity'}
                              distinctColors={false}
                              modulus={1}
                              fillColors={['none']}
                              width={1000}
                              height={100}
                              border={'true'}
                              borderWeight={3}
                              data={data[1].wordLengths} />
                            )

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
                                    <td>Total Activities</td>
                                    <td>{data[1].totals.totalActivities}</td>
                                  </tr>
                                  <tr>
                                    <td>Total Importance</td>
                                    <td>{data[1].totals.totalImportance}</td>
                                  </tr>
                                  <tr>
                                    <td>Total Words</td>
                                    <td>{data[1].totals.totalWords}</td>
                                  </tr>
                                  <tr><td style={{background: '#111', textAlign: 'center', fontSize: '18'}} colSpan={2}></td></tr>
                                  <tr>
                                    <td>Average Importance</td>
                                    <td>{data[1].averages.avgImportance}</td>
                                  </tr>
                                  <tr>
                                    <td>Average Words</td>
                                    <td>{data[1].averages.avgWords}</td>
                                  </tr>
                                  <tr><td style={{background: '#111', textAlign: 'center', fontSize: '18'}} colSpan={2}></td></tr>
                                  <tr>
                                    <td>Private</td>
                                    <td>{data[1].privacyCounts[0]}</td>
                                  </tr>
                                  <tr>
                                    <td>Public</td>
                                    <td>{data[1].privacyCounts[1]}</td>
                                  </tr>
                                </tbody>
                              </Table>
                            )
          break;
        case 'activityHasWord':
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
                                <td>Total Activity Nodes</td>
                                <td>{data[11].totalActivities}</td>
                              </tr>
                              <tr>
                                <td>Total Words</td>
                                <td>{data[12].totalWords}</td>
                              </tr>
                            </tbody>
                          </Table>
                        )
          break;
        case 'activityContainsExperience':
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
                                <td>Total Activity Nodes</td>
                                <td>{data[11].totalActivities}</td>
                              </tr>
                              <tr>
                                <td>Total Experiences</td>
                                <td>{data[12].totalExperiences}</td>
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
        <h1>Activity Perspective</h1>

        <hr></hr>
        {data.length > 0 &&
        <Picker value={selectedActivityDataset}
                onChange={this.handleChange}
                options={['0', '1', '2', '3']}
                apiOptions={['activitiesOverview', 'activitiesStatistics', 'activityHasWord', 'activityContainsExperience']}
                displayOptions={['View all activities', 'Activities Statistics', 'Activity Clusters (Words)', 'Activity Clusters (Experiences)']}
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
  selectedActivityDataset: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { selectedActivityDataset, dataByDataset } = state;
  const {
    isFetching,
    lastUpdated,
    items: data
  } = dataByDataset[selectedActivityDataset] || {
    isFetching: true,
    items: []
  };

  return {
    selectedActivityDataset,
    data,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(Display);
