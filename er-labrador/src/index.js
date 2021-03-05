import React from "react";
import ReactDOM from "react-dom";
import Login from "././components/login";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const App = (
	<Provider store={store}>
		<React.StrictMode>
			<Router>
				<Route path="/" exact component={Login}></Route>
			</Router>
		</React.StrictMode>
	</Provider>
);

ReactDOM.render(App, document.getElementById("root"));
