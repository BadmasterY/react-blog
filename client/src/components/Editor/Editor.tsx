import React, { useState, useEffect } from 'react';
import EditorJs from 'react-editor-js';

import { EditorProps } from '../../interfaces/editor';

import EditorTools from './tools';
import { i18nEditor } from './i18n';
import { API, OutputData } from '@editorjs/editorjs';

function Editor(props: EditorProps) {
    const { needUpdate, data, onReady, onChange, onUpdated } = props;

    const [enableReInitialize, setEnableReInitialize] = useState(needUpdate);

    useEffect(() => {
        setEnableReInitialize(false);
    }, [enableReInitialize]);

    useEffect(() => {
        if (needUpdate) setEnableReInitialize(true);
    }, [needUpdate]);

    return <EditorJs
        enableReInitialize={enableReInitialize}
        onChange={(api: API, data?: OutputData) => {
            if (onChange) onChange(data);
            if (onUpdated) onUpdated();
        }}
        onReady={onReady}
        tools={EditorTools}
        i18n={i18nEditor}
        autofocus={true}
        placeholder="Write a story about you!"
        data={data}
    // logLevel={LogLevels.ERROR}
    />;
}

export default Editor;