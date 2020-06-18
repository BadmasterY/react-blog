import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Statistic, Button, Divider, Skeleton, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { actions } from '../../../redux/ducks/system';

import { reduxState } from '../../../interfaces/state';
import { ArticleLength, CommentLength, SiteVersion } from '../../../interfaces/response';

import './home.css';

function Home() {
    const { VERSION, articles, comments } = useSelector((item: reduxState) => item.system);
    const [loadingArticles, setArticleLoading] = useState(true);
    const [loadingComments, setCommentLoading] = useState(true);
    const [newVersion, setNewVersion] = useState(VERSION);
    const dispatch = useDispatch();

    useEffect(() => {
        getArtiles();
        getComments();
        getSiteVersion();
    }, []);

    async function getArtiles() {
        await axios.post('/article/getArticlesLength').then(result => {
            const data: ArticleLength = result.data;
            const { error, msg, content } = data;

            if( error === 1 ) {
                message.error(msg);
                return;
            }

            setArticleLoading(false);
            if(content) {
                const action = actions.systemSetArticles({ articles: content.length });
                dispatch(action);
            }
        }).catch(err => {
            console.log(err);
            message.error('Please check network!');
        });
    }

    async function getComments() {
        await axios.post('/comment/getCommentsLength').then(result => {
            const data: CommentLength = result.data;
            const { error, msg, content } = data;

            if( error === 1 ) {
                message.error(msg);
                return;
            }

            setCommentLoading(false);
            if(content) {
                const action = actions.systemSetComments({ comments: content.length });
                dispatch(action);
            }
        }).catch(err => {
            console.log(err);
            message.error('Please check network!');
        });
    }

    async function getSiteVersion() {
        await axios.post('/system/getClientVersion').then(result => {
            const data: SiteVersion = result.data;
            const { error, msg, content } = data;

            if( error === 1 ) {
                message.error(msg);
                return;
            }

            if(content) {
                setNewVersion(content.version);
            }
        }).catch(err => {
            console.log(err);
            message.error('Please check network!');
        });
    }

    return (
        <div className="management-home">
            <Row>
                <Col span={24}>
                    <div>
                        <h2>Start!</h2>
                    </div>
                </Col>
            </Row>
            <Divider />
            <Row gutter={8}>
                <Col xs={24} sm={12}>
                    <div>
                        <h4>Overview:</h4>
                        <Link to="/management/articles">
                            <Card size='small' hoverable style={{ marginBottom: '8px' }}>
                                <Skeleton loading={loadingArticles} active paragraph={{ rows: 1 }}>
                                    <Statistic title="Articles" value={articles} />
                                </Skeleton>
                            </Card>
                        </Link>
                        <Link to="/management/comments">
                            <Card size='small' hoverable style={{ marginBottom: '8px' }}>
                                <Skeleton loading={loadingComments} active paragraph={{ rows: 1 }}>
                                    <Statistic title="Comments" value={comments} />
                                </Skeleton>
                            </Card>
                        </Link>
                        <p className="system-version">version: {VERSION}</p>
                        <div className="system-update-btn">
                            {
                                VERSION === newVersion ?
                                    ''
                                    :
                                    <Button>Upgrade: {newVersion}</Button>
                            }
                        </div>
                    </div>
                </Col>
                <Col xs={24} sm={12}>
                    <div>
                        <h4>Events:</h4>
                    </div>
                </Col>
            </Row>
            {/* </Skeleton> */}
        </div>
    );
}

export default Home;