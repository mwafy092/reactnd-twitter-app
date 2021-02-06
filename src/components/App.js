import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import LoadingBar from 'react-redux-loading';
class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    // get some data
    const { loading } = this.props;

    return (
      <div>
        <LoadingBar />
        {loading ? <Dashboard /> : null}
      </div>
    );
  }
}

// get part of state i need from redux store
const mapStateToProps = ({ authedUser }) => {
  return {
    loading: authedUser !== null,
  };
};

export default connect(mapStateToProps)(App);
