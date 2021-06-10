import React, { Component } from 'react';
import { Col, Row, Card, Layout, Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

class SearchBar extends Component {
    render() {
        return (
            <div className="main">
                <div>

                    <Button icon={<SearchOutlined />}>Search</Button>

                    <input className="searchBox"
                        id="input"
                        className="input"
                        type="text"
                        placeholder="What are you looking for?"
                    />

                    <Button type="button" role="button" aria-label="open menu" aria-haspopup="true" data-toggle="true" className="dropdown-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <title>arrow_drop_down</title>
                            <path d="M7.86,11.06a.5.5,0,0,1,0-.71l.2-.2A.49.49,0,0,1,8.42,10h7.16a.49.49,0,0,1,.36.15l.2.2a.5.5,0,0,1,0,.71l-3.79,3.79a.48.48,0,0,1-.7,0Z"></path>
                        </svg>
                        {/* <a href='../assets/map_interface.html'></a> */}
                    </Button>
                </div>

            </div>
        )
    }
}

export default SearchBar;
/*<div id="dropdown" className="dropdown-content">
                        <div className="dropdown-item">AAAAA</div>
                        <div className="dropdown-item">BBBBB</div>
                        <div className="dropdown-item">CCCCC</div>
                </div>*/