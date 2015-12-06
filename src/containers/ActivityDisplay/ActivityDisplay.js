import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectDataset, fetchDataIfNeeded, invalidateDataset } from '../../actions/actions';
import Picker from '../../components/Picker';
import PieChart from '../../components/d3charts/PieChart';
import BarChart from '../../components/d3charts/BarChart';

class Display extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedDataset } = this.props;
    dispatch(fetchDataIfNeeded(selectedDataset));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedDataset !== this.props.selectedDataset) {
      const { dispatch, selectedDataset } = nextProps;
      dispatch(fetchDataIfNeeded(selectedDataset));
    }
  }

  handleChange(nextDataset) {
    this.props.dispatch(selectDataset(nextDataset));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedDataset } = this.props;
    dispatch(invalidateDataset(selectedDataset));
    dispatch(fetchDataIfNeeded(selectedDataset));
  }

  render () {
    const { selectedDataset, data, isFetching, lastUpdated } = this.props;

    var pieCharts = [];
    if (data[0] != null) {
      for (var i = 0; i < data[0].pies.length; i++) {
          pieCharts.push(<PieChart data={data[0].pies[i].data} />);
      }
    }
    return (
      <div style={{paddingBottom: '100px'}}>
        <h1>Activity Perspective</h1>

        <hr></hr>
        {data.length > 0 &&
        <Picker value={selectedDataset}
                onChange={this.handleChange}
                options={['0', '1']}
                apiOptions={['activitiesOverview', 'foo02']}
                displayOptions={['View all activities', 'foo02']}
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
              Nothing to display
            </div>
            <br></br>
            <div style={{ textAlign: 'center' }}>
              //Viz goes here
              Nothing to display
            </div>
          </div>
        }
      </div>
    );
  }
}

Display.propTypes = {
  selectedDataset: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { selectedDataset, dataByDataset } = state;
  const {
    isFetching,
    lastUpdated,
    items: data
  } = dataByDataset[selectedDataset] || {
    isFetching: true,
    items: []
  };

  return {
    selectedDataset,
    data,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(Display);
