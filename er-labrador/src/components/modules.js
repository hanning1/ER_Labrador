import React, { Component } from "react";
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";
import { withAuth0 } from "@auth0/auth0-react";
import { UPDATE_USER } from "../store/actionTypes";

import NavBar from "./navBar";
import "../styles/index.css";
import { Table, Input, Button, Space, Switch,message } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { Button as RBButton } from "react-bootstrap";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { columns, data } from "../../data sample/moduleData";
import moduleDetail from "./moduleDetail";
import { Link } from "react-router-dom";


import ProForm, {
  ModalForm,
  DrawerForm,
  QueryFilter,
  LightFilter,
  StepsForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
} from '@ant-design/pro-form';

const { Search } = Input;


class Modules extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			searchedColumn: "",
			filteredColumns: [],
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
										defaultChecked={
											record.status === "Enabled"
										}
										onClick={(checked, e) => {
											e.stopPropagation();
											console.log(
												record.key,
												"switch clicked"
											);
										}}
									/>
								);
							},
						}
					)
				);
			}
		});
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

	render() {
		return (
			<div className="common-component">
				<NavBar defaultSelectedKeys="2">
					<div className="modules-content common-component-content">
						<div >
						<Search style={{ maxWidth: "80%",marginRight:15}}
							placeholder="Input search text"
							allowClear
							onSearch={(value) => {
								this.setState({
									searchText: value,
								});
							}}
							
						/>

						 
						<ModalForm 	labelWidth="auto"
						            submitter={{
						           	searchConfig:{resetText: 'Reset',
						      		submitText: 'Submit',},
						           }}
						          trigger={
						            <Button type="primary">
						              <PlusOutlined />
						              Add
						            </Button>
						          }
						          onFinish={async (values) => {
						            console.log(values);
						            message.success('Successfully added');
						          }}
						         >

								  	<ProForm.Group>
								  	<ProFormText width="md" name="ModuleName" label="Name" placeholder="Please enter a module name"
								  	rules={[{ required: true, message: 'Please enter the name!'}]} />
							      	</ProForm.Group>

									<ProForm.Group>
									<ProFormText width="lg" name="ModuleSchema" label="Module Schema" placeholder="Please enter the url of the schema" 
									rules={[{ required: true, message: 'Please enter the schema url!'}]}/>
									</ProForm.Group>


									<ProForm.Group>
						            <ProFormSelect
						              
						              options={[
						                {value: 'true',label: 'Yes',},
						                {value: 'no',label: 'No',},
						              ]}
						              name="isActive"
						              label="Active Status"
						              placeholder="Please select"
						              rules={[{ required: true, message: 'Please select a active status!'}]}
						            />
						          	</ProForm.Group>
						          	
							  		<ProFormTextArea name="Description" label="Description" placeholder="Please enter description here" />
						      		
						 </ModalForm> </div>   



						<div>
						<Table
							columns={this.state.filteredColumns}
							dataSource={data.filter((item) => {
								return Object.values(item)
									.toString()
									.includes(this.state.searchText);
							})}
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
											pathname: `/moduleDetail/${record.key}`,
											state: {
												currRow: record,
											},
										});
									},
								};
							}}
						></Table></div>
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
