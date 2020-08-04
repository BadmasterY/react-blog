import React from 'react';
import { List, Comment, Avatar, Popover, Tag } from 'antd';
import { useDispatch } from 'react-redux';
import { LinkOutlined, RollbackOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import { actions } from '../../redux/ducks/comment';

import './commentlist.css';

interface Props {
    comments: {
        authorId: string;
        author: {
            _id: string;
            nickname: string;
            avatarUrl?: string;
            url: string;
            bio: string;
        }[];
        avatar: string;
        content: string;
        datetime: string;
        replyId?: string;
        replier?: {
            _id: string;
            nickname: string;
        }[];
    }[];
}

function CommentList(props: Props) {
    const { comments } = props;

    const history = useHistory();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    function replyFn(author: {
        _id: string;
        nickname: string;
        avatarUrl?: string;
        url: string;
        bio: string;
    }) {
        const { _id, nickname, avatarUrl, url, bio } = author;
        const articelId = history.location.search.split('=')[1];
        const replyAction = actions.commentSetReply({
            reply: {
                author: {
                    id: _id,
                    nickname,
                    avatarUrl,
                    url,
                    bio,
                    articelId,
                }
            },
        });
        dispatch(replyAction);
        const isReplyAction = actions.commentSetIsReply();
        dispatch(isReplyAction);
    }

    return (
        <>
            <List
                className="comment-list"
                dataSource={comments}
                header={`${comments.length} ${comments.length > 1 ? t('replies') : t('reply')}`}
                itemLayout="horizontal"
                renderItem={({ author, avatar, content, datetime, replier }) => {
                    return (<Comment
                        author={author[0].nickname}
                        actions={[
                            <span
                                onClick={() => { replyFn(author[0]) }}
                                key="comment-list-reply-to-0"
                            >
                                <RollbackOutlined /> {t('Reply to')}
                            </span>
                        ]}
                        avatar={
                            <Popover style={{ maxWidth: '80px' }} placement="top" content={
                                <div style={{ textAlign: 'center' }}>
                                    <div>
                                        {
                                            author[0].avatarUrl && author[0].avatarUrl !== '' ?
                                                <Avatar src={`/user/${author[0].avatarUrl}`} shape="square" size={64} />
                                                :
                                                <Avatar shape="square" size={64}>{avatar}</Avatar>
                                        }
                                    </div>
                                    <div style={{ fontWeight: 700 }}>{author[0].nickname}</div>
                                    <div style={{ color: 'rgba(0,0,0,0.3)', fontSize: '.8em' }}>{author[0].bio}</div>
                                    <div>{
                                        author[0].url ?
                                            <>
                                                <LinkOutlined /> <a target="_blank" rel="noopener noreferrer" href={`http://${author[0].url}`}>{author[0].url}</a>
                                            </>
                                            : ''
                                    }</div>
                                </div>
                            }>
                                {
                                    author[0].avatarUrl && author[0].avatarUrl !== '' ?
                                        <Avatar src={`/user/${author[0].avatarUrl}`} />
                                        :
                                        <Avatar >{avatar}</Avatar>
                                }
                            </Popover>
                        }
                        content={
                            <p className="comment-content">
                                {
                                    replier && replier.length > 0 && <Tag>@{replier[0].nickname}</Tag>
                                }
                                {content}
                            </p>
                        }
                        datetime={datetime}
                    />);
                }}
            />
        </>
    )
}

export default CommentList;