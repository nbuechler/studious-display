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
        secondaryArea = '';

    if (this.props.data.length > 0) {
      switch (this.props.selectedReflectionDataset) {
        case 'userSpokeUniqueWord':
          //Primary Area
          primaryArea = [];
            for (var i = 0; i < this.props.data[5].allUniqueWords.length; i++) {
              primaryArea.push(
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
          //Secondary Area
          secondaryArea = <div></div>;
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
                options={['0']}
                apiOptions={['userSpokeUniqueWord']}
                displayOptions={['Unique Spoken Words']}
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
