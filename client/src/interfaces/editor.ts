import { API, OutputData } from "@editorjs/editorjs";

export interface EditorProps {
    needUpdate: boolean;
    data?: OutputData;
    onReady?: () => void;
    onChange?: (data?: OutputData) => void;
    onUpdated?: () => void;
}