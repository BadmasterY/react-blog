import React, { useState } from 'react';
import { Drawer, Avatar, Form, Input, Button, Popover, message } from 'antd';
import { LinkOutlined, RollbackOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Login from '../FastLogin/FastLogin';

import { Response } from '../../interfaces/response';
import { reduxState } from '../../interfaces/state';
import { actions } from '../../redux/ducks/comment';

import './reply.css';

const { TextArea } = Input;

function Reply() {
    const [showLogin, setShowLogin] = useState(false);
    const [replying, setReplying] = useState(false);
    const { reply, isReply } = useSelector((item: reduxState) => item.comment);
    const { isLogin, id, nickname, bio, url, avatarUrl } = useSelector((item: reduxState) => item.user);
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    function onClose() {
        const replyAction = actions.commentClearReply();
        dispatch(replyAction);
        const isReplyAction = actions.commentClearIsReply();
        dispatch(isReplyAction);
        form.resetFields();
        setShowLogin(false);
        setReplying(false);
    }

    async function replyFn() {
        if (!isLogin) {
            setShowLogin(true);
            return;
        }
        setReplying(true);
        await form.validateFields().then(async store => {
            const { reply: replyContent } = store;
            const data = {
                articleId: '',
                content: replyContent,
                authorId: id,
                replyId: '',
                removed: 0,
                datetime: new Date().toLocaleString(),
                avatar: nickname,
            };
            const replier: { _id: string, nickname: string }[] = [];
            if (reply.author) {
                const { id, articelId, nickname } = reply.author;
                data.articleId = articelId;
                data.replyId = id;
                replier.push({ _id: id, nickname });
            } else if (reply.articel) {
                const { id } = reply.articel;
                data.articleId = id;
            }

            await axios.post('/comment/addComment', data).then(result => {
                const resData: Response = result.data;
                const { error, msg } = resData;

                setReplying(false);
                if (error === 1) {
                    message.error(msg);
                    return;
                }

                message.success(t('Reply!'));
                const action = actions.commentAdd({
                    comment: {
                        ...data,
                        author: [{
                            _id: id,
                            avatarUrl,
                            bio,
                            url,
                            nickname,
                        }],
                        replier,
                    },
                });
                dispatch(action);
                onClose();
            }).catch(err => {
                setReplying(false);
                message.error(t('Please check netwok!'));
                console.error(err);
            });
        }).catch(err => {
            setReplying(false);
            message.error(t('Please check input!'));
            console.error(err);
        });
    }

    function loginClose() {
        setShowLogin(false);
    }

    return (
        <Drawer
            visible={isReply}
            mask={false}
            placement="bottom"
            height={375}
            footer={
                <div style={{ textAlign: 'right' }}>
                    <Button type="primary" loading={replying} onClick={replyFn} style={{ marginRight: '8px' }}>{t('Reply to')}</Button>
                    <Button onClick={onClose}>{t('Cancel')}</Button>
                </div>
            }
            title={null}
            onClose={onClose}
        >
            {
                reply.articel ?
                    <div>
                        <RollbackOutlined className="reply-icons" />
                        <Link to={reply.articel.url}>{reply.articel.title}</Link>
                    </div>
                    :
                    <Popover placement="top" content={
                        <div style={{ textAlign: 'center' }}>
                            <div>
                                {
                                    reply.author?.avatarUrl ?
                                        <Avatar src={`/user/${reply.author.avatarUrl}`} shape="square" size={64} />
                                        :
                                        <Avatar>{reply.author?.nickname}</Avatar>
                                }
                            </div>
                            <div style={{ fontWeight: 700 }}>{reply.author?.nickname}</div>
                            <div style={{ color: 'rgba(0,0,0,0.3)', fontSize: '.8em' }}>{reply.author?.bio}</div>
                            <div>{
                                reply.author?.url ?
                                    <>
                                        <LinkOutlined /> <a target="_blank" rel="noopener noreferrer" href={`http://${reply.author?.url}`}>{reply.author?.url}</a>
                                    </>
                                    : ''
                            }</div>
                        </div>
                    }>
                        <div>
                            <RollbackOutlined className="reply-icons" />
                            {
                                reply.author?.avatarUrl ?
                                    <Avatar className="reply-avatar" src={`/user/${reply.author.avatarUrl}`} shape="square" size={32} />
                                    :
                                    <Avatar className="reply-avatar">{reply.author?.nickname}</Avatar>
                            }
                            <span>{reply.author?.nickname}</span>
                        </div>
                    </Popover>
            }
            <Form
                form={form}
                className="reply-from"
            >
                <Form.Item
                    name="reply"
                    rules={[{ required: true, message: t('Please input reply!') }]}
                >
                    <TextArea
                        className="reply-textarea"
                        rows={8}
                        maxLength={200}
                        autoComplete="off"
                    />
                </Form.Item>
            </Form>
            <Login isShow={showLogin} closeFn={loginClose} />
        </Drawer>
    );
}

export default Reply;