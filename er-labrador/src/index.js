import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createHashHistory } from "history";
import { Auth0Provider, withAuthenticationRequired } from "@auth0/auth0-react";
import {
	REDIRECT_URI,
	REACT_APP_ERATOS_AUTH0_AUD,
	REACT_APP_ERATOS_AUTH0_DOMAIN,
	REACT_APP_ERATOS_AUTH0_CLIENT_ID,
} from "./store/auth0";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
// components from Admin end
import AdminLogin from "././components/Admin/login";
import AdminHome from "./components/Admin/home";
import Order from "./components/Admin/order";
import OrderDetail from "./components/Admin/orderDetail";
import Users from "./components/Admin/users";
import Modules from "./components/Admin/modules";
import ModuleDetail from "./components/Admin/moduleDetail";
import UserDetail from "./components/Admin/userDetail";
import UserProfile from "./components/Admin/userProfile";
// components from User end
import UserApp from "./components/User/App";
import UserHome from "./components/User/UserHome";
import UserLogin from "./components/User/Login";
import BasicTable from "./components/User/Orders";
import CheckoutForm from "./components/User/CheckoutForm";
import Result from "./components/User/Result";
// import "./styles/CheckoutForm.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import api from "./components/User/Api";

const hashHistory = createHashHistory();

const ProtectedRoute = ({ component, ...args }) => (
	<Route component={withAuthenticationRequired(component)} {...args} />
);

const onRedirectCallback = (appState) => {
	// Use the router's history module to replace the url
	history.replace(appState?.returnTo || window.location.pathname);
};

const stripePromise = api.getPublicStripeKey().then((key) => loadStripe(key));

const User = "/User";
const Admin = "/Admin";

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
				<ProtectedRoute path="/userDetail/:id" component={UserDetail} />
				<ProtectedRoute path="/users" component={Users} />
				<ProtectedRoute
					path="/moduleDetail/:id"
					component={ModuleDetail}
				/>
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
