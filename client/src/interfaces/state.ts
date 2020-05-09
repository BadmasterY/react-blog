import { State as UserState } from './user';
import { State as CommentState } from './comment';
import { State as ArticaleState } from './articale';
import { State as SettingState } from './setting';

interface State {
    user: UserState;
    comment: CommentState;
    article: ArticaleState;
    setting: SettingState;
}

export type reduxState = State;