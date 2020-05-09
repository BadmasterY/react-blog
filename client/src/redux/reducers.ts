// reducer 入口
import { combineReducers } from 'redux';
import user from './ducks/user';
import comment from './ducks/comment';
import article from './ducks/article';
import setting from './ducks/setting';

// combineReducers
export default combineReducers({user, comment, article, setting});