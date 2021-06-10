import React, { Component, useState } from 'react';
import { Col, Row, Card, Layout, Form, Input, Button, Checkbox } from 'antd';
import '../styles/Login.css';

const { Header, Footer, Sider, Content } = Layout;

const LoginForm = () => {
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('vertical');
  
    const onFormLayoutChange = ({ layout }) => {

    };
  
    const formItemLayout = {
        labelCol: {
            span: 8,
        },
          wrapperCol: {
            span: 16,
        },
    };

    const tailLayout = {
        wrapperCol: {
            offset: 0,
            span: 16,
        },
    };

    const buttonLayout = {
        wrapperCol: {
            offset: 4,
            span: 8,
        },
    };
    

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Card title="Eratos" bordered={true} style={{width: 600}} >
            <Form
                layout={formLayout}
                form={form}
                initialValues={{
                    remember: true,
                    layout: formLayout,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onValuesChange={onFormLayoutChange}
            >

                <Form.Item {...formItemLayout}
                    label="Username"
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item {...formItemLayout}
                    label="Password"
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                
                <Row>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                        Login
                        </Button>
                    </Form.Item>

                    <Form.Item {...buttonLayout}>
                        <Button type="link" htmlType="submit">
                        Sign Up
                        </Button>
                    </Form.Item>
                </Row>

            </Form>
        </Card>
    );
};

class Login extends Component{
    render() {
        return (
            <Layout>
                <Content style={{ padding: '50px 50px' }}>
                <Row>
                    <Col span={12} offset={6} >
                        <LoginForm />
                    </Col>
                </Row>
                </Content>

                {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
            </Layout>
        )
    }
}

export default Login;
