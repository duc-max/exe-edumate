import React, { useState } from 'react';
import { Layout } from 'antd';
import AdminNav from '../../components/NavAdmin/nav';

const { Content } = Layout;

function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = (isCollapsed) => {
    setCollapsed(isCollapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AdminNav onCollapse={handleCollapse} />
      <Layout>
        <Content className={`${collapsed ? 'sidebar-collapsed' : ''}`}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;