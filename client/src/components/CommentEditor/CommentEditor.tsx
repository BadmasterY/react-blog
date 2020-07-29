import React from 'react';
import { Form, Button, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { useTranslation } from 'react-i18next';

import './commenteditor.css';

interface Props {
    isSubmitting: boolean;
    onSubmit: (form: FormInstance) => void;
}

const { TextArea } = Input;

function CommentEditor(props: Props) {
    const { isSubmitting, onSubmit } = props;

    const [form] = Form.useForm();
    const { t } = useTranslation();

    return (
        <Form
            className="comment-editor"
            form={form}
            hideRequiredMark={true}
        >
            <Form.Item
                name="commentContent"
                rules={[{ required: true, message: t('Please input comment!') }]}
            >
                <TextArea
                    rows={4}
                />
            </Form.Item>
            <Form.Item
                style={{
                    textAlign: 'right',
                }}
            >
                <Button
                    onClick={event => { onSubmit(form) }}
                    type="primary"
                    loading={isSubmitting}
                >{t('Add Comment')}</Button>
            </Form.Item>
        </Form>
    );
}

export default CommentEditor;