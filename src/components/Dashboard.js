import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tweet from './Tweet';
import { FiBell } from 'react-icons/fi';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h3 className='center'>
          Your Timeline
          <span className='tweet-numbers'>
            <FiBell />
            <span>{this.props.tweetIds.length}</span>
          </span>
        </h3>
        <ul className='dashboard-list'>
          {this.props.tweetIds.map((id) => (
            <li key={id}>
              <Tweet id={id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ tweets }) {
  return {
    tweetIds: Object.keys(tweets).sort(
      (a, b) => tweets[b].timestamp - tweets[a].timestamp
    ),
  };
}

export default connect(mapStateToProps)(Dashboard);
