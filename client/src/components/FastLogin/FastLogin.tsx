import React, { useState } from 'react';
import { Modal, Form, Button, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { localName } from '../../config/default.json';

import { md5 } from '../../utils/md5';
import { UserRes } from '../../interfaces/response';
import { Action, Payload } from '../../interfaces/user';
import { actions } from '../../redux/ducks/user';

import './fastlogin.css';

interface Props {
    isShow: boolean;
    closeFn: () => void;
    callback?: () => void;
}

const passRegexp = /^(?=.*[A-Za-z])\w{6,18}$/;

function FastLogin(props: Props) {
    const { isShow, closeFn, callback } = props;

    const [isLogging, setLogging] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    
    function onCancel() {
        closeFn();
    }

    async function login() {
        setLogging(true);
        await form.validateFields().then(async result => {
            // axios
            const { username, password } = result;
            const md5Password = md5(password);
            await axios.post('/user/login', { username, password: md5Password }).then(res => {
                setLogging(false);
                const data: UserRes = res.data;
                if (data.error === 1) {
                    message.error(data.msg);
                    return;
                }
                message.success(t('Login success!'));
                localStorage.setItem(localName, JSON.stringify({
                    username,
                    password,
                    isLogin: true,
                }));
                if (typeof data.content === 'object') {
                    const payload: Payload = Object.assign({}, data.content, {isLogin: true});
                    const action: Action = actions.userLogin(payload);
                    // user login
                    dispatch(action);
                }
                onCancel();
                if(callback) callback();
            }).catch(err => {
                setLogging(false);
                message.error(err);
            });
        }).catch(err => {
            setLogging(false);
            message.error(t('Please input username and password!'));
            console.log(err);
        });
    }

    return (
        <Modal
            className="fastlogin"
            visible={isShow}
            closable={false}
            footer={null}
            onCancel={onCancel}
        >
            <Form
                form={form}
                hideRequiredMark={true}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
            >
                <Form.Item
                    label={t("Username")}
                    name="username"
                    rules={[{ required: true, message: t('Please input username!') }]}
                >
                    <Input
                        autoFocus={true}
                        className="login-input"
                        onPressEnter={login}
                        placeholder={t("Input username...")}
                        allowClear={true}
                        autoComplete="off"
                    />
                </Form.Item>
                <Form.Item
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
            </Form>
        </Modal>
    )
}

export default FastLogin;