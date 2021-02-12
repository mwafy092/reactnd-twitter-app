import React, { Component } from 'react';
import { CgTimelapse } from 'react-icons/cg';
import { handleAddTweet } from '../actions/tweets';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
class NewTweet extends Component {
  state = {
    text: '',
    toHome: false,
  };

  handleChange = (e) => {
    const text = e.target.value;
    this.setState({ text });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { text } = this.state;
    const { dispatch, id } = this.props;

    dispatch(handleAddTweet(text, id));
    this.setState(() => ({ text: '', toHome: id ? false : true }));
  };
  render() {
    //   todo -> when submit redirect to the homepage
    const { text, toHome } = this.state;

    if (toHome) {
      return <Redirect to='/' />;
    }
    const tweetLeft = 280 - text.length;
    return (
      <div>
        {this.props.id ? (
          <h3 className='center'>Compose new reply</h3>
        ) : (
          <h3 className='center'>Compose new Tweet</h3>
        )}

        <form className='new-tweet' onSubmit={this.handleSubmit}>
          <textarea
            placeholder="What's Happening?"
            value={text}
            onChange={this.handleChange}
            className='textarea'
            maxLength={280}
          />
          {tweetLeft <= 100 && (
            <div className='tweet-length'>
              {tweetLeft}
              <CgTimelapse style={{ marginLeft: '0.3rem' }} />
            </div>
          )}
          <button className='btn' type='submit' disabled={text === ''}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(NewTweet);
