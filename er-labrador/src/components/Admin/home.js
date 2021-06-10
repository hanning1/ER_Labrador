import React, { Component } from "react";
import { connect } from "react-redux";
import { withAuth0 } from "@auth0/auth0-react";
import { UPDATE_USER } from "../../store/actionTypes";

import NavBar from "./navBar";
import "../../styles/index.css";

import ReactJson from "react-json-view";
import {
	REACT_APP_ERATOS_TRACKER,
	REACT_APP_ERATOS_AUTH0_AUD,
} from "../../store/auth0";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	getUserId = async (pnToken) => {
		const headers = {
			Authorization: "Bearer " + pnToken,
			Accept: "application/json",
		};

		const result = await fetch(`${REACT_APP_ERATOS_TRACKER}/auth/me`, {
			method: "GET",
			headers,
		});

		if (result.status >= 200 && result.status < 400) {
			const data = await result.json();
			return data?.id;
		} else {
			throw await result.json();
		}
	};

	componentDidMount = async () => {
		const { user, getAccessTokenSilently } = this.props.auth0;
		console.log("user info: ", user);

		const token = await getAccessTokenSilently({
			audience: REACT_APP_ERATOS_AUTH0_AUD,
		});
		const userId = await this.getUserId(token);
		user["id"] = userId;

		if (this.props.user !== user) this.props.updateUser(user);
	};

	render() {
		return (
			<div className="common-component">
				<NavBar defaultSelectedKeys="1">
					<div className="home-content">
						The section is for dashboard to show statistics and
						tracking.
						<ReactJson src={this.props.auth0.user}></ReactJson>
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
