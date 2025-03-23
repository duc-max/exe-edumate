import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './style.css';

const { Sider } = Layout;

const AdminNav = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
      className="admin-sider"
      trigger={null}
    >
      <div className="logo">
        {collapsed ? "Admin" : "Admin Dashboard"}
      </div>
      <div className="collapse-button" onClick={toggleCollapsed}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        className="admin-menu"
      >
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to="/admin/users">Người dùng</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ShoppingCartOutlined />}>
          <Link to="/admin/products">Sản phẩm</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<SettingOutlined />}>
          <Link to="/admin/settings">Cài đặt</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<LogoutOutlined />} className="logout-item">
          <Link to="/logout">Đăng xuất</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminNav;