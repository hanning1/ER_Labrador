import React, { Component, useState } from 'react';
import { Button, Modal, Form, Input, Select, Rate } from 'antd';

import { FileAddOutlined, ThunderboltOutlined, PlusOutlined } from '@ant-design/icons';

import { useHistory } from "react-router-dom";
import PubSub from 'pubsub-js'
import {withRouter} from "react-router-dom";
import { Link } from "react-router-dom";

global.wkt = "";
global.activeModules = [];

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const history = useHistory()
  const handleGoTo = (values) => {
    console.log("values2",values);
  } 

  // Rate desc
  const desc = ['Low', 'Medium', 'High', 'Important', 'Critical'];

  return (
    
    <Modal
      visible={visible}
      title="Create a new task"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        var temp = null;
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
            console.log("values",values);
            temp = values;
            console.log("temp",temp);
            console.log("history",history);
            history.push({pathname:'/checkoutform',state:{values,geometry:global.wkt}});
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
          
          handleGoTo(temp);
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
      <Form.Item label="The amount you should pay">
        <span className="ant-form-text">$ {global.money}</span>
      </Form.Item>

        <Form.Item
          name="taskName"
          label="Task Name"
          rules={[
            {
              required: true,
              message: 'Please input the name of your task!',
            },
          ]}
        >
          <Input placeholder="Name your new task" />
        </Form.Item>

        <Form.Item
        name="moduleType"
        label="Module"
        hasFeedback
        rules={[{ required: true, message: 'Please select your module!' }]}
        >
        <Select placeholder="Please select a module">
          {global.activeModules.map( val => (<Option key = { val.ModuleName } value={ val.ModuleName }>{ val.ModuleName }</Option>))}
        </Select>
        </Form.Item>

        <Form.Item name="priority" label="Priority" rules={[{ required: true, message: 'Please select a priority!' }]}>
          <Rate character={ <ThunderboltOutlined /> } tooltips={desc} />
        </Form.Item>

      </Form>
    </Modal>
  );
};

const CollectionsPage = () => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };

  return (
    <div>
      {/* <Button
        type="link" onClick={() => {setVisible(true);}}
        block
        icon={<FileAddOutlined />} 
      >
        New Task
      </Button> */}

      <Button type="primary" onClick={() => {setVisible(true);}} style={{left:25, width: 200, top:25}}>
          <FileAddOutlined /> New Task
       </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default class TaskForm extends Component {
    render() {
        return(
            <CollectionsPage modules={ this.props.modules }/>
        ) 
    }

    componentDidMount(){
      PubSub.subscribe("transfer_wkt",(_,wkt_data)=>{
        console.log("Task get: "+wkt_data)
        global.wkt = wkt_data;
      })

      PubSub.subscribe("active_modules",(_,modules)=>{
        global.activeModules = modules;
        // console.log(global.activeModules)

      })
    }
}