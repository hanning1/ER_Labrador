import React, { Component } from "react";
import { connect } from "react-redux";
import { withAuth0 } from "@auth0/auth0-react";
import { UPDATE_USERNAME } from "../store/actionTypes";
import { Menu, Button, Layout } from "antd";
import {
	AppstoreOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	PieChartOutlined,
	DesktopOutlined,
	ContainerOutlined,
	MailOutlined,
} from "@ant-design/icons";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

import "antd/dist/antd.css";
import "../styles/navBar.css";

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
		};

		const { user } = this.props.auth0;
		this.props.updateUsername(user.name);
	}

	logout = (e) => {
		this.props.auth0.logout({
			returnTo: window.location.origin,
		});
	};

	toggleCollapsed = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	render() {
		return (
			<div className="navBar">
				<Layout>
					<Sider
						breakpoint="lg"
						collapsedWidth="0"
						// onBreakpoint={(broken) => {
						// 	console.log(broken);
						// }}
						// onCollapse={(collapsed, type) => {
						// 	console.log(collapsed, type);
						// }}
						trigger={null}
						collapsible
						collapsed={this.state.collapsed}
					>
						<div className="logo" />
						<Menu
							defaultSelectedKeys={["1"]}
							defaultOpenKeys={["sub1"]}
							mode="inline"
							theme="dark"
							// inlineCollapsed={this.state.collapsed}
						>
							<Menu.Item key="1" icon={<PieChartOutlined />}>
								Option 1
							</Menu.Item>
							<Menu.Item key="2" icon={<DesktopOutlined />}>
								Option 2
							</Menu.Item>
							<Menu.Item key="3" icon={<ContainerOutlined />}>
								Option 3
							</Menu.Item>
							<SubMenu
								key="sub1"
								icon={<MailOutlined />}
								title="Navigation One"
							>
								<Menu.Item key="5">Option 5</Menu.Item>
								<Menu.Item key="6">Option 6</Menu.Item>
								<Menu.Item key="7">Option 7</Menu.Item>
								<Menu.Item key="8">Option 8</Menu.Item>
							</SubMenu>
							<SubMenu
								key="sub2"
								icon={<AppstoreOutlined />}
								title="Navigation Two"
							>
								<Menu.Item key="9">Option 9</Menu.Item>
								<Menu.Item key="10">Option 10</Menu.Item>
								<SubMenu key="sub3" title="Submenu">
									<Menu.Item key="11">Option 11</Menu.Item>
									<Menu.Item key="12">Option 12</Menu.Item>
								</SubMenu>
							</SubMenu>
						</Menu>
					</Sider>
					<Layout>
						<Header
							className="site-layout-sub-header-background"
							style={{ padding: 0 }}
						>
							{React.createElement(
								this.state.collapsed
									? MenuUnfoldOutlined
									: MenuFoldOutlined,
								{
									className: "trigger",
									onClick: this.toggleCollapsed,
								}
							)}
							<div>
								Hello, {this.props.username}{" "}
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
						<Footer style={{ textAlign: "center" }}>TBD</Footer>
					</Layout>
				</Layout>
			</div>
		);
	}
}
const stateToProps = (state) => {
	return {
		username: state.username,
	};
};

const dispatchToProps = (dispatch) => {
	return {
		updateUsername(username) {
			const action = {
				type: UPDATE_USERNAME,
				value: username,
			};
			dispatch(action);
		},
	};
};

export default connect(stateToProps, dispatchToProps)(withAuth0(NavBar));
