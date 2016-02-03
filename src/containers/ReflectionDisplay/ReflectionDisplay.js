import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectReflectionDataset, fetchDataIfNeeded, invalidateDataset } from '../../actions/actions';

import Picker from '../../components/Picker';
import PieChart from '../../components/d3charts/PieChart';
import BarChart from '../../components/d3charts/BarChart';
import LineChart from '../../components/d3charts/LineChart';
import ScatterPlot from '../../components/d3charts/ScatterPlot';
import ForceChart from '../../components/d3charts/ForceChart';

import { Table, Panel, Row, Col } from 'react-bootstrap';


class Display extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedReflectionDataset } = this.props;
    dispatch(fetchDataIfNeeded(selectedReflectionDataset));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedReflectionDataset !== this.props.selectedReflectionDataset) {
      const { dispatch, selectedReflectionDataset } = nextProps;
      dispatch(fetchDataIfNeeded(selectedReflectionDataset));
    }
  }

  handleChange(nextDataset) {
    this.props.dispatch(selectReflectionDataset(nextDataset));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedReflectionDataset } = this.props;
    dispatch(invalidateDataset(selectedReflectionDataset));
    dispatch(fetchDataIfNeeded(selectedReflectionDataset));
  }

  render () {
    const { selectedReflectionDataset, data, isFetching, lastUpdated } = this.props;

    var primaryArea = '',
        secondaryArea = '',
        tertiaryArea = '';

    if (this.props.data.length > 0) {
      switch (this.props.selectedReflectionDataset) {
        case 'userSpokeUniqueWord':
          var wordScatterData = [];
          //Primary Area
          primaryArea = [];
          //Secondary Area
          tertiaryArea = [];
            for (var i = 0; i < this.props.data[6].lowToHighUniqueWords.length; i++) {
              wordScatterData.push(this.props.data[6].lowToHighUniqueWords[i].count)
              tertiaryArea.push(
                <Table style={{margin: 'auto', textAlign: 'center'}} striped bordered condensed hover>
                  <tbody>
                    <tr>
                      <td style={{width: '300px'}}>{this.props.data[6].lowToHighUniqueWords[i].word}</td>
                      <td style={{width: '300px'}}>{this.props.data[6].lowToHighUniqueWords[i].count}</td>
                    </tr>
                  </tbody>
                </Table>
              )
            }
          primaryArea.push(
                          <BarChart
                            title={'Position in sorted list(x) vs Word Count(y)'}
                            distinctColors={false}
                            modulus={1}
                            fillColors={['none']}
                            data={wordScatterData} />
                          )
          break;
        case 'userDidActivityWithLog':
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
                                <td>{data[10].totalLinks}</td>
                              </tr>
                              <tr>
                                <td>Total Nodes</td>
                                <td>{data[11].totalNodes}</td>
                              </tr>
                              <tr>
                                <td>Total Activity Nodes</td>
                                <td>{data[12].totalActivities}</td>
                              </tr>
                              <tr>
                                <td>Total Words</td>
                                <td>{data[13].totalExperiences}</td>
                              </tr>
                              <tr>
                                <td>Total Words</td>
                                <td>{data[14].totalLogs}</td>
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
        <h1>Experience Perspective</h1>

        <hr></hr>
        {data.length > 0 &&
        <Picker value={selectedReflectionDataset}
                onChange={this.handleChange}
                options={['0', '1']}
                apiOptions={['userSpokeUniqueWord', 'userDidActivityWithLog']}
                displayOptions={['Unique Spoken Words', 'User Did Activity with Log']}
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
            <div>
                {secondaryArea}
            </div>
          {tertiaryArea.length > 0 &&
            <div style={{ textAlign: 'center', height: '300px', overflowY: 'scroll'}}>
                {tertiaryArea}
            </div>
          }
          </div>
        }
      </div>
    );
  }
}

Display.propTypes = {
  selectedReflectionDataset: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { selectedReflectionDataset, dataByDataset } = state;
  const {
    isFetching,
    lastUpdated,
    items: data
  } = dataByDataset[selectedReflectionDataset] || {
    isFetching: true,
    items: []
  };

  return {
    selectedReflectionDataset,
    data,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(Display);
