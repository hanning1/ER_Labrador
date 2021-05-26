import React, { Component } from "react";
import { connect } from "react-redux";
import { withAuth0 } from "@auth0/auth0-react";
import { UPDATE_USER } from "../store/actionTypes";

import NavBar from "./navBar";
import "../styles/index.css";
import { Descriptions, Table, Input, Button, Space } from "antd";
import { Button as RBButton } from "react-bootstrap";

class OrderDetail extends Component {
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
		console.log("successful");
	};

	render() {
		return (
			<div className="common-component">
				<NavBar defaultSelectedKeys="4">
					<div className="order-detail-content common-component-content">
						<Descriptions
          					bordered
          					title="Order Details"
          					size={this.state.size}
        				>
          				<Descriptions.Item label="Order ID">{this.state.currRow.OrderID}</Descriptions.Item>
          				<Descriptions.Item label="Price">{this.state.currRow.Price}</Descriptions.Item>
          				<Descriptions.Item label="Status">{this.state.currRow.Status}</Descriptions.Item>
          				<Descriptions.Item label="User ID">{this.state.currRow.UserID}</Descriptions.Item>
          				<Descriptions.Item label="Payment ID">{this.state.currRow.PaymentID}</Descriptions.Item>
          				<Descriptions.Item label="Time of Order Placed">{this.state.currRow.OrderTime}</Descriptions.Item>
          				<Descriptions.Item label="Time Used">{this.state.currRow.TimeUsed}</Descriptions.Item>
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

export default connect(stateToProps, dispatchToProps)(withAuth0(OrderDetail));
