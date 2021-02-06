import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatTweet, formatDate } from '../utils/helpers';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { TiArrowBackOutline } from 'react-icons/ti';
import { handleToggleTweet } from '../actions/tweets';
class Tweet extends Component {
  toParent = (e, id) => {
    e.preventDefault();
    // todo -> redirect to the parent tweet
  };

  handleLike = (e) => {
    e.preventDefault();
    const { dispatch, authedUser, tweet } = this.props;
    dispatch(
      handleToggleTweet({
        id: tweet.id,
        authedUser,
        hasLiked: tweet.hasLiked,
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
    } = tweet;
    // if there is no tweet render a warning message
    if (tweet === null) {
      return <p>This tweet doesn't exist.</p>;
    }

    return (
      <div className='tweet'>
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
      </div>
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

export default connect(mapStateToProps)(Tweet);
