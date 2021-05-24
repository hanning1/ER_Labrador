import React, { Component } from "react";
import { connect } from "react-redux";
import { withAuth0 } from "@auth0/auth0-react";
import { UPDATE_USER } from "../store/actionTypes";

import NavBar from "./navBar";
import "../styles/index.css";
import { Descriptions, Table, Input, Button, Space } from "antd";
import { Button as RBButton } from "react-bootstrap";

class UserDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			searchedColumn: "",
			currRow: props.location.state.currRow,
			size: 'default',
		};	

	}

	componentDidMount = () => {
		const { user } = this.props.auth0;
		if (this.props.user !== user) this.props.updateUser(user);
		
	};

	render() {
		return (
			<div className="common-component">
				<NavBar defaultSelectedKeys="2">
					<div className="module-detail-content common-component-content">
						<Descriptions
          					bordered
          					title="User Details"
          					size={this.state.size}
        				>
          				<Descriptions.Item label="User ID">{this.state.currRow.UserID}</Descriptions.Item>
          				<Descriptions.Item label="Full Name">{this.state.currRow.Name}</Descriptions.Item>
          				<Descriptions.Item label="Email">{this.state.currRow.Email}</Descriptions.Item>
          				<Descriptions.Item label="Eratos User ID">{this.state.currRow.EratosUserID}</Descriptions.Item>
          				<Descriptions.Item label="Auth0 ID">{this.state.currRow.Auth0ID}</Descriptions.Item>
          				<Descriptions.Item label="Administrator">{this.state.currRow.isAdmin}</Descriptions.Item>
          				<Descriptions.Item label="Date and Time of User Created">{this.state.currRow.CreatedAt}</Descriptions.Item>
          				<Descriptions.Item label="Info">{this.state.currRow.Info}</Descriptions.Item>
            			</Descriptions>

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

export default connect(stateToProps, dispatchToProps)(withAuth0(UserDetail));
