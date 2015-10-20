import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectUser, fetchDataIfNeeded, invalidateUser } from '../../actions/actions';
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
    const { dispatch, selectedUser } = this.props;
    dispatch(fetchDataIfNeeded(selectedUser));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedUser !== this.props.selectedUser) {
      const { dispatch, selectedUser } = nextProps;
      dispatch(fetchDataIfNeeded(selectedUser));
    }
  }

  handleChange(nextUser) {
    this.props.dispatch(selectUser(nextUser));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedUser } = this.props;
    dispatch(invalidateUser(selectedUser));
    dispatch(fetchDataIfNeeded(selectedUser));
  }

  render () {
    const { selectedUser, data, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <Picker value={selectedUser}
                onChange={this.handleChange}
                options={['foo01']} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href='#'
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
              <BarChart data={data[1].logCounts} />
            </div>
            <br></br>
            <div style={{ textAlign: 'center' }}>
              <PieChart data={data[0].pies[0].data} />
              <PieChart data={data[0].pies[1].data} />
              <PieChart data={data[0].pies[2].data} />
              <PieChart data={data[0].pies[3].data} />
              <PieChart data={data[0].pies[4].data} />
            </div>
          </div>
        }
      </div>
    );
  }
}

Display.propTypes = {
  selectedUser: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { selectedUser, dataByUser } = state;
  const {
    isFetching,
    lastUpdated,
    items: data
  } = dataByUser[selectedUser] || {
    isFetching: true,
    items: []
  };

  return {
    selectedUser,
    data,
    isFetching,
    lastUpdated
  };
}

export default (Display);
