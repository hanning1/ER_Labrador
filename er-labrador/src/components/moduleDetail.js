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
} from '@ant-design/pro-form';




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
         					extra={<ModalForm 	labelWidth="auto"
						            submitter={{
						           	searchConfig:{resetText: 'Cancel',
						      		submitText: 'Submit',},
						           }}
						          trigger={
						            <Button type="primary">
						              Edit
						            </Button>
						          }
						          onFinish={async (values) => {
						            
						            console.log(values);
						            message.success('Successfully edited');
						          }}
						          initialValues={{
        							ModuleName: this.state.currRow.ModuleName,
        							ModuleSchema: this.state.currRow.ModuleSchema,
        							isActive: this.state.currRow.isActive==='true'? "Yes" : "No",
      							  }}
						         >

								  	<ProForm.Group>
								  	<ProFormText width="md" name="ModuleName" label="Name" placeholder="Please enter a module name"
								  	rules={[{ required: true, message: 'Please enter the name!'}]} />
							      	</ProForm.Group>
									<ProForm.Group>
									<ProFormText width="lg" name="ModuleSchema" label="Module Schema" placeholder="Please enter schema" />
									</ProForm.Group>
									<ProForm.Group>
						            <ProFormSelect					              
						              options={[
						                {value: 'true',label: 'Yes',},
						                {value: 'false',label: 'No',},
						              ]}
						              name="isActive"
						              label="Active Status"
						              placeholder="Please select"
						              rules={[{ required: true, message: 'Please select a active status!'}]}
						            />
						          	</ProForm.Group>
						          	
							  		<ProFormTextArea name="Description" label="Description" placeholder="Please enter description here" />
						      		
						 </ModalForm>}
        				>
          				<Descriptions.Item label="Module ID">{this.state.currRow.ModuleID}</Descriptions.Item>
          				<Descriptions.Item label="Module Name">{this.state.currRow.ModuleName}</Descriptions.Item>
          				<Descriptions.Item label="Module Schema">{this.state.currRow.ModuleSchema}</Descriptions.Item>
          				<Descriptions.Item label="Active Status">{this.state.currRow.isActive}</Descriptions.Item>
          				<Descriptions.Item label="Description">{this.state.currRow.Description}</Descriptions.Item>
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
