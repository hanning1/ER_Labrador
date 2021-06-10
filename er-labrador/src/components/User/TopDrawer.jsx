import { Drawer, Button, Radio, Space } from 'antd';
import React, { Component } from 'react';



export default class TopDrawer extends React.Component {
    state = { visible: false, 
              title: '',
              description: '',
            };

    showDrawer = (value, desc) => {
        this.setState({
        visible: true,
        title: value,
        description: desc
        });
    };

    onClose = () => {
        this.setState({
        visible: false,
        });
    };

    onChange = e => {
        this.setState({
        placement: e.target.value,
        });
    };

    componentDidMount() {
        this.props.onRef(this)
    }

    render() {
        const { title, visible, description } = this.state;
        return (
        <>
            <Drawer
            title= { title }
            placement='right'
            closable={false}
            width='512'
            onClose={this.onClose}
            visible={visible}
            key={title}
            >
            <p> { description } </p>

            </Drawer>
        </>
        );
    }
}

