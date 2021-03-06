import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { Router, Route, Switch } from "react-router-dom";
import { createHashHistory } from "history";
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

const hashHistory = createHashHistory();

const ProtectedRoute = ({ component, ...args }) => (
	<Route component={withAuthenticationRequired(component)} {...args} />
);

const App = (
	// <React.StrictMode>
	<Auth0Provider
		domain={REACT_APP_ERATOS_AUTH0_DOMAIN}
		clientId={REACT_APP_ERATOS_AUTH0_CLIENT_ID}
		redirectUri={REDIRECT_URI}
		useRefreshTokens={true}
	>
		<Provider store={store}>
			<Router history={hashHistory}>
				<Switch>
					<Route path="/" exact component={Login} />
					<ProtectedRoute path="/home" component={Home} />
					<ProtectedRoute
						path="/orderDetail/:id"
						component={OrderDetail}
					/>
					<ProtectedRoute path="/orders" component={Order} />
					<ProtectedRoute
						path="/userDetail/:id"
						component={UserDetail}
					/>
					<ProtectedRoute path="/users" component={Users} />
					<ProtectedRoute
						path="/moduleDetail/:id"
						component={ModuleDetail}
					/>
					<ProtectedRoute path="/modules" component={Modules} />
					<ProtectedRoute path="/profile" component={UserProfile} />
				</Switch>
			</Router>
		</Provider>
	</Auth0Provider>
	// </React.StrictMode>
);

ReactDOM.render(App, document.getElementById("root"));
if (module.hot) {
	module.hot.accept();
}
