interface SettingState {
    id: string;
    isUseRegister: boolean;
}

interface SettingPayload extends SettingState {}

interface SettingAction {
    type?: string;
    payload?: SettingPayload;
}

export type Action = SettingAction;
export type State = SettingState;
export type Payload = SettingPayload;