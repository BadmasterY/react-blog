import Embed from '@editorjs/embed';
// import Paragraph from '@editorjs/paragraph';
import Table from '@editorjs/table';
import List from '@editorjs/list';
import Code from '@editorjs/code';
import Image from '@editorjs/image';
import Header from '@editorjs/header';
import Marker from '@editorjs/marker';
import { message } from 'antd';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import InlineCode from '@editorjs/inline-code';

const EDITOR_JS_TOOLS = {
    embed: Embed,
    // paragraph: Paragraph,
    table: Table,
    list: List,
    code: Code,
    image: {
        class: Image,
        config: {
            // endpoints: {
            //     byFile: '/image/uploadImage',
            // },
            uploader: {
                uploadByFile: async (file) => {
                    const formData = new FormData();
                    formData.append("name", `${file.name}`);
                    formData.append("file", file);
                    formData.append('id', uuidv4());
                    const data = { success: -1, file: { url: '' } };
                    await axios.post('/image/uploadImage', formData).then(result => {
                        const { err, msg, content } = result.data;

                        if (err === 1) {
                            message.error(msg);
                            return;
                        }

                        data.success = 1;
                        data.file.url = content.url;
                    }).catch(err => {
                        message.error('Please check your network!');
                        console.error(err);
                        return { success: -1 };
                    });

                    return data;
                }
            }
        },
    },
    header: Header,
    marker: Marker,
    inlineCode: InlineCode,
};

export default EDITOR_JS_TOOLS;