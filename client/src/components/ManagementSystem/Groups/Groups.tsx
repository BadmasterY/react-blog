import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Button, Input, message, Switch, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { system } from '../../../config/default.json';
import { showDeleteFn } from '../Delete/Delete';
import { GroupItem, Groups as GroupsList, Response } from '../../../interfaces/response';
import Add from '../Add/AddGroup';

import './groups.css';
import { FormInstance } from 'antd/lib/form';

const { initialPageSize, columns } = system;

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'input' | 'switch';
    record: GroupItem;
    index: number;
    children: React.ReactNode;
}

function Groups() {
    const [firstLoad, setFirstLoad] = useState(true);
    const [isLoading, setLoadding] = useState(true);
    const [isUpdating, setUpdating] = useState(false);
    const [showAddBox, setAddBoxIsShow] = useState(false);
    const [isChecked, setChecked] = useState(1);
    const [editKey, setEditKey] = useState('');
    const [dataSource, setData] = useState<GroupItem[]>([]);
    const [initialPage, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [form] = Form.useForm();
    const { t } = useTranslation();

    useEffect(() => {
        if (firstLoad) loadGroups(initialPage, initialPageSize);
    });

    const EditableCell: React.FC<EditableCellProps> = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode = inputType === 'input' ? <Input /> : <Switch checked={isChecked === 1} onChange={swicthChange} checkedChildren="启用" unCheckedChildren="禁用" />;

        return (
            <td {...restProps}>
                {
                    editing ? (
                        <Form.Item
                            name={dataIndex}
                            style={{ margin: 0 }}
                            rules={[
                                {
                                    required: true,
                                    message: `${t('Please input ')}${t(title)}!`,
                                }
                            ]}
                        >
                            {inputNode}
                        </Form.Item>
                    ) : children
                }
            </td>
        );
    };

    function swicthChange(checked: boolean) {
        setChecked(checked ? 1 : 0);
    }

    async function loadGroups(page: number, pageSize: number, query = {}) {
        setFirstLoad(false);

        await axios.post('/group/getGroups', {
            page,
            pageSize,
            query,
        }).then(result => {
            const data: GroupsList = result.data;
            const { error, msg, content } = data;

            setLoadding(false);

            if (error === 1) {
                message.error(msg);
                return;
            }

            if (content) {
                const { maxLength, groups } = content;
                const data: GroupItem[] = [];

                setTotal(maxLength);
                for (let i = 0; i < groups.length; i++) {
                    data[i] = Object.assign({}, groups[i], {
                        key: groups[i].id,
                    });
                }

                setData(data);
            }
        }).catch(err => {
            message.error(t('Please check network!'));
            console.log(err);
        });
    }

    function pageChange(page: number, pageSize?: number) {
        setPage(page);

        if (pageSize) loadGroups(page, pageSize);
    }

    async function deleteOkFn(record: GroupItem) {
        const { id } = record;

        await axios.post('/group/deleteGroup', { id }).then(result => {
            const data: Response = result.data;
            const { error, msg } = data;

            if (error === 1) {
                message.error(msg);
                return;
            }

            message.success(t('Deleted!'));
            const length = dataSource.length;
            const newPage = length === 1 ? initialPage - 1 : initialPage;
            if (newPage <= 0) {
                setData([]);
                return;
            }
            setPage(newPage);
            loadGroups(newPage, initialPageSize);
        }).catch(err => {
            message.error(t('Please check network!'));
            console.log(err);
        })
    }

    function showAdd() {
        setAddBoxIsShow(true);
    }

    function hiddenAdd() {
        setAddBoxIsShow(false);
    }

    async function addNewGroup(form: FormInstance, onCancel = () => { }) {
        await form.validateFields().then(async result => {
            const { name, state } = result;
            const useState = state ? 1 : 0;
            console.log(state, useState);
            await axios.post('/group/addGroup', { name, useState }).then(result => {
                const data: Response = result.data;
                const { error, msg } = data;

                onCancel();

                if (error === 1) {
                    message.error(msg);
                    return;
                }

                message.success(t('Added!'));

                hiddenAdd();
                form.resetFields();
                loadGroups(initialPage, initialPageSize);
            }).catch(err => {
                onCancel();
                console.error(err);
                message.error(t('Please check network!'));
            });
        }).catch(err => {
            onCancel();
            console.error(err);
            message.error(t('Please check input!'));
        });
    }

    function isEditing(record: GroupItem) {
        return record.id === editKey;
    }

    function editFn(record: GroupItem) {
        form.setFieldsValue({ ...record });
        setChecked(record.useState ? 1 : 0);
        setEditKey(record.id);
    }

    async function updateFn(id: string) {
        setUpdating(true);

        form.validateFields().then(async result => {
            const { name, useState } = (result as GroupItem);
            const state = useState ? 1 : 0;
            const newItem = { id, name, useState: state };


            await axios.post('/group/updateGroup', newItem)
                .then(result => {
                    const data: Response = result.data;
                    const { error, msg } = data;
                    const dataIndex = dataSource.findIndex(item => id === item.id);
                    const newData: GroupItem[] = Object.assign([], dataSource);
                    newData[dataIndex] = newItem;

                    if (error === 1) {
                        setUpdating(false);
                        message.error(msg);
                        return;
                    }

                    message.success(t('Updated!'));

                    setData(newData);
                    setUpdating(false);
                    setEditKey('');

                }).catch(err => {
                    setUpdating(false);
                    console.error(err);
                    message.error(t('Please check network!'));
                });
        }).catch(err => {
            setUpdating(false);
            console.error(err);
            message.error(t('Please check input!'));
        });
    }

    const initialColumns = [
        {
            title: t(columns.name.title),
            dataIndex: columns.name.dataIndex,
            editable: true,
        },
        {
            title: t(columns.state.title),
            dataIndex: columns.state.dataIndex,
            editable: true,
            render: (state: number) => {
                const showState = state === 0 ? t('Disable') : t('Enable');
                const color = state === 0 ? '#ed4014' : '#19be6b';
                return (
                    <span style={{ color }}>{showState}</span>
                );
            },
        },
        {
            title: t("Action"),
            key: "action",
            editable: false,
            render: (text: any, record: GroupItem) => {
                const editing = isEditing(record);
                return (<Row gutter={[6, 6]}>
                    <Col xs={24} sm={12}>
                        {
                            editing ?
                                <Button
                                    block
                                    loading={isUpdating}
                                    type="primary"
                                    onClick={() => {
                                        updateFn(record.id);
                                    }}
                                >{t('Update')}</Button>
                                :
                                <Button
                                    disabled={editKey !== ''}
                                    block
                                    onClick={() => {
                                        editFn(record);
                                    }}
                                >{t('Edit')}</Button>
                        }
                    </Col>
                    <Col xs={24} sm={12}>
                        <Button
                            block
                            onClick={() => {
                                showDeleteFn(record, deleteOkFn);
                            }}
                        >{t('Delete')}</Button>
                    </Col>
                </Row>)
            },
        }
    ];

    const mergedColumns = initialColumns.map(col => {
        if (!col.editable) return col;

        return {
            ...col,
            onCell: (record: GroupItem) => ({
                record,
                inputType: col.dataIndex === 'useState' ? 'swicth' : 'input',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        }
    });

    return (
        <div className="system-comments">
            <div className="button-box">
                <Button
                    type="primary"
                    onClick={showAdd}
                    style={{ marginRight: '8px' }}
                >
                    {t('Add')}
                </Button>
                <Button onClick={() => {
                    setLoadding(true);
                    loadGroups(initialPage, initialPageSize);
                }}>{t('Refresh')}</Button>
            </div>
            <Form form={form} component={false}>
                <Table
                    className="users-table"
                    components={{
                        body: {
                            cell: EditableCell,
                        }
                    }}
                    loading={isLoading}
                    pagination={{
                        position: ['bottomRight'],
                        current: initialPage,
                        pageSize: initialPageSize,
                        total,
                        onChange: pageChange,
                    }}
                    bordered={false}
                    dataSource={dataSource}
                    columns={mergedColumns}
                    scroll={{
                        x: 'max-content'
                    }}
                />
            </Form>
            <Add
                modalVisible={showAddBox}
                onClick={addNewGroup}
                onCancel={hiddenAdd}
            />
        </div>
    );
}

export default Groups;