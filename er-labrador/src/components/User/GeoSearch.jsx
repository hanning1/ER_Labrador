import React, { Component } from 'react';
import { Select } from 'antd';
import PubSub from 'pubsub-js';

const { Option } = Select;

let timeout;
let currentValue;

export default class SearchInput extends React.Component {
    state = {
        data: [],
        value: undefined,
    };

    handleSearch = async(value) => {
        if (value) {
        var proxy = 'https://mighty-depths-04855.herokuapp.com/'
        var url = proxy+'https://staging.e-tr.io/search?type=https://schemas.eratos.ai/json/world.admin_level&ff[admin_level,eq]=6&q='+value
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
            })
            .then((resp) => resp.json())
            .catch((error) => {
                console.log(error);
            })

            // console.log(response.resources);
            this.setState({ data:  response.resources});

        } catch (error) {
            console.log('request is failed',error);
        }
        } else {
        this.setState({ data: [] });
        }
    };

    handleChange = value => {
        this.setState({ value });
    };

    handleSelect = async(value) => {
        if (value) {
            var proxy = 'https://mighty-depths-04855.herokuapp.com/'
            var suffix = '/geo?detail=max';
            var url = proxy + value + suffix;
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                })
                .then((resp) => resp.json())
                .catch((error) => {
                    console.log(error);
                })
                
                const coordinates = response.features[0].geometry.coordinates
                // console.log(coordinates);
                PubSub.publish("coordinates", coordinates);

    
            } catch (error) {
                console.log('request is failed',error);
            }
            } else {
            this.setState({ data: [] });
            }

    }

    render() {
        const options = this.state.data.map(d => <Option key={d['@id']}>{d.long_name}</Option>);
        return (
        <Select
            showSearch
            value={this.state.value}
            placeholder={this.props.placeholder}
            style={{ width: 200, left: 25 }}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={this.handleSearch}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            notFoundContent={null}
            allowClear
        >
            {options}
        </Select>
        );
    }
}

