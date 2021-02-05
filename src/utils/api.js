import { _getUsers, _getTweets, _saveLikeToggle, _saveTweet } from './_DATA';

// getting data from database
export function getInitialData() {
  return Promise.all([_getUsers(), _getTweets()]).then(([users, tweets]) => ({
    users,
    tweets,
  }));
}

// toggle tweet like
export function saveLikeToggle(info) {
  return _saveLikeToggle(info);
}

// save tweet to database
export function saveTweet(info) {
  return _saveTweet(info);
}
