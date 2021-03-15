import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Auth0Provider, withAuthenticationRequired } from "@auth0/auth0-react";
import { DOMAIN_NAME, CLIENT_ID, REDIRECT_URI } from "./store/auth0";
import Login from "././components/login";
import Home from "./components/home";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";

export const history = createBrowserHistory();

const ProtectedRoute = ({ component, ...args }) => (
	<Route component={withAuthenticationRequired(component)} {...args} />
);

const onRedirectCallback = (appState) => {
	// Use the router's history module to replace the url
	history.replace(appState?.returnTo || window.location.pathname);
};

const App = (
	<React.StrictMode>
		<Auth0Provider
			domain={DOMAIN_NAME}
			clientId={CLIENT_ID}
			redirectUri={REDIRECT_URI}
			onRedirectCallback={onRedirectCallback}
		>
			<Provider store={store}>
				<Router>
					<Route path="/" exact component={Login}></Route>
					<ProtectedRoute
						path="/home"
						component={Home}
					></ProtectedRoute>
				</Router>
			</Provider>
		</Auth0Provider>
	</React.StrictMode>
);

ReactDOM.render(App, document.getElementById("root"));
