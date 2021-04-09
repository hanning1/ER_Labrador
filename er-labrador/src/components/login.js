import React, { Component } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

import "../styles/login.css";
import Home from "./home";
import { connect } from "react-redux";
import Loading from "./loading";

const Login = (props) => {
	const { isLoading, isAuthenticated, error, loginWithRedirect } = useAuth0();

	if (isLoading) {
		return <Loading />;
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
						<img src="../ui/eratos.png" />
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
		user: state.user,
	};
};

export default connect(stateToProps, null)(Login);
