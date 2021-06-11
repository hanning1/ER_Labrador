import { Layout,Menu ,Form,Input, Button} from 'antd';
import React from 'react'
import 'antd/dist/antd.css'
import "../../styles/UserInfoPage.css";

import Orders from "./Orders.jsx"
import { UploadOutlined, UserOutlined,  MoneyCollectOutlined,BorderlessTableOutlined} from '@ant-design/icons';
import { Link,Route } from 'react-router-dom';

const {   Content, Sider } = Layout;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };


  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};


class UserInfoPage extends React.Component{

    state = {
        disabled: true,

        // user information
        name:'xm',
        email:'123@test.com',
        card:'123',
        cvv:'111'
      };

    toggle = () => {
        this.setState({
            disabled: !this.state.disabled,
        });
    };

    render() {
        return (
            <Layout style={{height:'100%'}}>
                <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
                >
                    <div className="logo">
                        User Center
                    </div>
                    
                    <Menu 
                        theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            Basic Information
                        </Menu.Item>

                        
                        
                    </Menu>
                            
                </Sider>

            <Layout>
                <Content style={{ margin: '24px 16px 24px 16px'}}>
                    <div className="site-layout-background" style={{ paddingTop:100, minHeight: 600 }}>
                        
                        
                        <Form {...layout} name="nest-messages"  validateMessages={validateMessages} style={{width:'550px'}} >
                        
                            <Form.Item name={['user', 'username']} label="User Name">
                                <Input disabled={this.state.disabled} defaultValue={this.state.name}/>
                            </Form.Item>

                            <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]} >
                                <Input disabled={this.state.disabled} defaultValue={this.state.email}/>
                            </Form.Item>

                            <Form.Item name={['user', 'card']} label="Bank Card" >
                                <Input disabled={this.state.disabled} defaultValue={this.state.card}/>
                            </Form.Item>

                            <Form.Item name={['user', 'cvv']} label="CVV Number" >
                                <Input disabled={this.state.disabled} defaultValue={this.state.cvv}/>
                            </Form.Item>

                            <Form.Item {...tailLayout} wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                <Button onClick={this.toggle} type="ghost" htmlType="update">
                                Update
                                </Button>

                                <Button type="primary" htmlType="submit" style={{marginLeft:'20px'}}>
                                Submit
                                </Button>
                            </Form.Item>

                        </Form>
                        

                    </div>
                </Content>
            </Layout>

        </Layout>
       );
    }
}
export default UserInfoPage;
