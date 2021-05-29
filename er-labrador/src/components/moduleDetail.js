import React, { Component } from "react";
import { connect } from "react-redux";
import { withAuth0 } from "@auth0/auth0-react";
import { UPDATE_USER } from "../store/actionTypes";

import NavBar from "./navBar";
import "../styles/index.css";
import { Descriptions, Table, Input, Button, Space, message } from "antd";
import { Button as RBButton } from "react-bootstrap";

import ProForm, {
	ModalForm,
	DrawerForm,
	QueryFilter,
	LightFilter,
	StepsForm,
	ProFormText,
	ProFormTextArea,
	ProFormSelect,
} from "@ant-design/pro-form";

class ModuleDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			searchedColumn: "",
			currRow: props.location.state.currRow,
			size: "default",
		};
		// console.log(this.state.currRow);
	}

	componentDidMount = () => {
		const { user } = this.props.auth0;
		if (this.props.user !== user) this.props.updateUser(user);
	};

	waitTime = (time = 100) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(true);
			}, time);
		});
	};

	render() {
		console.log(this.state.currRow);

		return (
			<div className="common-component">
				<NavBar defaultSelectedKeys="2">
					<div className="module-detail-content common-component-content">
						<Descriptions
							bordered
							title="Module Details"
							size={this.state.size}
							extra={
								<ModalForm
									labelWidth="auto"
									submitter={{
										searchConfig: {
											resetText: "Cancel",
											submitText: "Submit",
										},
									}}
									trigger={
										<Button type="primary">Edit</Button>
									}
									onFinish={async (values) => {
										let oldData = this.state.currRow;
										let updatedData = values;
										updatedData["ModuleID"] =
											oldData.ModuleID;
										updatedData["key"] = oldData.key;
										updatedData["isActive"] =
											values.isActive=== "true"
												? "Yes"
												: "No";
										updatedData["status"] =
											values.isActive === "true"
												? "Enabled"
												: "Disabled";
										// console.log(this.state.currRow, values);
										// edit below to post data to backend
										
										this.setState({ currRow: values });
										await this.waitTime();
										message.success("Successfully edited");
										return true;
									}}
									initialValues={{
										ModuleName:
											this.state.currRow.ModuleName,
										ModuleSchema:
											this.state.currRow.ModuleSchema,
										isActive:
											this.state.currRow.isActive.toString()=== "true"? "Yes": "No",
										Description:
											this.state.currRow.Description,
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
													message:
														"Please enter the name!",
												},
											]}
										/>
									</ProForm.Group>
									<ProForm.Group>
										<ProFormText
											width="lg"
											name="ModuleSchema"
											label="Module Schema"
											placeholder="Please enter schema"
											rules={[
												{
													required: true,
													message:
														"Please enter the url of the schema!",
												},
											]}
										/>
										
									</ProForm.Group>
									<ProForm.Group>
										<ProFormSelect
											options={[
												{ value: "true", label: "Yes" },
												{ value: "false", label: "No" },
											]}
											name="isActive"
											label="Active Status"
											placeholder="Please select"
											rules={[
												{
													required: true,
													message:
														"Please select a active status!",
												},
											]}
										/>
									</ProForm.Group>

									<ProFormTextArea
										name="Description"
										label="Description"
										placeholder="Please enter description here"
									/>
								</ModalForm>
							}
						>
							<Descriptions.Item label="Module ID">
								{this.state.currRow.ModuleID}
							</Descriptions.Item>
							<Descriptions.Item label="Module Name">
								{this.state.currRow.ModuleName}
							</Descriptions.Item>
							<Descriptions.Item label="Module Schema">
								{this.state.currRow.ModuleSchema}
							</Descriptions.Item>
							<Descriptions.Item label="Active Status">
								{this.state.currRow.isActive === true ? "Yes": "No"}
							</Descriptions.Item>
							<Descriptions.Item label="Description">
								{this.state.currRow.Description}
							</Descriptions.Item>
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
