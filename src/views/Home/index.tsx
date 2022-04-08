import React from "react";
import { Layout } from "antd";
import "./style.css";

const { Header, Footer, Sider, Content } = Layout;

function Home() {
  return (
    <Layout className="Page">
      <Header className="Header">Header</Header>
      <Content className="Content">Content</Content>
    </Layout>
  );
}

export default Home;
