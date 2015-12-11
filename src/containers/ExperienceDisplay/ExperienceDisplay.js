import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectExperienceDataset, fetchDataIfNeeded, invalidateDataset } from '../../actions/actions';
import Picker from '../../components/Picker';
import PieChart from '../../components/d3charts/PieChart';
import BarChart from '../../components/d3charts/BarChart';
import LineChart from '../../components/d3charts/LineChart';

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

    return (
      <div style={{paddingBottom: '100px'}}>
        <h1>Experience Perspective</h1>

        <hr></hr>
        {data.length > 0 &&
        <Picker value={selectedExperienceDataset}
                onChange={this.handleChange}
                options={['0', '1']}
                apiOptions={['experiencesOverview', 'foo02']}
                displayOptions={['View all experiences', 'foo02']}
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
              <LineChart width={1000} height={100} data={data[1].secondCounts} />
            </div>
            <br></br>
            <div style={{ textAlign: 'center' }}>

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
