import React, { useState } from 'react';
import { Form, Button, Input, Switch, Modal } from 'antd';

import { AddProps } from '../../../interfaces/group';

function Add(props: AddProps) {
    const { modalVisible, onClick, onCancel } = props;

    const [isLoading, setLoading] = useState(false);
    const [isChecked, setChecked] = useState(true);
    const [form] = Form.useForm();

    const initialValues = { name: '', state: true };

    function checkChange(checked: boolean) {
        setChecked(checked);
    }

    function loadingNow() {
        setLoading(true);
    }

    function loaded() {
        setLoading(false);
    }

    return (
        <Modal
            visible={modalVisible}
            title={<span>Add</span>}
            footer={null}
            onCancel={onCancel}
            children={
                <Form
                    id="add-modal"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 19 }}
                    initialValues={initialValues}
                    form={form}
                >
                    <Form.Item
                        key="name"
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input name!' }]}
                    >
                        <Input
                            autoFocus={true}
                            className="add-modal-input"
                            placeholder="Input name..."
                            allowClear={true}
                        />
                    </Form.Item>
                    <Form.Item
                        key="state"
                        label="State"
                        name="state"
                    >
                        <Switch
                            checked={isChecked}
                            onClick={checkChange}
                            checkedChildren="启用"
                            unCheckedChildren="禁用"
                        />
                    </Form.Item>
                    <Form.Item
                        label=" "
                        colon={false}
                    >
                        <Button
                            loading={isLoading}
                            type="primary"
                            block
                            onClick={() => {
                                loadingNow();
                                onClick(form, loaded);
                            }}
                        >Add</Button>
                    </Form.Item>
                </Form>
            }
        />
    );
}

export default Add;