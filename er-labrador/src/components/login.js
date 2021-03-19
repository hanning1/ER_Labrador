import React, { Component } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";

import "../styles/login.css";
import Home from "./home";
import { connect } from "react-redux";

const Login = (props) => {
	const {
		isLoading,
		isAuthenticated,
		error,
		user,
		loginWithRedirect,
		logout,
	} = useAuth0();

	if (isLoading) {
		return (
			<div className="layer">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				Loading...
			</div>
		);
	}
	if (error) {
		return <div>Oops... {error.message}</div>;
	}
	if (isAuthenticated) {
		return (
			// <div>
			// 	Hello {user.name}{" "}
			// 	<Button
			// 		variant="dark"
			// 		size="lg"
			// 		onClick={() => logout({ returnTo: window.location.origin })}
			// 		block
			// 	>
			// 		Log out
			// 	</Button>
			// </div>
			<Home />
		);
	} else {
		return (
			<div className="login">
				<div className="loginCard">
					<a href="http://www.eratos.ai">
						<img src="../assets/eratos.png"></img>
					</a>
					<h2>Eratos</h2>
					<Button
						variant="dark"
						size="lg"
						onClick={loginWithRedirect}
						block
					>
						Log in
					</Button>
				</div>
			</div>
		);
	}
};

const stateToProps = (state) => {
	return {
		username: state.username,
	};
};

export default connect(stateToProps, null)(Login);
