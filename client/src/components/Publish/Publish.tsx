import React, { useState, useEffect } from 'react';
import { Drawer, Button, Form, Input, Modal, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import localforage from 'localforage';
import axios from 'axios';

import Editor from '../Editor/Editor';

import { reduxState } from '../../interfaces/state';
import { Response } from '../../interfaces/response';

import './publish.css';
import { OutputData } from '@editorjs/editorjs';

const { confirm } = Modal;

/**
 * get the local data
 */
async function getLocal(id: string) {
    let localContent: OutputData = { blocks: [] }, localTitle = '';
    await localforage
        .getItem<OutputData>(`articleContent_${id}`)
        .then(value => {
            if (value !== null) {
                localContent = value;
            }
        }).catch(err => console.log(err));

    await localforage
        .getItem<string>(`articleTitle_${id}`)
        .then(value => {
            if (value !== null) {
                localTitle = value;
            }
        }).catch(err => console.log(err));

    if (localContent.blocks.length === 0 && localTitle === '') return null;

    return {
        title: localTitle,
        content: localContent,
    };
}

async function clearLocal(id: string) {
    await localforage.removeItem(`articleTitle_${id}`).then(() => {
        console.log('Cleared...');
    }).catch(err => console.log(err));
    await localforage.removeItem(`articleContent_${id}`).then(() => {
        console.log('Cleared...');
    }).catch(err => console.log(err));
}

function Publish(props: { visible: boolean, callback?: Function }) {
    const { callback, visible } = props;

    const { id } = useSelector((item: reduxState) => item.user);
    const [isPublish, setPublish] = useState(false);
    const [editorUpdate, setEditorUpdate] = useState(false);
    const [form] = Form.useForm();
    const { t } = useTranslation();

    function initialForm() {
        form.setFieldsValue({
            title: '',
            content: { blocks: [] },
        });
    }

    function initialData() {
        initialForm();

        getLocal(id).then(result => {
            if (result !== null) {
                confirm({
                    title: t('Do you want to recover?'),
                    icon: <QuestionCircleOutlined />,
                    content: t('You have some uncommitted content. Do you need to restore it?'),
                    okText: t('Yes'),
                    okType: 'primary',
                    cancelText: t('No'),
                    onOk: () => {
                        form.setFieldsValue(result);
                        setEditorUpdate(true);
                    },
                    onCancel: () => {
                        clearLocal(id);
                    },
                });
            }
        }).catch(err => console.log(err));
    }

    function titleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (visible) localforage.setItem(`articleTitle_${id}`, event.target.value);
    }

    function contentChange(data?: OutputData) {
        if (visible) localforage.setItem(`articleContent_${id}`, data);
    }

    async function publishArticle() {
        setPublish(true);
        await form.validateFields().then(async result => {
            const { title, content } = result;

            await axios.post('/article/publish', {
                authorId: id,
                title,
                content,
            }).then(result => {
                const data: Response = result.data;
                const { error, msg } = data;

                setPublish(false);

                if (error === 1) {
                    message.error(msg);
                    return;
                }

                message.success(t('Published!'));
                if (callback) callback();
                initialForm();
                clearLocal(id);
            }).catch(err => {
                setPublish(false);
                message.error(t('Please check network!'));
                console.log(err);
            })
        }).catch(err => {
            setPublish(false);
            message.error(t('Please check input!'));
            console.log(err);
        });
    }

    useEffect(() => {
        if (visible) initialData();
    }, [visible]);

    return (
        <Drawer
            className="publish"
            visible={visible}
            placement="bottom"
            height="100%"
            closable={false}
            forceRender={true}
            destroyOnClose={true}
            onClose={() => {
                setEditorUpdate(false);
                initialForm();
                if (callback) callback();
            }}
            bodyStyle={{
                overflowX: 'hidden',
                overflowY: 'auto',
            }}
            footer={
                <div style={{
                    textAlign: 'right'
                }}>
                    <Button
                        style={{
                            marginRight: '8px',
                        }}
                        onClick={() => {
                            if (callback) callback();
                        }}
                    >{t('Cancel')}</Button>
                    <Button loading={isPublish} type="primary" onClick={publishArticle}>{t('Submit')}</Button>
                </div>
            }
        >
            <Form
                form={form}
                hideRequiredMark={true}
            >
                <Form.Item
                    name="title"
                    rules={[{ required: true, message: t('Please input title!') }]}
                >
                    <Input
                        autoComplete="off"
                        placeholder={t("Please input title...")}
                        onChange={titleChange}
                    />
                </Form.Item>
                <Form.Item
                    name="content"
                    valuePropName='data'
                    rules={[{
                        required: true,
                        message: t('Please input content!'),
                        validator: (rule, value) => {
                            if (value.blocks.length === 0) {
                                return Promise.reject('');
                            } else {
                                return Promise.resolve();
                            }
                        }
                    }]}
                >
                    <Editor
                        needUpdate={editorUpdate}
                        onChange={contentChange}
                        onUpdated={() => { setEditorUpdate(false) }}
                    />
                </Form.Item>
            </Form>
        </Drawer>
    );
}

export default Publish;