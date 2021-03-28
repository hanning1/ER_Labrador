import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
import { UPDATE_USERNAME } from "../store/actionTypes";

import NavBar from "./navBar";

import { Menu, Layout } from "antd";
const { Header, Content, Footer, Sider } = Layout;
import "../styles/home.css";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {};

		const { user } = this.props.auth0;
		this.props.updateUsername(user.name);
	}

	render() {
		return (
			<div className="home">
				<NavBar>
					<div className="home-content">
						We can edit the main content here
					</div>
				</NavBar>
			</div>
		);
	}
}

const stateToProps = (state) => {
	return {
		username: state.username,
	};
};

const dispatchToProps = (dispatch) => {
	return {
		updateUsername(username) {
			const action = {
				type: UPDATE_USERNAME,
				value: username,
			};
			dispatch(action);
		},
	};
};

export default connect(stateToProps, dispatchToProps)(withAuth0(Home));
