import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectExperienceDataset, fetchDataIfNeeded, invalidateDataset } from '../../actions/actions';

import Picker from '../../components/Picker';
import PieChart from '../../components/d3charts/PieChart';
import BarChart from '../../components/d3charts/BarChart';
import LineChart from '../../components/d3charts/LineChart';
import ScatterPlot from '../../components/d3charts/ScatterPlot';

import { Table } from 'react-bootstrap';

class Display extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedExperienceDataset } = this.props;
    dispatch(fetchDataIfNeeded(selectedExperienceDataset));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedExperienceDataset !== this.props.selectedExperienceDataset) {
      const { dispatch, selectedExperienceDataset } = nextProps;
      dispatch(fetchDataIfNeeded(selectedExperienceDataset));
    }
  }

  handleChange(nextDataset) {
    this.props.dispatch(selectExperienceDataset(nextDataset));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedExperienceDataset } = this.props;
    dispatch(invalidateDataset(selectedExperienceDataset));
    dispatch(fetchDataIfNeeded(selectedExperienceDataset));
  }

  render () {
    const { selectedExperienceDataset, data, isFetching, lastUpdated } = this.props;

    var primaryArea = '',
        secondaryArea = '';

    if (this.props.data.length > 0) {
      switch (this.props.selectedExperienceDataset) {
        case 'experiencesOverview':
          //Primary Area
          primaryArea = <ScatterPlot
                          title={'Total Seconds for each Experience'}
                          border={'true'}
                          borderWeight={3}
                          distinctColors={false}
                          modulus={5}
                          fillColors={['#EB493A', '#5078A9', '#8B2E74', '#4E981F', '#D69C30']}
                          width={1000}
                          height={100}
                          data={data[1].secondCounts} />

          //Secondary Area
          secondaryArea = <div></div>;
          break;
        case 'experiencesStatistics':
            primaryArea = [];
            secondaryArea = [];
            //Primary Area
            primaryArea.push(
                            <ScatterPlot
                              title={'Total Seconds for each Experience'}
                              border={'true'}
                              borderWeight={3}
                              distinctColors={false}
                              modulus={5}
                              fillColors={['#EB493A', '#5078A9', '#8B2E74', '#4E981F', '#D69C30']}
                              width={1000}
                              height={100}
                              data={data[1].secondCounts} />
                            )

            primaryArea.push(
                            <LineChart
                              title={'Word Length for each Experience'}
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
                                    <td>Total Experiences</td>
                                    <td>{data[1].totals.totalExperiences}</td>
                                  </tr>
                                  <tr>
                                    <td>Total Seconds</td>
                                    <td>{data[1].totals.totalSeconds}</td>
                                  </tr>
                                  <tr>
                                    <td>Total Words</td>
                                    <td>{data[1].totals.totalWords}</td>
                                  </tr>
                                  <tr><td style={{background: '#111', textAlign: 'center', fontSize: '18'}} colSpan={2}></td></tr>
                                  <tr>
                                    <td>Average Seconds</td>
                                    <td>{data[1].averages.avgSeconds}</td>
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
                                  <tr><td style={{background: '#111', textAlign: 'center', fontSize: '18'}} colSpan={2}></td></tr>
                                  <tr>
                                    <td>I</td>
                                    <td>{data[1].pronouns.singular1stPerson}</td>
                                  </tr>
                                  <tr>
                                    <td>You</td>
                                    <td>{data[1].pronouns.singular2ndPerson}</td>
                                  </tr>
                                  <tr>
                                    <td>He</td>
                                    <td>{data[1].pronouns.masculine3rdPerson}</td>
                                  </tr>
                                  <tr>
                                    <td>She</td>
                                    <td>{data[1].pronouns.femine3rdPerson}</td>
                                  </tr>
                                  <tr>
                                    <td>It</td>
                                    <td>{data[1].pronouns.neuter3rdPerson}</td>
                                  </tr>
                                  <tr>
                                    <td>You all</td>
                                    <td>{data[1].pronouns.plural2ndPerson}</td>
                                  </tr>
                                  <tr>
                                    <td>We</td>
                                    <td>{data[1].pronouns.plural1stPerson}</td>
                                  </tr>
                                  <tr>
                                    <td>They</td>
                                    <td>{data[1].pronouns.plural3rdPerson}</td>
                                  </tr>
                                  <tr><td style={{background: '#111', textAlign: 'center', fontSize: '18'}} colSpan={2}></td></tr>
                                  <tr>
                                    <td>Before</td>
                                    <td>{data[1].experienceTimes.before}</td>
                                  </tr>
                                  <tr>
                                    <td>While</td>
                                    <td>{data[1].experienceTimes.while}</td>
                                  </tr>
                                  <tr>
                                    <td>After</td>
                                    <td>{data[1].experienceTimes.after}</td>
                                  </tr>
                                </tbody>
                              </Table>
                            )
        default:
          break;
      }
    }
    return (
      <div style={{paddingBottom: '100px'}}>
        <h1>Experience Perspective</h1>

        <hr></hr>
        {data.length > 0 &&
        <Picker value={selectedExperienceDataset}
                onChange={this.handleChange}
                options={['0', '1']}
                apiOptions={['experiencesOverview', 'experiencesStatistics']}
                displayOptions={['View all experiences', 'Experiences Statistics']}
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
  selectedExperienceDataset: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { selectedExperienceDataset, dataByDataset } = state;
  const {
    isFetching,
    lastUpdated,
    items: data
  } = dataByDataset[selectedExperienceDataset] || {
    isFetching: true,
    items: []
  };

  return {
    selectedExperienceDataset,
    data,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(Display);
