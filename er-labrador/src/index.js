import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Auth0Provider, withAuthenticationRequired } from "@auth0/auth0-react";
import {
	DOMAIN_NAME,
	CLIENT_ID,
	REDIRECT_URI,
	REACT_APP_ERATOS_AUTH0_AUD,
	REACT_APP_ERATOS_AUTH0_DOMAIN,
	REACT_APP_ERATOS_AUTH0_CLIENT_ID,
} from "./store/auth0";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
import Login from "././components/login";
import Home from "./components/home";
import Order from "./components/order";
import OrderDetail from "./components/orderDetail";
import Users from "./components/users";
import Modules from "./components/modules";
import ModuleDetail from "./components/moduleDetail";
import UserDetail from "./components/userDetail";
import UserProfile from "./components/userProfile";

export const history = createBrowserHistory();

const ProtectedRoute = ({ component, ...args }) => (
	<Route component={withAuthenticationRequired(component)} {...args} />
);

const onRedirectCallback = (appState) => {
	// Use the router's history module to replace the url
	history.replace(appState?.returnTo || window.location.pathname);
};

const App = (
	// <React.StrictMode>
	<Auth0Provider
		domain={REACT_APP_ERATOS_AUTH0_DOMAIN}
		clientId={REACT_APP_ERATOS_AUTH0_CLIENT_ID}
		redirectUri={window.location.origin}
		onRedirectCallback={onRedirectCallback}
		useRefreshTokens={true}
	>
		<Provider store={store}>
			<Router>
				<Route path="/" exact component={Login} />
				<ProtectedRoute path="/home" component={Home} />
				<ProtectedRoute path="/orderDetail" component={OrderDetail} />
				<ProtectedRoute path="/orders" component={Order} />
				<ProtectedRoute path="/userDetail/:id" component={UserDetail}/>
				<ProtectedRoute path="/users" component={Users} />
				<ProtectedRoute path="/moduleDetail/:id" component={ModuleDetail}/>
				<ProtectedRoute path="/modules" component={Modules} />
				<ProtectedRoute path="/profile" component={UserProfile} />
			</Router>
		</Provider>
	</Auth0Provider>
	// </React.StrictMode>
);

ReactDOM.render(App, document.getElementById("root"));
if (module.hot) {
	module.hot.accept();
}
