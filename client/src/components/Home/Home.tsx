import React, { useState, useEffect } from 'react';
import { Skeleton, List, Tooltip, Typography, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axois from 'axios';

import { ArticleListRes, ArticleItem } from '../../interfaces/response';
import { content } from '../../config/default.json';

import './home.css';

const { Paragraph, Title } = Typography;
const { pageSize, pageSizeOptions } = content;
const articales: ArticleItem[] = [];

function Home() {
    const [loading, setLoading] = useState(true);
    const [isInitial, setInitial] = useState(true);
    const [dataSource, setData] = useState(articales);
    const [maxLength, setMaxLength] = useState(0);
    const [initialPage, setPage] = useState(1);

    async function initialData() {
        setInitial(false);

        await axois.post('/article/getArticleList', {
            page: initialPage,
            pageSize,
            query: {}
        }).then(result => {
            const data: ArticleListRes = result.data;
            const { error, msg, content } = data;

            setLoading(false);

            if (error === 1) {
                message.error(msg);
                return;
            }

            if (content) {
                const { maxLength, articles } = content;
                setMaxLength(maxLength);
                if (articles) setData(articles);
            }
        }).catch(err => {
            setLoading(false);
            message.error('Please check network!')
            console.log(err);
        });
    }

    function changePage(page: number, pageSize?: number) {
        setPage(page);
    }

    useEffect(() => {
        if (isInitial) initialData();
    });

    return (
        <div className="home">
            <Skeleton loading={loading} active>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        position: 'bottom', // 分页位置
                        onChange: changePage,
                        current: initialPage,
                        pageSize, // 每页显示数量
                        pageSizeOptions,
                        total: maxLength, // 总数
                    }}
                    locale={{
                        emptyText: 'Empty...',
                    }}
                    dataSource={dataSource}
                    renderItem={item => (
                        <List.Item
                            key={item._id}
                        >
                            <List.Item.Meta
                                // avatar={<Avatar size="large">{item.author.nickname}</Avatar>}
                                title={<Link
                                    className="home-title"
                                    to={`/article/${item.title}?article_id=${item._id}`}
                                >
                                    {item.title}
                                </Link>
                                }
                                description={<p className="home-description">
                                    <Tooltip placement="right" title={<div className="description-tooltip">
                                        <p>{item.author.nickname}</p>
                                        <p className="tooltip-bio">{item.author.bio}</p>
                                    </div>}>
                                        <span><UserOutlined /> {item.author.nickname}</span>
                                    </Tooltip>
                                </p>}
                            />
                            <Paragraph
                                ellipsis={{
                                    rows: 5,
                                    expandable: true,
                                    symbol: <></>,
                                }}
                            >
                                {
                                    item.content.blocks.map((item, index) => {
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
                            </Paragraph>
                            <Link
                                className="home-readmore"
                                to={`/article/${item.title}?article_id=${item._id}`}
                            >Read More...</Link>
                        </List.Item>
                    )}
                />
            </Skeleton>
        </div>
    );
}

export default Home;
