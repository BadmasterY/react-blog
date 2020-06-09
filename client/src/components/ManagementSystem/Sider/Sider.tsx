import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import MenuItem from 'antd/lib/menu/MenuItem';

import { system } from '../../../config/default.json';

import './sider.css';

const { Sider } = Layout;
const { menuList } = system;

interface SelectArguments {
    key: string;
    keyPath: string[];
    item: MenuItem;
    domEvent: any;
}

function SystemSider(props: { initialSelectItem: string, callback?: Function }) {
    const { callback, initialSelectItem } = props;
    const [collapsed, setCollapsed] = useState(true);

    function changeSelect(select: SelectArguments) {
        if(callback !== undefined) callback(select.key);
    }

    function onCollapse(collapsed: boolean, type: string) {
        setCollapsed(collapsed);
    }

    return (
        <Sider
            className="system-sider"
            breakpoint="md"
            collapsedWidth={0}
            collapsed={collapsed}
            collapsible={true}
            onCollapse={onCollapse}
        >
            <Menu
                // theme='dark'
                selectedKeys={[initialSelectItem]}
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