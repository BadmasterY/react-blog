import React from 'react';
import { Form, Input } from 'antd';

import './setting.css';

function Setting() {
    const [form] = Form.useForm();

    return (
        <div className="system-setting">
            <h2>Setting</h2>
            <Form
                form={form}
            >
                
            </Form>
        </div>
    )
}

export default Setting;