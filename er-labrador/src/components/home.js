import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
import { UPDATE_USER } from "../store/actionTypes";

import NavBar from "./navBar";
import "../styles/home.css";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {};

		const { user } = this.props.auth0;
		this.props.updateUser(user);
	}

	render() {
		return (
			<div className="home">
				<NavBar defaultSelectedKeys="1">
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

export default connect(stateToProps, dispatchToProps)(withAuth0(Home));
