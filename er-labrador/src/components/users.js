import React, { Component } from "react";
import { connect } from "react-redux";
import { withAuth0 } from "@auth0/auth0-react";
import { UPDATE_USER } from "../store/actionTypes";

import NavBar from "./navBar";
import "../styles/index.css";
import { Table, Input } from "antd";
import { columns, data } from "../store/data";

const { Search } = Input;

class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount = () => {
		const { user } = this.props.auth0;
		if (this.props.user !== user) this.props.updateUser(user);
	};

	onChange = (pagination, filters, sorter, extra) => {
		console.log("params", pagination, filters, sorter, extra);
	};

	onSearch = (value) => {
		console.log("search: ", value);
	};

	render() {
		return (
			<div className="common-component">
				<NavBar defaultSelectedKeys="3">
					<div className="users-content common-component-content">
						<Search
							placeholder="Input search text"
							allowClear
							onSearch={(value) => this.onSearch(value)}
							style={{ maxWidth: "80%" }}
						/>
						<Table
							columns={columns}
							dataSource={data}
							scroll={{ x: 1500 }}
							pagination={{
								position: ["topLeft"],
								hideOnSinglePage: true,
							}}
						></Table>
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

export default connect(stateToProps, dispatchToProps)(withAuth0(Users));
