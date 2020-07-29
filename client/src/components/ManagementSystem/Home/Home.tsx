import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Statistic, Button, Divider, Skeleton, Tooltip, Empty, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { actions } from '../../../redux/ducks/system';

import { reduxState } from '../../../interfaces/state';
import { ArticleLength, CommentLength, SiteVersion } from '../../../interfaces/response';

import './home.css';

function Home() {
    const { VERSION, articles, comments } = useSelector((item: reduxState) => item.system);
    const [loadingArticles, setArticleLoading] = useState(true);
    const [loadingComments, setCommentLoading] = useState(true);
    const [loadingMore, setMoreLoading] = useState(true);
    const [loadingEvents, setEventsLoading] = useState(true);
    const [loadingNews, setNewsLoading] = useState(true);
    const [newVersion, setNewVersion] = useState(VERSION);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        getArtiles();
        getComments();
        getSiteVersion();
    }, []);

    async function getArtiles() {
        await axios.post('/article/getArticlesLength').then(result => {
            const data: ArticleLength = result.data;
            const { error, msg, content } = data;

            if (error === 1) {
                message.error(msg);
                return;
            }

            setArticleLoading(false);
            if (content) {
                const action = actions.systemSetArticles({ articles: content.length });
                dispatch(action);
            }
        }).catch(err => {
            console.log(err);
            message.error(t('Please check network!'));
        });
    }

    async function getComments() {
        await axios.post('/comment/getCommentsLength').then(result => {
            const data: CommentLength = result.data;
            const { error, msg, content } = data;

            if (error === 1) {
                message.error(msg);
                return;
            }

            setCommentLoading(false);
            if (content) {
                const action = actions.systemSetComments({ comments: content.length });
                dispatch(action);
            }
        }).catch(err => {
            console.log(err);
            message.error(t('Please check network!'));
        });
    }

    async function getSiteVersion() {
        await axios.post('/system/getClientVersion').then(result => {
            const data: SiteVersion = result.data;
            const { error, msg, content } = data;

            if (error === 1) {
                message.error(msg);
                return;
            }

            if (content) {
                setNewVersion(content.version);
            }
        }).catch(err => {
            console.log(err);
            message.error(t('Please check network!'));
        });
    }

    return (
        <div className="management-home">
            <Row>
                <Col span={24}>
                    <h2>{t('Welcome!')}</h2>
                    <p>{t('Thanks for using, created by')} <a target="_blank" rel="noopener noreferrer" href="https://github.com/BadmasterY/react-blog">blog</a>.</p>
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={12} md={8}>
                    <h3>{t('Start')}:</h3>
                    <Tooltip title={t("coming soon...")}>
                        <Button disabled={true} type='primary'>{t('Custom theme')}</Button>
                    </Tooltip>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <h3>{t('More')}:</h3>
                    <Skeleton title={false} loading={loadingMore} active paragraph={{ rows: 3 }}>

                    </Skeleton>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <h3>{t('Others')}:</h3>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />
                </Col>
            </Row>
            <Divider />
            <Row gutter={8}>
                <Col xs={24} sm={12}>
                    <h4>{t('Overview')}:</h4>
                    <Link to="/management/articles">
                        <Card size='small' hoverable style={{ marginBottom: '8px' }}>
                            <Skeleton loading={loadingArticles} active paragraph={{ rows: 1 }}>
                                <Statistic title={t("Articles")} value={articles} />
                            </Skeleton>
                        </Card>
                    </Link>
                    <Link to="/management/comments">
                        <Card size='small' hoverable style={{ marginBottom: '8px' }}>
                            <Skeleton loading={loadingComments} active paragraph={{ rows: 1 }}>
                                <Statistic title={t("Comments")} value={comments} />
                            </Skeleton>
                        </Card>
                    </Link>
                    <p className="system-version">{t('version')}: {VERSION}</p>
                    <div className="system-update-btn">
                        {
                            VERSION === newVersion ?
                                ''
                                :
                                <Button>{t('Upgrade')}: {newVersion}</Button>
                        }
                    </div>
                </Col>
                <Col xs={24} sm={12}>
                    <h4>{t('Events')}:</h4>
                    <Skeleton title={false} loading={loadingEvents} active paragraph={{ rows: 5 }}>

                    </Skeleton>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <h4>{t('News')}:</h4>
                    <Skeleton title={false} loading={loadingNews} active paragraph={{ rows: 10 }}>

                    </Skeleton>
                </Col>
            </Row>
        </div>
    );
}

export default Home;