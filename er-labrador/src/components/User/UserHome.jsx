import React, { Component } from "react";
import Map from "./MapInterface";
import TaskForm from "./TaskForm";
import ModuleSearch from "./ModuleSearch";
import PubSub from "pubsub-js";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import {
	Layout,
	Menu,
	Button,
	Row,
	Col,
	Dropdown,
	Tag,
	Switch,
	Select,
} from "antd";
import {
	UserOutlined,
	EnvironmentOutlined,
	ReadOutlined,
	DownOutlined,
	SettingOutlined,
	ContainerOutlined,
	LogoutOutlined,
	FileAddOutlined,
} from "@ant-design/icons";
import GeoSearch from "./GeoSearch";
import { connect } from "react-redux";
import { withAuth0, useAuth0 } from "@auth0/auth0-react";
import {
	REACT_APP_ERATOS_TRACKER,
	REACT_APP_ERATOS_AUTH0_AUD,
} from "../../store/auth0";
import { UPDATE_USER } from "../../store/actionTypes";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class UserHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modules: [],
			moduleSelected: "",
			isAdmin: false,
			formVisible: false,
			isAuthenticated: false,
			userId: "",
		};
	}
	getUserId = async (pnToken) => {
		const headers = {
			Authorization: "Bearer " + pnToken,
			Accept: "application/json",
		};

		const result = await fetch(`${REACT_APP_ERATOS_TRACKER}/auth/me`, {
			method: "GET",
			headers,
		});

		if (result.status >= 200 && result.status < 400) {
			const data = await result.json();
			return data?.id;
		} else {
			throw await result.json();
		}
	};

	componentDidMount = async () => {
		var url =
			"https://eratosuombackend.azurewebsites.net/api/getAllModules?start=1&end=10&code=pC04Se3EKKG7Is6PPO3az2Idtzg6gJEFrTVbvpOIKh0JXfd9itviGQ==";
		try {
			const response = await fetch(url, {
				method: "GET",
			})
				.then((resp) => resp.json())
				.catch((error) => {
					console.log(error);
				});

			var activeModules = response.Modules;
			for (let i in activeModules) {
				if (activeModules[i].isActive == false) {
					activeModules.splice(i, 1);
				}
			}

			this.setState({ modules: activeModules });
		} catch (error) {
			console.log("request is failed", error);
		}

		PubSub.publish("active_modules", this.state.modules);

		try {
			console.log("[props]", this.props);
			const { user, getAccessTokenSilently } = this.props.auth0;
			console.log("user info: ", user);

			const token = await getAccessTokenSilently({
				audience: REACT_APP_ERATOS_AUTH0_AUD,
			});
			const userId = await this.getUserId(token);
			this.setState({ userId: userId });
			console.log("userid", this.state.userId);
			user["id"] = userId;
			if (this.props.user !== user) this.props.updateUser(user);
			PubSub.publish("getUserId", userId);
		} catch (error) {
			console.log("logging is failed", error);
		}
	};

	handleAdminLogin = (e) => {
		this.props.history.push({
			pathname: `/Admin/`,
		});
	};

	saveModule = (e) => {
		this.setState({ moduleSelected: e.key }, () => {
			console.log(this.state.moduleSelected);
		});
	};

	adminChange = (e) => {
		console.log("e " + e);

		this.setState({
			isAdmin: e,
		});

		console.log("state " + this.state.isAdmin);
	};

	render() {
		var isAuthenticated = this.props.auth0.isAuthenticated;
		var username = "";
		if (this.props.auth0.user == undefined) username = "Not logged in";
		else username = this.props.auth0.user.nickname;

		const menu = (
			<Menu onClick={handleMenuClick}>
				&nbsp;&nbsp; signed as <Tag color="red">{username}</Tag>
				<Menu.Item key="1" icon={<ContainerOutlined />}>
					<Link to="/history">History Orders</Link>
				</Menu.Item>
				<Menu.Item key="2" icon={<LogoutOutlined />}>
					{!isAuthenticated && <Link to="/login">Log in</Link>}
					{isAuthenticated && <Link to="/login">Log out</Link>}
				</Menu.Item>
			</Menu>
		);

		const onFinish = (e) => {
			console.log("Received values of form: ", e);
		};
		const onFinishFailed = (e) => {
			console.log("Received values of form: ", e);
		};

		function handleMenuClick(e) {
			// message.info('Click on menu item.' + e.key);
			console.log("click", e);
		}

		return (
			<Layout>
				<Header>
					<Row>
						<Col span={2} offset={20}>
							<Dropdown overlay={menu}>
								<Button size="large" shape="round">
									<UserOutlined />
									<DownOutlined />
								</Button>
							</Dropdown>
						</Col>
						<Col span={2}>
							<Button onClick={() => this.handleAdminLogin()}>
								Log in as Admin
							</Button>
						</Col>
					</Row>
				</Header>

				<Layout>
					<Sider width={250} className="site-layout-background">
						<Menu
							align="center"
							mode="inline"
							defaultSelectedKeys={["1"]}
							defaultOpenKeys={["sub1"]}
							style={{
								height: "100%",
								borderRight: 0,
								width: 250,
							}}
						>
							<SubMenu
								key="sub1"
								icon={<ReadOutlined />}
								title="Module Info"
							>
								<ModuleSearch />
							</SubMenu>

							<SubMenu
								key="sub2"
								icon={<EnvironmentOutlined />}
								title="Geo Search"
							>
								{/* <ModuleSearch modules={ this.state.modules } /> */}
								<GeoSearch />
							</SubMenu>

							<TaskForm />
						</Menu>
					</Sider>

					<Layout style={{ padding: "0 24px 24px" }}>
						<Content
							className="site-layout-background"
							style={{
								padding: 24,
								margin: 0,
								minHeight: 280,
							}}
						>
							<Map></Map>
						</Content>
					</Layout>
				</Layout>
			</Layout>
		);
	}
}
const stateToProps = (state) => {
	return {
		user: state.user,
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
	};
};

export default connect(stateToProps, dispatchToProps)(withAuth0(UserHome));
