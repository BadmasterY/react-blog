export interface Response {
    error: number;
    msg?: string;
    content?: object;
}

export interface UploadImageResponse extends Response {
    content?: {
        url: string;
    }
}