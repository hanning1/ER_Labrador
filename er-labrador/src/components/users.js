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

const { Search } = Input;

class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			searchedColumn: "",
			filteredColumns: [],
		};
	}

	getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={(node) => {
						this.searchInput = node;
					}}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						this.handleSearch(selectedKeys, confirm, dataIndex)
					}
					style={{ width: 188, marginBottom: 8, display: "block" }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() =>
							this.handleSearch(selectedKeys, confirm, dataIndex)
						}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button
						onClick={() => this.handleReset(clearFilters)}
						size="small"
						style={{ width: 90 }}
					>
						Reset
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							confirm({ closeDropdown: false });
							this.setState({
								searchText: selectedKeys[0],
								searchedColumn: dataIndex,
							});
						}}
					>
						Filter
					</Button>
				</Space>
			</div>
		),
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
		render: (text) =>
			this.state.searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
					searchWords={[this.state.searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ""}
				/>
			) : (
				text
			),
	});

	componentDidMount = () => {
		const { user } = this.props.auth0;
		if (this.props.user !== user) this.props.updateUser(user);

		var filteredColumns = [];
		columns.map((item) => {
			filteredColumns.push(
				Object.assign({}, item, {
					...this.getColumnSearchProps(item.dataIndex),
				})
			);
		});
		this.setState({ filteredColumns: filteredColumns });
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
						{/* <Search
							placeholder="Input search text"
							allowClear
							onSearch={(value) => this.onSearch(value)}
							style={{ maxWidth: "80%" }}
						/> */}
						<Table
							columns={this.state.filteredColumns}
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
