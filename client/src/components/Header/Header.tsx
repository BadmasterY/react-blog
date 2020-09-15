import React from 'react';
import { Layout, Menu, message } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { blogName, localName, header } from '../../config/default.json';
import { reduxState } from '../../interfaces/state';
import { actions } from '../../redux/ducks/user';
import { Data as LoginData } from '../../interfaces/localstorage';

import './header.css';

const { Header } = Layout;

function MyHeader() {
    const { isLogin, nickname } = useSelector((state: reduxState) => state.user);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    function logout() {
        const action = actions.userLogout();
        dispatch(action);

        message.success('Logout success!');

        const localItem = localStorage.getItem(localName);
        if (localItem !== null) {
            const loginData: LoginData = JSON.parse(localItem);
            const { username, password } = loginData;

            localStorage.setItem(localName, JSON.stringify({
                username,
                password,
                isLogin: false,
            }));
        }
    }

    function changeLanguage() {
        let lan = 'en';
        if (i18n.language === 'en') lan = 'zh-CN';
        i18n.changeLanguage(lan);
    }

    return (
        <Header className="header">
            <h1>
                <span className="header-logo"></span>
                <Link className="header-link" to={"/"}>
                    {blogName}
                </Link>
            </h1>
            <Menu className="header-menu" selectable={false} mode="horizontal">
                {
                    header.map(item => (
                        <Menu.Item key={item.key}>
                            <Link className="header-link" to={item.uri}>
                                {t(item.name)}
                            </Link>
                        </Menu.Item>
                    ))
                }
                {
                    isLogin ?
                        <Menu.SubMenu
                            title={
                                <span>{nickname}</span>
                            }
                            key="user-menu"
                        >
                            <Menu.Item key="user">
                                <Link className="header-link" to={'/user'}>{nickname}</Link>
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item key="setting">
                                <Link className="header-link" to={'/setting'}>
                                    {t('Setting')}
                                </Link>
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item key="logout" onClick={logout}>
                                {t('Logout')}
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item key="i18n">
                                <a className="i18n-btn" onClick={changeLanguage}>
                                    {
                                        i18n.language === 'zh-CN' ? 'En' : '简'
                                    }
                                </a>
                            </Menu.Item>
                        </Menu.SubMenu>
                        :
                        <Menu.Item key="login">
                            <Link to="/login">
                                {t('LOGIN')}
                            </Link>
                        </Menu.Item>
                }
            </Menu>
        </Header>
    );
}

export default MyHeader;
