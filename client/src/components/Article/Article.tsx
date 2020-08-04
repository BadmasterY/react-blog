import React, { useState, useEffect } from 'react';
import { Divider, Spin, Tooltip, message, Typography, Row, Col, Button } from 'antd';
import { RollbackOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import Comment from '../Comment/Comment';
import { ArticleRes } from '../../interfaces/response';
import { actions as articleActions } from '../../redux/ducks/article';
import { actions as commentActions } from '../../redux/ducks/comment';
import { reduxState } from '../../interfaces/state';

import './article.css';

const { Title } = Typography;

function Article() {
    const [isLoading, setLoading] = useState(true);
    const { title, content, author, createTime, updatedAt } = useSelector((item: reduxState) => item.article);
    const history = useHistory();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    async function getArticle(search: string) {
        const searchString = search.split('?')[1];
        const id = searchString.split('article_id=')[1];
        await axios.post('/article/getArticle', {
            id,
        }).then(result => {
            const data: ArticleRes = result.data;
            const { error, msg, content } = data;

            setLoading(false);

            if (error === 1) {
                message.error(msg);
                return;
            }

            if (content) {
                const { comments } = content;
                const arctileAction = articleActions.articaleGet(content);
                dispatch(arctileAction);
                const commentAction = commentActions.commentGet({
                    list: comments,
                });
                dispatch(commentAction);
            }
        }).catch(err => {
            message.error('Please check network!');
            console.log(err);
        });
    }

    function replyFn() {
        const { pathname, search } = history.location;
        const id = search.split('=')[1];
        const replyAction = commentActions.commentSetReply({
            reply: {
                articel: {
                    id,
                    title,
                    url: pathname + search,
                }
            }
        });
        dispatch(replyAction);
        const isReplyAction = commentActions.commentSetIsReply();
        dispatch(isReplyAction);
    }

    useEffect(() => {
        if (isLoading) {
            const { search } = history.location;
            getArticle(search);
        }
    });

    return (
        <Spin tip="Loading..." spinning={isLoading}>
            <div className="article">
                <h2 className="article-title">{title}</h2>
                <p className="article-author">
                    <Tooltip placement="right" title={<div className="article-tooltip">
                        <p>{author.nickname}</p>
                        <p className="tooltip-bio">{author.bio}</p>
                    </div>}>
                        <span>{author.nickname}</span>
                    </Tooltip>
                </p>
                <Typography>
                    {
                        content.blocks.map((item, index) => {
                            switch (item.type) {
                                case 'paragraph':
                                    return <p key={index} dangerouslySetInnerHTML={{ __html: item.data.text }} />;
                                case 'header':
                                    return <Title key={index} level={item.data.level}>{item.data.text}</Title>;
                                case 'image':
                                    return <img
                                        key={index}
                                        src={item.data.file.url}
                                        className={
                                            `detail-img ${item.data.withBackground ? 'detail-img-center' : ''} ${item.data.withBorder ? 'detail-img-border' : ''} ${item.data.stretched ? 'detail-img-stretched' : ''}`
                                        }
                                    />;
                                case 'code':
                                    return <pre key={index} className="detail-code">{item.data.code}</pre>
                                case 'list':
                                    const list = item.data.items.map((item: string, index: number) => <li key={index}>{item}</li>);
                                    const data = item.data.style === 'ordered' ?
                                        <ol key={index}>{list}</ol> : <ul key={index}>{list}</ul>;
                                    return data;
                                case 'table':
                                    return (
                                        <table key={index} className="detail-table">
                                            <tbody>
                                                {
                                                    item.data.content.map((item: string[], index: number) => (
                                                        <tr key={index}>
                                                            {
                                                                item.map((item, index) => (
                                                                    <td key={index}>
                                                                        <div>
                                                                            {item}
                                                                        </div>
                                                                    </td>
                                                                ))
                                                            }
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    );
                                default:
                                    return <></>
                            }
                        })
                    }
                </Typography>
                <p className="article-time">{t('CreateTime')}: {createTime ? new Date(createTime).toLocaleString() : ''}</p>
                <p className="article-time">{t('UpdatedAt')}: {updatedAt ? new Date(updatedAt).toLocaleString() : ''}</p>
                <Divider />
                <Comment />
                <Divider />
                <Row gutter={[8, 8]}>
                    <Col xs={24} md={6}>
                        <Button block><ShareAltOutlined /> {t('Share')}</Button>
                    </Col>
                    <Col xs={24} md={6}>
                        <Button type="primary" block onClick={replyFn}><RollbackOutlined /> {t('Reply to')}</Button>
                    </Col>
                </Row>
            </div>
        </Spin>
    );
}

export default Article;