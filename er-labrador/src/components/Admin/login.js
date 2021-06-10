import React, { Component } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

import "../../styles/login.css";
import Home from "./home";
import { connect } from "react-redux";
import Loading from "./loading";
import logo from "../../ui/logo.png";

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
					<a>
						{/* <img src={require("../ui/eratos.png")} /> */}
						<img src={logo} />
					</a>
					{/* <h2>GeoPlus</h2> */}
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
