import { I18nConfig } from "@editorjs/editorjs";


export const i18nEditor: I18nConfig = {
    messages: {
        toolNames: {
            'Text': '文字',
            'Table': '表格',
            'List': '列表',
            'Heading': '标题',
            'Image': '图片',
            'Code': '代码块',
        },
        tools: {
            image: {
                'Select an Image': '选择一张图片',
            },
            list: {
                'Ordered': '有序',
                'Unordered': '无序',
            }
        },
        ui: {
            toolbar: {
                toolbox: {
                    'Add': '添加',
                },
            },
            inlineToolbar: {
                editor: {
                    'Bold': '加粗',
                    'inlineCode': '行内代码',
                },
                converter: {
                    'Convert to': '变更',
                },
                marker: {
                    'Marker': '标记',
                },
                inlineCode: {
                    'inlineCode': '行内代码',
                },
            },
            blockTunes: {
                toggler: {
                    'Click to tune': '点击调整',
                },
            },
        },
        blockTunes: {
            delete: {
                "Delete": "删除"
            },
            moveUp: {
                "Move up": "上移"
            },
            moveDown: {
                "Move down": "下移"
            }
        },
    }
};