import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import MenuItem from 'antd/lib/menu/MenuItem';

import { system } from '../../../config/default.json';

import './sider.css';

const { Sider } = Layout;
const { menuList } = system;

interface MenuInfo {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
}

function SystemSider(props: { initialSelectItem: string, callback?: Function }) {
    const { callback, initialSelectItem } = props;

    function changeSelect(select: MenuInfo) {
        if(callback !== undefined) callback(select.key);
    }

    return (
        <Sider
            className="system-sider"
            breakpoint="md"
            collapsedWidth={0}
            collapsible={true}
        >
            <Menu
                // theme='dark'
                // selectedKeys={[initialSelectItem]}
                selectable={false}
                onClick={changeSelect}
            >
                {
                    menuList.map((item) => (
                        <Menu.Item key={item.key}>
                            <Link to={`/management/${item.key}`}>{item.name}</Link>
                        </Menu.Item>
                    ))
                }
            </Menu>
        </Sider>
    );
}

export default SystemSider;