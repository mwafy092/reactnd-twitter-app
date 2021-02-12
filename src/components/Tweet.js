import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatTweet, formatDate } from '../utils/helpers';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { TiArrowBackOutline } from 'react-icons/ti';
import { handleToggleTweet } from '../actions/tweets';
import { Link, withRouter } from 'react-router-dom';
class Tweet extends Component {
  toParent = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/tweet/${id}`);
  };

  handleLike = (e) => {
    e.preventDefault();
    const { dispatch, tweet, authedUser } = this.props;
    dispatch(
      handleToggleTweet({
        id: tweet.id,
        hasLiked: tweet.hasLiked,
        authedUser,
      })
    );
  };
  render() {
    const { tweet } = this.props;
    const {
      parent,
      name,
      avatar,
      text,
      timestamp,
      likes,
      hasLiked,
      replies,
      id,
    } = tweet;
    // if there is no tweet render a warning message
    if (tweet === null) {
      return <p>This tweet doesn't exist.</p>;
    }

    return (
      <Link className='tweet' to={`/tweet/${id}`}>
        <img src={avatar} alt={`Avatar of ${name}`} className='avatar' />
        <div className='tweet-info'>
          <span>{name}</span>
          <div>{formatDate(timestamp)}</div>
          <div>
            {parent && (
              <button
                className='replying-to'
                onClick={(e) => this.toParent(e, parent.id)}>
                Replying To @{parent.author}
              </button>
            )}
          </div>
          <p>{text}</p>
          <div className='tweet-icons'>
            <TiArrowBackOutline className='tweet-icon' />
            <span>{replies !== 0 && replies}</span>
            <button className='heart-button' onClick={this.handleLike}>
              {hasLiked ? (
                <AiFillHeart className='tweet-icon' color='#e0245e' />
              ) : (
                <AiOutlineHeart className='tweet-icon' />
              )}
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </Link>
    );
  }
}

function mapStateToProps({ authedUser, users, tweets }, { id }) {
  const tweet = tweets[id];
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null;

  return {
    authedUser,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null,
  };
}

export default withRouter(connect(mapStateToProps)(Tweet));
