import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
import { UPDATE_USERNAME } from "../store/actionTypes";

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
				Hello {this.props.username}{" "}
				<Button
					variant="dark"
					size="sm"
					onClick={() => logout({ returnTo: window.location.origin })}
				>
					Log out
				</Button>
				<h1>This is the main content page</h1>
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
