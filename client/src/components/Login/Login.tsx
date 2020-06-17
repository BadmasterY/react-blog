import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Button, message, Modal } from 'antd';
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

function Login() {
    const localItem = localStorage.getItem(localName);

    const { isLogin } = useSelector((state: reduxState) => state.user);
    const [autoLogin, setAutoLogin] = useState(false);
    const [isLogging, setLoging] = useState(false);
    const [showRegister, setRegister] = useState(false);
    const [form] = Form.useForm();
    const history = useHistory();
    const dispatch = useDispatch();

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
            history.push('/');
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
                message.success('Login success!');
                // todo: 加密重新保存, 造成泄漏
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
            message.error('Please input username and password!');
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
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input
                        autoFocus={true}
                        className="login-input"
                        onPressEnter={login}
                        placeholder="Input username..."
                        autoComplete='off'
                        allowClear={true}
                    />
                </Form.Item>
                <Form.Item
                    key="password"
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password
                        className="login-input"
                        onPressEnter={login}
                        placeholder="Input password..."
                        autoComplete='off'
                    />
                </Form.Item>
                <Button loading={isLogging} block className="login-btn" onClick={login}>{
                    isLogging ?
                        'Logging...'
                        :
                        'Login'
                }</Button>
                <div className="login-register-box">
                    <Button
                        className="login-register"
                        type="link"
                        onClick={showFn}
                    >register now!</Button>
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
