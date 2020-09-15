import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Upload, Form, Input, Button, message } from 'antd';
import { EditOutlined } from '@ant-design/icons'
import { RcFile } from 'antd/lib/upload';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { Action, Payload } from '../../interfaces/user';
import { UserRes } from '../../interfaces/response';
import { reduxState } from '../../interfaces/state';
import { UserUploadAvatarRes } from '../../interfaces/response';
import { actions } from '../../redux/ducks/user';
import { user as UserConfig } from '../../config/default.json';
import { RcCustomRequestOptions } from 'antd/lib/upload/interface';

import './setting.css';

const { maxImageSize } = UserConfig;

function Setting() {
    const { isLogin, id, bio, url, nickname, username, avatarUrl, position } = useSelector((state: reduxState) => state.user);
    const [form] = Form.useForm();
    const [isUpdate, setUpdate] = useState(false);
    const dispacth = useDispatch();
    const { t } = useTranslation();

    const initFormValue = {
        nickname,
        bio,
        url,
    }

    async function updateProfile() {
        setUpdate(true);
        await form.validateFields().then(async result => {
            const pyload: Payload = result;
            await axios.post('/user/update', { id, ...result }).then(result => {
                const data: UserRes = result.data;
                setUpdate(false);

                if (data.error === 1) {
                    message.error(data.msg);
                    return;
                }
                const action: Action = actions.userUpdate(pyload);
                dispacth(action);
                message.success(t('Updated!'));
            }).catch(err => {
                setUpdate(false);
                message.error(t('Update error!'));
            });

        }).catch(err => {
            setUpdate(false);
            message.error(t('Please check input!'));
            console.log(err);
        });
    }

    function beforeUpload(file: RcFile) {
        const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png';

        if (!isJPGorPNG) {
            message.error(t('You can only upload JPG/PNG file!'));
            return false;
        }

        const isLt2M = file.size / 1024 / 1024 < maxImageSize;

        if (!isLt2M) {
            message.error(`${t('Image must smaller than ')}${maxImageSize}MB!`);
            return false;
        }

        return true;
    }

    async function uploadFn(options: RcCustomRequestOptions) {
        const { file, filename } = options;
        const hide = message.loading(t('Avatar uploading...'), 0);

        const formData = new FormData();
        formData.append('userId', id);
        formData.append('file', file);
        formData.append('filename', filename);

        await axios.post('/user/uploadAvatar', formData).then(result => {
            const data: UserUploadAvatarRes = result.data;
            const { error, msg, content } = data;

            if (error === 1) {
                message.error(msg);
                return;
            }

            if (content) {
                const action: Action = actions.userUpdate(content);
                dispacth(action);
                hide();
                message.success(t('Upload success!'));
            }
        }).catch(err => {
            message.error(t('Please check network!'));
            console.log(err);
        })
    }

    function onUploadChange() { }

    return (
        <div className="setting-box" key={id}>
            {
                isLogin ?
                    <Form
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 9 }}
                        initialValues={initFormValue}
                        form={form}
                    >
                        <Form.Item
                            label={t("Avatar")}
                        >
                            <Upload
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                customRequest={uploadFn}
                                onChange={onUploadChange}
                            >
                                {
                                    avatarUrl && avatarUrl !== '' ?
                                        <Avatar src={`/user/${avatarUrl}`} shape="square" size={64} />
                                        :
                                        <Avatar shape="square" size={64}>
                                            {nickname}
                                        </Avatar>
                                }
                                <div className="avatar-text">
                                    <EditOutlined />
                                </div>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            label={t('Username')}
                        >
                            <>{username}</>
                        </Form.Item>
                        <Form.Item
                            label={t('Name')}
                            name="nickname"
                            help={t(`Input your name, like's your nickname. Does not change the 'username' used to login.`)}
                        >
                            <Input
                                placeholder={t('Input your name...')}
                            />
                        </Form.Item>
                        <Form.Item
                            label={t('Bio')}
                            name="bio"
                            help={t('Input something you like. This will be shown on your home page.')}
                        >
                            <Input.TextArea
                                placeholder={t('Input something you like...')}
                            />
                        </Form.Item>
                        <Form.Item
                            label={t('URL')}
                            name="url"
                        >
                            <Input
                                placeholder={t('Input your homepage url...')}
                            />
                        </Form.Item>
                        {
                            position === '管理员' ?
                                <Form.Item
                                    label={t('System')}
                                    help={t('Manage users and articles.')}
                                >
                                    <Link to={'/management/home'}>{t('Background management system')}</Link>
                                </Form.Item>
                                :
                                ''
                        }
                        <Form.Item
                            label=" "
                            colon={false}
                        >
                            <Button loading={isUpdate} type="primary" onClick={updateProfile}>{t('Update')}</Button>
                        </Form.Item>
                    </Form>
                    :
                    <div>
                        {t(`You haven't signed in yet, `)}<Link to={'/login'}>{t('to login')}</Link>.
                    </div>
            }
        </div>
    );
}

export default Setting;
