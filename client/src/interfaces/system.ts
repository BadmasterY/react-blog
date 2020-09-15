interface SystemPayload {
    articles?: number;
    comments?: number;
}

interface SystemAction {
    type?: string;
    payload?: SystemPayload;
}

interface SystemState {
    VERSION: string;
    isLoading: boolean;
    articles: number;
    comments: number;
}

export type State = SystemState;
export type Action = SystemAction;
export type Payload = SystemPayload;