import React, { Component } from "react";
import { connect } from "react-redux";
import { withAuth0 } from "@auth0/auth0-react";
import { UPDATE_USER } from "../store/actionTypes";

import NavBar from "./navBar";
import "../styles/index.css";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount = () => {
		const { user, getAccessTokenSilently, getIdTokenClaims } =
			this.props.auth0;
		const token = getAccessTokenSilently();
		token.then((res) => {
			console.log("token", res);
		});
		const idTokenClaims = getIdTokenClaims();
		token.then((res) => {
			console.log("id_token_claims", res);
		});
		if (this.props.user !== user) this.props.updateUser(user);
	};

	render() {
		return (
			<div className="common-component">
				<NavBar defaultSelectedKeys="1">
					<div className="home-content">
						The section is for dashboard to show statistics and
						tracking.
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
