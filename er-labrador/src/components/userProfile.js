import React, { Component } from "react";
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";
import { withAuth0 } from "@auth0/auth0-react";
import { UPDATE_USER } from "../store/actionTypes";

import NavBar from "./navBar";
import "../styles/index.css";
import { Table, Input, Button, Space, Form } from "antd";
import {
	REACT_APP_ERATOS_TRACKER,
	REACT_APP_ERATOS_AUTH0_AUD,
} from "../store/auth0";
import axios from "axios";

const { Search } = Input;

class UserProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {};
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

		// if (this.props.user) {
		this.getUserInfo(this.props.user.id)
			.then((res) => {
				let result = res.data;
				console.log("info: ", result, typeof result);
			})
			.catch((err) => {
				console.log("error: ", err);
			});
		// }
	};

	onFinish = (values) => {
		console.log("Success:", values);
	};

	onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	render() {
		const layout = {
			labelCol: { span: 2 },
			wrapperCol: { span: 4 },
		};
		// const tailLayout = {
		// 	wrapperCol: { offset: 8, span: 16 },
		// };
		return (
			<div className="common-component">
				<NavBar>
					<div className="user-profile-content common-component-content">
						<Form
							{...layout}
							name="basic"
							initialValues={{ remember: true }}
							onFinish={() => this.onFinish}
							onFinishFailed={() => this.onFinishFailed}
						>
							<Form.Item label="Username" name="username">
								<Input placeholder={this.props.user.nickname} />
							</Form.Item>

							<Form.Item label="Email" name="email">
								<Input placeholder={this.props.user.email} />
							</Form.Item>

							<Form.Item label="Update time" name="updateTime">
								<Input
									placeholder={this.props.user.updated_at}
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
