import React, { Component } from 'react';
import '../styles/homePage/Header.css';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import { Menu, Dropdown, message } from 'antd';


  
const menu = (
<Menu >
    {/* <Menu.Item key="1">
    <Link to="/orders">orders</Link>
    </Menu.Item>
    <Menu.Item key="2">
    <Link to="/downloads">downloads</Link>
    </Menu.Item>
    <Menu.Item key="3">log out</Menu.Item> */}
    <Menu.Item key="1">
    <Link to="/login">Log in</Link>
    </Menu.Item> 

</Menu>
);

class Header extends Component {
    render() {
        return (
            <header>
                <a aria-label="Homepage" className="logo" href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="2.25rem" height="2.25rem" aria-hidden="true">
                        <title>eratos_icon</title>
                        <path d="M18.274 36h-.131a5.625 5.625 0 0 1-3.903-1.625L1.638 21.91a5.483 5.483 0 0 1 0-7.818L14.24 1.625c2.187-2.163 5.737-2.167 7.929-.008l.009.008 2.56 2.534L10.746 18l13.992 13.842-2.56 2.533A5.625 5.625 0 0 1 18.274 36zm13.694-24.69L25.205 18l6.763 6.69-4.664 4.614L15.877 18 27.304 6.696l4.664 4.614zm2.099 2.076a6.472 6.472 0 0 1 0 9.228L29.403 18l4.664-4.614z" fill-rule="nonzero"></path>
                    </svg>
                </a>
                <div className="headerRight">
                    <a aria-label="Homepage" className="menu" href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1.5rem" height="1.5rem" aria-hidden="true">
                            <title>menu_vs</title>
                            <path d="M10,5V8a2,2,0,0,1-2,2H5A2,2,0,0,1,3,8V5A2,2,0,0,1,5,3H8A2,2,0,0,1,10,5Zm9-2H16a2,2,0,0,0-2,2V8a2,2,0,0,0,2,2h3a2,2,0,0,0,2-2V5A2,2,0,0,0,19,3ZM8,14H5a2,2,0,0,0-2,2v3a2,2,0,0,0,2,2H8a2,2,0,0,0,2-2V16A2,2,0,0,0,8,14Zm11,0H16a2,2,0,0,0-2,2v3a2,2,0,0,0,2,2h3a2,2,0,0,0,2-2V16A2,2,0,0,0,19,14Z" fill-rule="nonzero"></path>
                        </svg>
                    </a>
                    {/* <button className="user">UG</button> */}
                    <Dropdown overlay={menu}>
                    <a className="user" onClick={e => e.preventDefault()}>
                        User
                    </a>
                    </Dropdown>
                </div>
            </header>
        )
    }
}

export default Header;