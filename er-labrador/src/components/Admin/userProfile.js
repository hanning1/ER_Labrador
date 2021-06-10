import React, { Component } from "react";
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";
import { withAuth0 } from "@auth0/auth0-react";
import { UPDATE_USER } from "../../store/actionTypes";

import NavBar from "./navBar";
import "../../styles/index.css";
import { Input, Button, Switch, Form, message } from "antd";
import {
	REACT_APP_ERATOS_TRACKER,
	REACT_APP_ERATOS_AUTH0_AUD,
} from "../../store/auth0";
import axios from "axios";
import { updateUserInfo } from "../../store/api";

class UserProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: "",
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

	getUserInfo = async (id) => {
		let res = await axios.get(
			`https://eratosuombackend.azurewebsites.net/api/getUserInfo?userUri=${id}&code=cT7R1kpoixw6jeEaCxK488gdl3BjDW5C7YgysAnj0S3Ybkay0Gx0xg==`
		);
		return res;
	};

	componentDidMount = async () => {
		const { user, getAccessTokenSilently } = this.props.auth0;

		const token = await getAccessTokenSilently({
			audience: REACT_APP_ERATOS_AUTH0_AUD,
		});
		const userId = await this.getUserId(token);
		user["id"] = userId;
		if (this.props.user !== user) this.props.updateUser(user);

		this.getUserInfo(user.id)
			.then((res) => {
				let result = res.data.UserInfo;
				this.setState({ user: result });
			})
			.catch((err) => {
				console.log("error: ", err);
			});
	};

	onFinish = async (values) => {
		let newData = this.state.user;
		newData.Email = values.Email ? values.Email : newData.Email;
		newData.isAdmin = values.isAdmin ? values.isAdmin : newData.isAdmin;
		newData.Name = values.Name ? values.Name : newData.Name;
		let res = await updateUserInfo(newData);
		console.log("rseponse: ", res, newData);

		if (res.data.Success === "True") {
			this.setState({
				user: newData,
			});
			message.success(res.data.Message);
		} else {
			message.error("Error. Something is wrong.");
		}
		await this.waitTime();
		return true;
	};

	onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	waitTime = (time = 100) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(true);
			}, time);
		});
	};

	render() {
		const layout = {
			labelCol: { span: 2 },
			wrapperCol: { span: 4 },
		};
		return (
			<div className="common-component">
				<NavBar>
					<div className="user-profile-content common-component-content">
						<Form
							{...layout}
							name="basic"
							initialValues={{ remember: true }}
							onFinish={(values) => this.onFinish(values)}
							onFinishFailed={(error) =>
								this.onFinishFailed(error)
							}
						>
							<Form.Item label="Name" name="Name">
								<Input
									placeholder={
										this.state.user.Name
											? this.state.user.Name
											: "None"
									}
								/>
							</Form.Item>

							<Form.Item label="Email" name="Email">
								<Input
									placeholder={
										this.state.user.Email
											? this.state.user.Email
											: "None"
									}
								/>
							</Form.Item>

							<Form.Item label="Is Admin" name="isAdmin">
								<Switch
									checked={this.state.user.isAdmin}
									onChange={(checked, e) => {
										let data = Object.assign(
											{},
											this.state.user,
											{ isAdmin: checked }
										);
										this.setState({ user: data });
									}}
								/>
							</Form.Item>

							{/* <Form.Item {...tailLayout}> */}
							<Form.Item>
								<Button type="primary" htmlType="submit">
									Submit
								</Button>
							</Form.Item>
						</Form>
					</div>
				</NavBar>
			</div>
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

export default connect(stateToProps, dispatchToProps)(withAuth0(UserProfile));
