import { getInitialData } from '../utils/api';
import { setAuthedUser } from './authedUser';
import { receiveTweets } from './tweets';
import { receiveUsers } from './users';

const AUTHED_USER = 'sarah_edo'; // Temp solution until creating login

// thunk action creator
export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, tweets }) => {
      dispatch(receiveTweets(tweets));
      dispatch(receiveUsers(users));
      dispatch(setAuthedUser(AUTHED_USER));
    });
  };
}
