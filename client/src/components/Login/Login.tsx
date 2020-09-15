import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Button, message, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import Register from '../Register/Register';
import { reduxState } from '../../interfaces/state';
import { Data as LoginData } from '../../interfaces/localstorage';
import { Action, Payload } from '../../interfaces/user';
import { UserRes } from '../../interfaces/response';
import { blogName, localName, login } from '../../config/default.json';
import { actions } from '../../redux/ducks/user';
import { md5 } from '../../utils/md5';

import './login.css';

const { useVideo, useBackground, noBackground, randomBackgroundSize } = login;
const num = Math.floor(Math.random() * randomBackgroundSize);
let initFormValue: { username?: string, password?: string } = {};
let isBack = false;

const passRegexp = /^(?=.*[A-Za-z])\w{6,18}$/;

function Login() {
    const localItem = localStorage.getItem(localName);

    const { isLogin } = useSelector((state: reduxState) => state.user);
    const [autoLogin, setAutoLogin] = useState(false);
    const [isLogging, setLoging] = useState(false);
    const [showRegister, setRegister] = useState(false);
    const [form] = Form.useForm();
    const history = useHistory();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    if (localItem !== null) {
        const loginData: LoginData = JSON.parse(localItem);
        const { username, password } = loginData;

        initFormValue = { username, password };
    }

    useEffect(() => {
        function isAutoLogin() {
            setAutoLogin(true);
        }

        if (isLogin && !isBack) {
            history.goBack();
            isBack = true;
        } else {
            if (localItem !== null) {
                const loginData: LoginData = JSON.parse(localItem);
                const { isLogin: localIsLogin } = loginData;
                if (localIsLogin && !autoLogin) {
                    isAutoLogin();
                    login();
                }
            }
        }
    });

    // 登录逻辑
    async function login() {
        setLoging(true);
        await form.validateFields().then(async result => {
            // axios
            const { username, password } = result;
            const md5Password = md5(password);
            await axios.post('/user/login', { username, password: md5Password }).then(res => {
                const data: UserRes = res.data;
                if (data.error === 1) {
                    message.error(data.msg);
                    setLoging(false);
                    return;
                }

                setLoging(false);
                message.success(t('Login success!'));
                localStorage.setItem(localName, JSON.stringify({
                    username,
                    password,
                    isLogin: true,
                }));
                if (typeof data.content === 'object') {
                    const payload: Payload = Object.assign({}, data.content, { isLogin: true });
                    const action: Action = actions.userLogin(payload);
                    // 触发 user login
                    dispatch(action);
                }
                form.resetFields();
            }).catch(err => {
                setLoging(false);
                message.error(err);
            });
        }).catch(err => {
            setLoging(false);
            message.error(t('Please input username and password!'));
            console.log(err);
        });
    }

    function showFn() {
        setRegister(true);
    }

    function closeFn() {
        setRegister(false);
    }

    return (
        <>
            {
                useVideo ?
                    <video id="login-video" src={''} muted={true} loop={true} autoPlay></video>
                    :
                    ''
            }
            {
                useBackground ?
                    <img id="login-image" alt={`bg_${num}.jpg`} src={require(`../../assets/bg/bg_${num}.jpg`)} />
                    :
                    ''
            }
            {
                noBackground ?
                    <div id="login-box"></div>
                    :
                    ''
            }
            <Form
                id="login"
                hideRequiredMark={true}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
                initialValues={initFormValue}
                form={form}
            >
                <h2>
                    <Link className="login-blogname" to="/">
                        {blogName}
                    </Link>
                </h2>
                <Form.Item
                    key="username"
                    label={t("Username")}
                    name="username"
                    rules={[{ required: true, message: t('Please input username!') }]}
                >
                    <Input
                        autoFocus={true}
                        className="login-input"
                        onPressEnter={login}
                        placeholder={t("Input username...")}
                        autoComplete='off'
                        allowClear={true}
                    />
                </Form.Item>
                <Form.Item
                    key="password"
                    label={t("Password")}
                    name="password"
                    rules={[
                        { required: true, message: t('Please input password!') },
                        {
                            type: 'string',
                            validator(rule, value: string) {
                                if(passRegexp.test(value)) {
                                    return Promise.resolve();
                                }else {
                                    return Promise.reject(t('The password is 6 to 18 digits long and contains only numbers, letters and underscores!'))
                                }
                            }
                        }
                    ]}
                >
                    <Input.Password
                        className="login-input"
                        onPressEnter={login}
                        placeholder={t("Input password...")}
                        autoComplete='off'
                    />
                </Form.Item>
                <Button loading={isLogging} block className="login-btn" onClick={login}>{
                    isLogging ?
                        t('Logging...')
                        :
                        t('Login')
                }</Button>
                <div className="login-register-box">
                    <Button
                        className="login-register"
                        type="link"
                        onClick={showFn}
                    >{t('register now!')}</Button>
                </div>
            </Form>
            <Modal
                visible={showRegister}
                onCancel={closeFn}
                footer={null}
                closable={false}
                destroyOnClose={true}
            >
                <Register callback={closeFn} />
            </Modal>
        </>
    );
}

export default Login;
