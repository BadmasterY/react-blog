import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { confirm } = Modal;

function Delete() {
    const { t } = useTranslation();

    return (<></>)
};

function showDeleteFn(record: any, deleteOkFn: (record: any) => void) {
    confirm({
        title: 'Do you want to delete this item?',
        icon: <ExclamationCircleOutlined />,
        content: 'Are you sure you want to delete it? It will not be recovered after deletion!',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: () => { deleteOkFn(record) },
    });
}

export {
    showDeleteFn,
};

export default Delete;