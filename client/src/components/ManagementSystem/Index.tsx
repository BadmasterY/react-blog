import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import { useHistory, Route, Switch } from 'react-router-dom';

import Header from './Header/Header';
import Sider from './Sider/Sider';
import Articles from './Articles/Articles';
import Comments from './Comments/Comments';
import Users from './Users/Users';
import Footer from './Footer/Footer';
import Groups from './Groups/Groups';
import Setting from './Setting/Setting';
import Animation from '../Animation/Animation';

import { reduxState } from '../../interfaces/state';
import { system } from '../../config/default.json';

import './system.css';

const { Content } = Layout;
const { initialSelectItem } = system;

function System() {
    const [selectItem, setSelect] = useState(initialSelectItem);
    const { isLogin, position } = useSelector((item: reduxState) => item.user);
    const history = useHistory();

    useEffect(() => {
        if (!isLogin) {
            history.push('/login');
        } else if (position !== '管理员') {
            history.push('/');
        }else {
            if(history.location.pathname !== `/management/${selectItem}`) {
                const pathArr = history.location.pathname.split('/');
                const path = pathArr[pathArr.length - 1];
                setSelect(path);
            }
        }
    }, [isLogin, position, history, selectItem]);

    function changeSelect(key: string) {
        setSelect(key);
    }

    return (
        <Switch>
            {
                isLogin && position === '管理员' ?
                    <Layout className="system">
                        <Header />
                        <Layout>
                            <Sider initialSelectItem={selectItem} callback={changeSelect} />
                            <Content className="system-content">
                                <Route exact path="/management/articles" children={props => Animation(<Articles />, props, '/management/articles')} />
                                <Route path="/management/comments" children={props => Animation(<Comments />, props, '/management/comments')} />
                                <Route path="/management/users" children={props => Animation(<Users />, props, '/management/users')} />
                                <Route path="/management/groups" children={props => Animation(<Groups />, props, '/management/groups')} />
                                <Route path="/management/setting" children={props => Animation(<Setting />, props, '/management/setting')} />
                                <Footer />
                            </Content>
                        </Layout>
                    </Layout>
                    : ''
            }
        </Switch>
    );
}

export default System;
