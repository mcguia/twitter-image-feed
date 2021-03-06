import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Layout, Menu } from "antd";
import NavSearch from "./NavSearch";
import styled from "styled-components";

const { Header } = Layout;

const StyledMenu = styled(Menu)`
  .ant-input-search {
    position: absolute;
    top: 17px;
    right: 30px;
  }
`;
class Nav extends Component {
  render() {
    const { location } = this.props;
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <StyledMenu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            style={{ lineHeight: "64px", marginRight: "200px" }}
            collapsible="false"
          >
            <Menu.Item key="/">
              <Link to="/">Image Search</Link>
            </Menu.Item>

            <NavSearch
              options={this.props.options}
              setOptions={this.props.setOptions}
            />
          </StyledMenu>
        </Header>
      </Layout>
    );
  }
}

Nav.propTypes = {
  location: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  setOptions: PropTypes.func.isRequired
};

export default withRouter(Nav);
