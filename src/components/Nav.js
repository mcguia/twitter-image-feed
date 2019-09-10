import React, { Component } from "react";
import { Layout, Menu } from "antd";
import NavSearch from "./NavSearch";
const { Header } = Layout;

class Nav extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <NavSearch />
          </Menu>
        </Header>
      </Layout>
    );
  }
}

export default Nav;
