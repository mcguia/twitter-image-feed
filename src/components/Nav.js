import React, { Component } from "react";
import { Button, Layout, Menu } from "antd";
import NavSearch from "./NavSearch";
import styled from "styled-components";

const { Header } = Layout;

const StyledMenu = styled(Menu)`
  .ant-menu-item {
    float: right;
  }
  .ant-input-search {
    position: absolute;
    top: 17px;
    right: 30px;
  }
`;
class Nav extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <StyledMenu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: "64px", marginRight: "200px" }}
            collapsible="false"
          >
            <Menu.Item key="1">
              <Button ghost>Sign in with Twitter</Button>
            </Menu.Item>
            <NavSearch />
          </StyledMenu>
        </Header>
      </Layout>
    );
  }
}

export default Nav;
