import React, { Component } from "react";
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";
import { withAuth0 } from "@auth0/auth0-react";
import { UPDATE_USER } from "../store/actionTypes";

import NavBar from "./navBar";
import "../styles/index.css";
import { Table, Input, Button, Space, Form } from "antd";

const { Search } = Input;

class UserProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount = () => {
		const { user } = this.props.auth0;
		if (this.props.user !== user) this.props.updateUser(user);
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
