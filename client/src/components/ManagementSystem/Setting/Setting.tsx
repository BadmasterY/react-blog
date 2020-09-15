import React, { useState, useEffect } from 'react';
import { Form, Switch, Button, Spin, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { reduxState } from '../../../interfaces/state';
import { SettingResult, Response } from '../../../interfaces/response';
import { Payload as SettingPayload } from '../../../interfaces/setting';
import { actions } from '../../../redux/ducks/setting';

import './setting.css';

function Setting() {
    const { id } = useSelector((item: reduxState) => item.user);
    const { id: settingId, isUseRegister } = useSelector((item: reduxState) => item.setting);
    const [firstLoading, setFirstLoading] = useState(true);
    const [isLoading, setLoading] = useState(true);
    const [isUpdatting, setUpdate] = useState(false);
    const [isSelected, setSelected] = useState(isUseRegister);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const initFormValue = {
        isUseRegister,
    };

    async function getSystemSetting() {
        await axios.post('/system/getSetting', { id }).then(result => {
            const data: SettingResult = result.data;
            const { error, msg, content } = data;

            setLoading(false);

            if (error === 1) {
                message.error(msg);
                return;
            }

            if (content) {
                const action = actions.settingGet(content);
                dispatch(action);
                setSelected(content.isUseRegister);
            }
        }).catch(err => {
            message.error(t('Please check network!'));
            console.log(err);
        });
    }

    async function updateFn() {
        setUpdate(true);
        const payload = (form.getFieldsValue() as SettingPayload);

        await axios.post('/system/updateSetting', { 
            ...payload, 
            id: settingId,
            updateUserId: id 
        }).then(result => {
            const data: Response = result.data;
            const { error, msg } = data;

            setUpdate(false);

            if (error === 1) {
                message.error(msg);
                return;
            }

            message.success(t('Updated!'));

            const action = actions.settingUpdate(payload);
            dispatch(action);
        }).catch(err => {
            message.error(t('Please check network!'));
            console.log(err);
            setUpdate(false);
        });
    }

    function selecteChange(checked: boolean) {
        setSelected(checked);
    }

    useEffect(() => {
        function notFirst() {
            setFirstLoading(false);
        }

        if (firstLoading) {
            notFirst();
            getSystemSetting();
        }
    });

    return (
        <div className="system-setting">
            <Spin tip={t("Loadding...")} spinning={isLoading}>
                <Form
                    form={form}
                    initialValues={initFormValue}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                >
                    <h3>{t('Login and register')}</h3>
                    <Form.Item
                        label={t("Use register")}
                        name="isUseRegister"
                        help={t("If you close, you will not be able to register on the web page.")}
                    >
                        <Switch checked={isSelected} onClick={selecteChange} />
                    </Form.Item>
                    <Form.Item
                        label=" "
                        colon={false}
                    >
                        <Button type="primary" onClick={updateFn} loading={isUpdatting} >{t('Update')}</Button>
                    </Form.Item>
                </Form>
            </Spin>
        </div>
    )
}

export default Setting;