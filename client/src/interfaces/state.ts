import { State as UserState } from './user';
import { State as CommentState } from './comment';
import { State as ArticaleState } from './articale';
import { State as SettingState } from './setting';
import { State as SystemState } from './system';

interface State {
    user: UserState;
    comment: CommentState;
    article: ArticaleState;
    setting: SettingState;
    system: SystemState;
}

export type reduxState = State;