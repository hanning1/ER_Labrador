import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Rate} from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import PubSub from 'pubsub-js'
import React, { Component, useState } from 'react';
import { FileAddOutlined, ThunderboltOutlined } from '@ant-design/icons';


const { Option } = Select;

export default class TaskDrawer extends React.Component {
  state = { visible: false,
            desc: ['Low', 'Medium', 'High', 'Important', 'Critical'],
          };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Button type="primary" onClick={this.showDrawer} style={{left:25, width: 200, top:25}}>
          <PlusOutlined /> New Task
        </Button>
        <Drawer
          title="Create a new task"
          width={720}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={this.onClose} type="primary">
                Submit
              </Button>
            </div>
          }
        >
        <Form layout="vertical" hideRequiredMark>
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
          {global.activeModules.map( val => (<Option key = { val } value={ val.ModuleName }>{ val.ModuleName }</Option>))}
        </Select>
        </Form.Item>

        <Form.Item name="priority" label="Priority" rules={[{ required: true, message: 'Please select a priority!' }]}>
          <Rate character={ <ThunderboltOutlined /> } tooltips={ this.state.desc } />
        </Form.Item>

      </Form>
          {/* <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: 'Please enter user name' }]}
                >
                  <Input placeholder="Please enter user name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="url"
                  label="Url"
                  rules={[{ required: true, message: 'Please enter url' }]}
                >
                  <Input
                    style={{ width: '100%' }}
                    addonBefore="http://"
                    addonAfter=".com"
                    placeholder="Please enter url"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="owner"
                  label="Owner"
                  rules={[{ required: true, message: 'Please select an owner' }]}
                >
                  <Select placeholder="Please select an owner">
                    <Option value="xiao">Xiaoxiao Fu</Option>
                    <Option value="mao">Maomao Zhou</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="type"
                  label="Type"
                  rules={[{ required: true, message: 'Please choose the type' }]}
                >
                  <Select placeholder="Please choose the type">
                    <Option value="private">Private</Option>
                    <Option value="public">Public</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="approver"
                  label="Approver"
                  rules={[{ required: true, message: 'Please choose the approver' }]}
                >
                  <Select placeholder="Please choose the approver">
                    <Option value="jack">Jack Ma</Option>
                    <Option value="tom">Tom Liu</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="dateTime"
                  label="DateTime"
                  rules={[{ required: true, message: 'Please choose the dateTime' }]}
                >
                  <DatePicker.RangePicker
                    style={{ width: '100%' }}
                    getPopupContainer={trigger => trigger.parentElement}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: 'please enter url description',
                    },
                  ]}
                >
                  <Input.TextArea rows={4} placeholder="please enter url description" />
                </Form.Item>
              </Col>
            </Row>
          </Form> */}
        </Drawer>
      </>
    );
  }
}

