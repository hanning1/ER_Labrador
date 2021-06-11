import React, { Component } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";

import "../../styles/login.css";
import Home from "./UserHome";
import { connect } from "react-redux";
//import Loading from "./loading";
//import logo from "../ui/logo.png";

import { Auth0Provider } from "@auth0/auth0-react";

const UserLogin = (props) => {
	const {
		user,
		isLoading,
		isAuthenticated,
		error,
		loginWithRedirect,
		logout,
	} = useAuth0();
	const logoutWithRedirect = () =>
		logout({
			returnTo: window.location.origin,
		});
	// if (isLoading) {
	// 	return <Loading />;
	// }
	if (error) {
		return <div>Oops... {error.message}</div>;
	}
	console.log("[user]", user);
	if (isAuthenticated) {
		return (
			<div className="login">
				<div className="loginCard">
					<Button
						variant="dark"
						size="lg"
						onClick={logoutWithRedirect}
						block
					>
						Log in
					</Button>
				</div>
			</div>
		);
	} else {
		return (
			<div className="login">
				<div className="loginCard">
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

export default connect(stateToProps, null)(UserLogin);
