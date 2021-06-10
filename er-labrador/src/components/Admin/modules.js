import React, { Component, useState } from "react";
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";
import { withAuth0 } from "@auth0/auth0-react";
import { UPDATE_USER } from "../../store/actionTypes";
import axios from "axios";
import NavBar from "./navBar";
import "../../styles/index.css";
import { Table, Input, Button, Switch, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { columns, data } from "../../../data sample/moduleData";
import { getAllModules, createModifyModule } from "../../store/api";

import ProForm, {
	ModalForm,
	ProFormText,
	ProFormTextArea,
	ProFormSelect,
} from "@ant-design/pro-form";

const { Search } = Input;

class Modules extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			searchedColumn: "",
			filteredColumns: [],
			dataSource: [],
			tableLoading: true,
			switchLoading: false,
		};

		columns.forEach((item) => {
			if (item.key !== "operation" && item.key !== "1") {
				this.state.filteredColumns.push(
					Object.assign(item, {
						...this.getColumnSearchProps(item.dataIndex),
						sorter: (a, b) => true,
						sortDirections: ["descend", "ascend"],
					})
				);
			} else if (item.key !== "1") {
				this.state.filteredColumns.push(
					Object.assign(
						item,
						{
							...this.getColumnSearchProps(item.dataIndex),
						},
						{
							render: (text, record, index) => {
								return (
									<Switch
										checkedChildren="On"
										unCheckedChildren="Off"
										loading={this.state.switchLoading}
										checked={record.isActive}
										onChange={async (checked, e) => {
											e.stopPropagation();
											this.setState({
												switchLoading: true,
											});
											let payload = {
												moduleSchema:
													record.ModuleSchema,
												moduleName: record.ModuleName,
												isActive: checked,
												Description: record.Description,
											};
											let res = await createModifyModule(
												payload
											);
											if (res.data.Success === "True") {
												record.isActive =
													!record.isActive;
												// console.log(
												// 	"success, current: ",
												// 	record.isActive
												// );
											} else {
												console.log(
													"Error: ",
													res.data.Message
												);
											}
											this.setState({
												switchLoading: false,
											});
										}}
									/>
								);
							},
						}
					)
				);
			}
		});

		getAllModules(1, 100)
			.then((res) => {
				this.setState({
					dataSource: res.data.Modules,
					tableLoading: false,
				});
			})
			.catch((err) => {
				console.log("fail to fetch data: ", err);
				this.setState({ tableLoading: false });
			});
	}

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

	componentDidMount = () => {
		const { user } = this.props.auth0;
		if (this.props.user !== user) this.props.updateUser(user);
	};

	componentWillUnmount = () => {
		this.setState({ filteredColumns: [] });
	};

	waitTime = (time = 100) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(true);
			}, time);
		});
	};

	render() {
		return (
			<div className="common-component">
				<NavBar defaultSelectedKeys="2">
					<div className="modules-content common-component-content">
						<Search
							style={{ maxWidth: "80%", marginRight: 15 }}
							placeholder="Input search text"
							allowClear
							onSearch={(value) => {
								this.setState({
									searchText: value,
								});
							}}
						/>

						<ModalForm
							labelWidth="auto"
							submitter={{
								searchConfig: {
									resetText: "Reset",
									submitText: "Submit",
								},
							}}
							trigger={
								<Button
									type="primary"
									style={{ marginTop: 15 }}
								>
									<PlusOutlined />
									Add
								</Button>
							}
							onFinish={async (values) => {
								let data = [...this.state.dataSource];
								let newData = values;
								newData["ModuleID"] =
									this.state.dataSource.length + 1;
								let payload = {
									moduleSchema: newData.ModuleSchema,
									moduleName: newData.ModuleName,
									isActive: newData.isActive,
									Description: newData.Description,
								};
								let res = await createModifyModule(payload);

								if (res.data.Success === "True") {
									data.push(newData);
									this.setState({
										dataSource: data,
									});
									message.success("Successfully added");
									await this.waitTime();
									return true;
								} else {
									console.log(res.data);
									message.error("Error. Something is wrong.");
								}
							}}
						>
							<ProForm.Group>
								<ProFormText
									width="md"
									name="ModuleName"
									label="Name"
									placeholder="Please enter a module name"
									rules={[
										{
											required: true,
											message: "Please enter the name!",
										},
									]}
								/>
							</ProForm.Group>

							<ProForm.Group>
								<ProFormText
									width="lg"
									name="ModuleSchema"
									label="Module Schema"
									placeholder="Please enter the url of the schema!"
									rules={[
										{
											required: true,
											message:
												"Please enter the schema url!",
										},
									]}
								/>
							</ProForm.Group>

							<ProForm.Group>
								<ProFormSelect
									options={[
										{ value: true, label: "Yes" },
										{ value: false, label: "No" },
									]}
									name="isActive"
									label="Active Status"
									placeholder="Please select"
									rules={[
										{
											required: true,
											message:
												"Please select an active status!",
										},
									]}
								/>
							</ProForm.Group>

							<ProFormTextArea
								name="Description"
								label="Description"
								placeholder="Please enter description here"
								rules={[
									{
										required: true,
										message:
											"You have to enter some descriptions here!",
									},
								]}
							/>
						</ModalForm>
						<Table
							columns={this.state.filteredColumns}
							dataSource={this.state.dataSource.filter((item) => {
								return Object.values(item)
									.toString()
									.includes(this.state.searchText);
							})}
							loading={this.state.tableLoading}
							scroll={{ x: 1500 }}
							pagination={{
								position: ["topLeft"],
								hideOnSinglePage: true,
							}}
							rowKey={(record) => {
								record.ModuleID;
							}}
							onRow={(record) => {
								return {
									onClick: (e) => {
										this.props.history.push({
											pathname: `/moduleDetail/${record.ModuleID}`,
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

export default connect(stateToProps, dispatchToProps)(withAuth0(Modules));
