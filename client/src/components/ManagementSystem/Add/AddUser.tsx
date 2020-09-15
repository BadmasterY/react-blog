import React, { useState, useEffect } from 'react';
import { Form, Button, Input, Modal, Spin, Select, message } from 'antd';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { AddUserProp } from '../../../interfaces/adds';
import { GroupList, GroupListContent } from '../../../interfaces/response';

const { Option } = Select;

function AddUser(props: AddUserProp) {
    const { modalVisible, onClick, onCancel } = props;
    const [isLoading, setLoading] = useState(true);
    const [isAdding, setAdding] = useState(false);
    const [groupItem, setGroupItem] = useState<GroupListContent[]>([]);

    const [form] = Form.useForm();
    const { t } = useTranslation();

    async function loadGroups() {
        await axios.post('/group/getGroupList').then(result => {
            const data: GroupList = result.data;
            const { error, msg, content } = data;

            setLoading(false);

            if (error === 1) {
                message.error(msg);
                return;
            }

            if (content) {
                setGroupItem(content.grouplist);
            }
        }).catch(err => {
            console.error(err);
            message.error(t('Please check network!'));
        });
    }

    function addStart() {
        setAdding(true);
    }

    function addEnd() {
        setAdding(false);
        form.resetFields();
    }

    function onAdd() {
        addStart();
        onClick(form, addEnd, () => { setAdding(false); });
    }

    useEffect(() => {
        if (!isLoading || !modalVisible) return;

        loadGroups();
    });

    return (
        <Modal
            visible={modalVisible}
            title={<span>{t('Add')}</span>}
            footer={null}
            onCancel={() => {
                onCancel();
                form.resetFields();
                setLoading(true);
            }}
            children={
                <Spin tip={t("Loading...")} spinning={isLoading}>
                    <Form
                        id="add-user-modal"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 19 }}
                        form={form}
                    >
                        <Form.Item
                            key="name"
                            label={t("UserName")}
                            name="name"
                            rules={[{ required: true, message: t('Please input username!') }]}
                        >
                            <Input
                                autoFocus={true}
                                onPressEnter={onAdd}
                                placeholder={t("Input username...")}
                                autoComplete="off"
                            />
                        </Form.Item>
                        <Form.Item
                            key="pass"
                            label={t("Password")}
                            name="pass"
                            rules={[{ required: true, message: t('Please input password!') }]}
                        >
                            <Input.Password
                                onPressEnter={onAdd}
                                placeholder={t("Input password...")}
                                autoComplete="off"
                            />
                        </Form.Item>
                        <Form.Item
                            key="position"
                            label={t("Group")}
                            name="position"
                            rules={[{ required: true, message: t('Please select group!') }]}
                        >
                            <Select>
                                {
                                    groupItem.map(item => {
                                        return (
                                            <Option key={item.id} value={item.id}>{item.name}</Option>
                                        );
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label=" "
                            colon={false}
                        >
                            <Button
                                loading={isAdding}
                                type="primary"
                                onClick={onAdd}
                                block
                            >{t('Add')}</Button>
                        </Form.Item>
                    </Form>
                </Spin>
            }
        />
    );
}

export default AddUser;