import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatTweet, formatDate } from '../utils/helpers';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { TiArrowBackOutline } from 'react-icons/ti';

class Tweet extends Component {
  toParent = (e, id) => {
    e.preventDefault();
    // todo -> redirect to parent tweet
  };

  handleLike = (e) => {
    e.preventDefault();
    // todo -> handle like
  };
  render() {
    const { tweet } = this.props;
    const {
      avatar,
      name,
      hasLiked,
      text,
      replies,
      timestamp,
      parent,
      likes,
    } = tweet;
    console.log(parent);
    if (tweet === null) {
      return <p>This Tweet Doesn't Exist</p>;
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
                Replaying to @{parent.author}
              </button>
            )}
          </div>
          <p>{text}</p>
          <div className='tweet-icons'>
            <TiArrowBackOutline className='tweet-icon' />
            <span>{replies > 0 && replies}</span>
            <button className='heart-button' onClick={this.handleLike}>
              {hasLiked ? (
                <AiFillHeart color='#e0245e' className='tweet-icon' />
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

function mapStateToProps({ authedUser, tweets, users }, { id }) {
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
