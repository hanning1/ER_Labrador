import { Layout, Menu, Form, Input, Button } from "antd";
import React from "react";
import "antd/dist/antd.css";
import "../../styles/UserInfoPage.css";

import Orders from "./Orders.jsx";
import {
	UploadOutlined,
	UserOutlined,
	MoneyCollectOutlined,
	BorderlessTableOutlined,
} from "@ant-design/icons";
import { Link, Route } from "react-router-dom";

const { Content, Sider } = Layout;

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};

const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
}

const validateMessages = {
	required: "${label} is required!",
	types: {
		email: "${label} is not a valid email!",
		number: "${label} is not a valid number!",
	},
	number: {
		range: "${label} must be between ${min} and ${max}",
	},
};

class UserInfoPage extends React.Component {
	state = {
		disabled: true,

		userUri: "https://staging.e-pn.io/users/xsrudeulfvtr2eiaiksic2jf",

		// user information
		username: "default",
		useremail: "default",
		
	};

	toggle = () => {
		this.setState({
			disabled: !this.state.disabled,
		});
	};

	async componentDidMount(){
		PubSub.subscribe("getUserId", (data) => {
			console.log("User Uri is: " + data);
			this.setState({
				userUri: data,
			});
		});

		let url =
			"https://eratosuombackend.azurewebsites.net/api/getUserInfo?userUri=" +
			this.state.userUri +
			" &code=pC04Se3EKKG7Is6PPO3az2Idtzg6gJEFrTVbvpOIKh0JXfd9itviGQ==";

		try {
			const response = await fetch(url, {
				method: "GET",
			})
				.then((resp) => resp.json())
				.catch((error) => {
					console.log(error);
				});
			
			console.log(response)

			var info = response.UserInfo;
			
			console.log(info.Name)

			console.log("hi")
		} catch (error) {
			console.log("request is failed", error);
		}

		this.setState({
			username:info["Name"],
			useremail:info["Email"]
		});

		console.log(this.state.username)
	}

	render() {
		return (
			<Layout style={{ height: "100%" }}>
				<Sider
					breakpoint="lg"
					collapsedWidth="0"
					onBreakpoint={(broken) => {
						console.log(broken);
					}}
					onCollapse={(collapsed, type) => {
						console.log(collapsed, type);
					}}
				>
					<div className="UserCenter-logo">User Center</div>

					<Menu
						theme="dark"
						mode="inline"
						defaultSelectedKeys={["1"]}
					>
						<Menu.Item key="1" icon={<UserOutlined />}>
							Basic Information
							
						</Menu.Item>
					</Menu>
				</Sider>

				<Layout>
					<Content style={{ margin: "24px 16px 24px 16px" }}>
						<div
							className="site-layout-background"
							style={{ paddingTop: 100, minHeight: 600 }}
						>
							<Form
								{...layout}
								name="nest-messages"
								validateMessages={validateMessages}
								style={{ width: "550px" }}
							>
								<Form.Item
									label="User Name"
								>
									<Input
										disabled={this.state.disabled}
										placeholder={
											this.state.username
												? this.state.username
												: "None"
										}
									/>
								</Form.Item>

								<Form.Item
									label="Email"
									rules={[{ type: "email" }]}
								>
									<Input
										disabled={this.state.disabled}
										placeholder={
											this.state.useremail
												? this.state.useremail
												: "None"
										}
									/>
								</Form.Item>

								<Form.Item
									{...tailLayout}
									wrapperCol={{
										...layout.wrapperCol,
										offset: 8,
									}}
								>
									<Button
										onClick={this.toggle}
										type="ghost"
										htmlType="update"
									>
										Update
									</Button>

									<Button
										type="primary"
										htmlType="submit"
										style={{ marginLeft: "20px" }}
									>
										Submit
									</Button>
								</Form.Item>
							</Form>
						</div>
					</Content>
				</Layout>
			</Layout>
		);
	}
}
export default UserInfoPage;
