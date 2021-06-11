import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createHashHistory } from "history";
import { Auth0Provider, withAuthenticationRequired } from "@auth0/auth0-react";
import {
	REACT_APP_ERATOS_AUTH0_AUD,
	REACT_APP_ERATOS_AUTH0_DOMAIN,
	REACT_APP_ERATOS_AUTH0_CLIENT_ID,
	REACT_APP_ERATOS_AUTH0_REDIRECT_URI,
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
// import UserApp from "./components/User/App";
import UserHome from "./components/User/UserHome";
import UserLogin from "./components/User/Login";
import BasicTable from "./components/User/Orders";
import CheckoutForm from "./components/User/CheckoutForm";
import Result from "./components/User/Result";
import UserInfo from "./components/User/UserInfoPage";
// import "./styles/CheckoutForm.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import api from "./components/User/Api";
import { Button, Descriptions, Badge, Layout } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Header, Content, Footer } = Layout;
const hashHistory = createHashHistory();

const ProtectedRoute = ({ component, ...args }) => (
	<Route component={withAuthenticationRequired(component)} {...args} />
);

const stripePromise = api.getPublicStripeKey().then((key) =>
	loadStripe(key, {
		locale: "en",
	})
);
const User = "/User";
const Admin = "/Admin";

const App = (
	// <React.StrictMode>
	<Auth0Provider
		domain={REACT_APP_ERATOS_AUTH0_DOMAIN}
		clientId={REACT_APP_ERATOS_AUTH0_CLIENT_ID}
		redirectUri={REACT_APP_ERATOS_AUTH0_REDIRECT_URI}
		useRefreshTokens={true}
	>
		<Provider store={store}>
			<Router history={hashHistory}>
				<Switch>
					{/* Admin Side */}
					<Route path={Admin + "/"} exact component={AdminLogin} />
					<ProtectedRoute
						path={Admin + "/home"}
						component={AdminHome}
					/>
					<ProtectedRoute
						path={Admin + "/orderDetail/:id"}
						component={OrderDetail}
					/>
					<ProtectedRoute
						path={Admin + "/orders"}
						component={Order}
					/>
					<ProtectedRoute
						path={Admin + "/userDetail/:id"}
						component={UserDetail}
					/>
					<ProtectedRoute path={Admin + "/users"} component={Users} />
					<ProtectedRoute
						path={Admin + "/moduleDetail/:id"}
						component={ModuleDetail}
					/>
					<ProtectedRoute
						path={Admin + "/modules"}
						component={Modules}
					/>
					<ProtectedRoute
						path={Admin + "/profile"}
						component={UserProfile}
					/>
					{/* User Side */}
					<Route
						path="/"
						exact
						render={() => <Redirect to="/home" />}
					/>

					{/* <Route path="/app" component={UserApp} /> */}
					<Route path="/home" component={UserHome} />
					<Route path="/history" component={BasicTable} />
					<Route path="/login" component={UserLogin} />
					<Route path="/result" component={Result} />
					<Route path="/userInfo" component={UserInfo} />
					<Layout className="layout">
						<Header className="header">
							<Link to="/home">
								<Button
									type="primary"
									shape="circle"
									size="large"
									icon={<HomeFilled />}
								></Button>
							</Link>
						</Header>
						<Content style={{ padding: 100, margin: 0 }}>
							<div className="sr-root">
								<div className="sr-main">
									<Elements stripe={stripePromise}>
										<Route
											path="/checkoutform"
											component={CheckoutForm}
										/>
									</Elements>
								</div>
							</div>
						</Content>
					</Layout>
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
