import React, { Component } from "react";
import { connect } from "react-redux";
import { withAuth0 } from "@auth0/auth0-react";
import { UPDATE_USER } from "../store/actionTypes";

import NavBar from "./navBar";
import "../styles/index.css";
import { Descriptions, Table, Input, Button, Space } from "antd";
import { Button as RBButton } from "react-bootstrap";

class ModuleDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			searchedColumn: "",
			currRow: props.location.state.currRow,
			size: 'default',
		};
		console.log(this.state.currRow);
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
          					title="Module Details"
          					size={this.state.size}
         					extra={<Button type="primary">Edit</Button>}
        				>
          				<Descriptions.Item label="Module ID">{this.state.currRow.ModuleID}</Descriptions.Item>
          				<Descriptions.Item label="Module Name">{this.state.currRow.ModuleName}</Descriptions.Item>
          				<Descriptions.Item label="Module Schema">{this.state.currRow.ModuleSchema}</Descriptions.Item>
          				<Descriptions.Item label="Active Status">{this.state.currRow.isActive}</Descriptions.Item>
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

export default connect(stateToProps, dispatchToProps)(withAuth0(ModuleDetail));
