import React, { Component } from "react";
import { connect } from "react-redux";
import { withAuth0 } from "@auth0/auth0-react";
import { UPDATE_USER } from "../store/actionTypes";

import NavBar from "./navBar";
import "../styles/index.css";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { columns, data } from "../../data sample/userData";

import {
	REACT_APP_ERATOS_TRACKER,
	REACT_APP_ERATOS_AUTH0_AUD,
} from "../store/auth0";
import axios from "axios";

const { Search } = Input;

class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			searchedColumn: "",
			filteredColumns: [],
			dataSource: [],
			loading: true,
		};

		columns.map((item) => {
			this.state.filteredColumns.push(
				Object.assign({}, item, {
					...this.getColumnSearchProps(item.dataIndex),
					sorter: (a, b) => true,
					sortDirections: ["descend", "ascend"],
				})
			);
		});

		this.getDataSource()
			.then((res) => {
				let result = res.data.UserInfo;
				result.forEach((item) => {
					item.isAdmin = item.isAdmin.toString();
				});
				this.setState({
					dataSource: result,
					loading: false,
				});
			})
			.catch((err) => {
				console.log("fail to fetch users: ", err);
				this.setState({ loading: false });
			});
	}

	getDataSource = async () => {
		let res = await axios.get(
			"https://eratosuombackend.azurewebsites.net/api/getUserInfo?userUri=all&start=1&end=100&code=cT7R1kpoixw6jeEaCxK488gdl3BjDW5C7YgysAnj0S3Ybkay0Gx0xg=="
		);
		return res;
	};

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

	getColumnSearchProps = (dataIndex) => ({
		filterIcon: (filtered) => (
			<SearchOutlined
				style={{ color: filtered ? "#1890ff" : undefined }}
			/>
		),
		onFilter: (value, record) =>
			record[dataIndex]
				? record[dataIndex]
						.toString()
						.toLowerCase()
						.includes(value.toLowerCase())
				: "",
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => this.searchInput.select(), 100);
			}
		},
		render: (text) => (
			<Highlighter
				highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
				searchWords={[this.state.searchText]}
				autoEscape
				textToHighlight={text ? text.toString() : ""}
			/>
		),
	});

	componentDidMount = async () => {
		const { user, getAccessTokenSilently } = this.props.auth0;

		const token = await getAccessTokenSilently({
			audience: REACT_APP_ERATOS_AUTH0_AUD,
		});
		const userId = await this.getUserId(token);
		user["id"] = userId;

		if (this.props.user !== user) this.props.updateUser(user);
	};

	// onChange = (pagination, filters, sorter, extra) => {
	// 	console.log("params", pagination, filters, sorter, extra);
	// };

	handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		this.setState({
			searchText: selectedKeys[0],
			searchedColumn: dataIndex,
		});
	};

	handleReset = (clearFilters) => {
		clearFilters();
		this.setState({ searchText: "" });
	};

	render() {
		return (
			<div className="common-component">
				<NavBar defaultSelectedKeys="3">
					<div className="users-content common-component-content">
						<Search
							placeholder="Input search text"
							allowClear
							onSearch={(value) => {
								this.setState({
									searchText: value,
								});
							}}
							style={{ maxWidth: "80%" }}
						/>
						<Table
							columns={this.state.filteredColumns}
							dataSource={this.state.dataSource.filter((item) => {
								return Object.values(item)
									.toString()
									.includes(this.state.searchText);
							})}
							loading={this.state.loading}
							scroll={{ x: 1500 }}
							pagination={{
								position: ["topLeft"],
								hideOnSinglePage: true,
							}}
							rowKey={(record) => {
								record.id;
							}}
							onRow={(record) => {
								return {
									onClick: (e) => {
										this.props.history.push({
											pathname: `/userDetail/${record.key}`,
											state: {
												currRow: record,
											},
										});
									},
								};
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
