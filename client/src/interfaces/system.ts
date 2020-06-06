interface SystemPayload {

}

interface SystemAction {
    type?: string;
    payload?: SystemPayload;
}

interface SystemState {
    isLoading: boolean;
}

export type State = SystemState;
export type Action = SystemAction;
export type Payload = SystemPayload;