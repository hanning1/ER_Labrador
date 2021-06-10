import React, { Component } from "react";
import { connect } from "react-redux";
import { withAuth0 } from "@auth0/auth0-react";
import { UPDATE_COLLAPSE, UPDATE_USER } from "../store/actionTypes";
import { Menu, Button, Layout, Avatar, Input, Image } from "antd";
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	OrderedListOutlined,
	DashboardOutlined,
	ControlOutlined,
	UserOutlined,
} from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;

import "antd/dist/antd.css";
import "../styles/navBar.css";
import { withRouter } from "react-router";
import logo from "../ui/eratos.png";

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	// if logged out, return to the home page
	logout = (e) => {
		this.props.auth0.logout({
			returnTo: window.location.origin,
		});
	};

	toggleCollapsed = () => {
		this.props.updateCollapseState(!this.props.collapsed);
	};

	render() {
		return (
			<div className="navBar">
				<Layout>
					<Sider
						breakpoint="lg"
						trigger={null}
						collapsible
						collapsed={
							this.props.collapsed ? this.props.collapsed : false
						}
						width={300}
					>
						<div className="logo">
							{/* <img src={logo} width="32" height="32"></img> */}
							<h1>G+</h1>
						</div>

						<Menu
							defaultSelectedKeys={[
								this.props.defaultSelectedKeys !== undefined
									? this.props.defaultSelectedKeys
									: "1",
							]}
							mode="inline"
							theme="dark"
						>
							<Menu.Item
								key="1"
								icon={<DashboardOutlined />}
								onClick={() => {
									this.props.history.push("/");
								}}
							>
								Dashboard
							</Menu.Item>
							<Menu.Item
								key="2"
								icon={<ControlOutlined />}
								onClick={() => {
									this.props.history.push("/modules");
								}}
							>
								Module Control Space
							</Menu.Item>
							<Menu.Item
								key="3"
								icon={<UserOutlined />}
								onClick={() => {
									this.props.history.push("/users");
								}}
							>
								Users
							</Menu.Item>
							<Menu.Item
								key="4"
								icon={<OrderedListOutlined />}
								onClick={() => {
									this.props.history.push("/orders");
								}}
							>
								Orders
							</Menu.Item>
						</Menu>
					</Sider>
					<Layout>
						<Header
							className="site-layout-sub-header-background"
							style={{ padding: 0 }}
						>
							{React.createElement(
								this.props.collapsed
									? MenuUnfoldOutlined
									: MenuFoldOutlined,
								{
									className: "trigger",
									onClick: this.toggleCollapsed,
								}
							)}
							<div>
								Hello,{" "}
								<b>
									{this.props.user
										? this.props.user.nickname
										: "undefined"}
								</b>
								<Avatar
									icon={<UserOutlined />}
									src={this.props.user.picture}
									onClick={() => {
										this.props.history.push("/profile/");
									}}
								></Avatar>
								<Button onClick={() => this.logout()}>
									Log out
								</Button>
							</div>
						</Header>
						<Content style={{ margin: "24px 16px 0" }}>
							<div
								className="site-layout-background"
								style={{ padding: 24, minHeight: 360 }}
							>
								{this.props.children}
							</div>
						</Content>
						<Footer style={{ textAlign: "center" }}>
							Geo+ Group-3
						</Footer>
					</Layout>
				</Layout>
			</div>
		);
	}
}
const stateToProps = (state) => {
	return {
		user: state.user,
		collapsed: state.collapsed,
	};
};

const dispatchToProps = (dispatch) => {
	return {
		updateUser(user) {
			const action = {
				type: UPDATE_USER,
				value: user,
			};
			dispatch(action);
		},
		updateCollapseState(bool) {
			const action = {
				type: UPDATE_COLLAPSE,
				value: bool,
			};
			dispatch(action);
		},
	};
};

export default connect(
	stateToProps,
	dispatchToProps
)(withRouter(withAuth0(NavBar)));
