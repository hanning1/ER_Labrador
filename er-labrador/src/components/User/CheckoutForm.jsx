import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import "../../styles/CheckoutForm.css";
import success from "../../assets/payment/success.jpg";
import API from "./Api";
import { withRouter } from "react-router";
import moment from "moment";
import { createTask } from "./Api";
import PubSub from "pubsub-js";
import { Link } from "react-router-dom";
import { Button } from "antd";

function CheckoutForm(props) {
	const [amount, setAmount] = useState(0);
	const [currency, setCurrency] = useState("");
	const [clientSecret, setClientSecret] = useState(null);
	const [error, setError] = useState(null);
	const [metadata, setMetadata] = useState(null);
	const [succeeded, setSucceeded] = useState(false);
	const [processing, setProcessing] = useState(false);
	const [values, setValues] = useState(null);
	const [geometry, setGeometry] = useState(null);
	const [TaskID, setTaskId] = useState("");
	const [paid, setPaid] = useState(false);
	const stripe = useStripe();
	const elements = useElements();

	useEffect(() => {
		// Step 1: Fetch product details such as amount and currency from
		// API to make sure it can't be tampered with in the client.

		console.log("props", props);
		setValues(props.location.state.values);
		setGeometry(props.location.state.geometry);
		setCurrency("aud");
		setAmount(global.money);
		var options = { amount: global.money * 100, currency: "aud" };
		console.log("global-money", global.money);
		// Step 2: Create PaymentIntent over Stripe API
		API.createPaymentIntent(options)
			.then((clientSecret) => {
				setClientSecret(clientSecret);
			})
			.catch((err) => {
				setError(err.message);
			});
		console.log("clientSecret", clientSecret);
	}, []);

	const handleSubmit = async (ev) => {
		ev.preventDefault();
		setProcessing(true);

		// Step 3: Use clientSecret from PaymentIntent and the CardElement
		// to confirm payment with stripe.confirmCardPayment()
		const payload = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: ev.target.name.value,
				},
			},
		});

		console.log("stripe", stripe);
		if (payload.error) {
			setError(`Payment failed: ${payload.error.message}`);
			setProcessing(false);
			console.log("[error]", payload.error);
		} else {
			setError(null);
			setSucceeded(true);
			setProcessing(false);
			setMetadata(payload.paymentIntent);
			console.log("[PaymentIntent]", payload.paymentIntent);
		}
	};

	const DealTask = () => {
		useEffect(() => {
			async function fetchitems() {
				let payload = {
					userUri:
						"https://staging.e-pn.io/users/xsrudeulfvtr2eiaiksic2jf",
					paymentID:
						"https://staging.e-pn.io/users/xsrudeulfvtr2eiaiksic2jf" +
						moment().format("YYYY-MM-DD HH:mm:ss"),
					price: amount,
					moduleType:
						"https://schemas.eratos.ai/json/utas.climateinfo",
					taskType: "GenerateClimateInfo",
					name: values.taskName,
					geometry: "POINT(140.3142799 -42.84756651)",
					priority: "low",
				};
				let res = await createTask(payload);
				console.log("[res]", res);
				if (res.data.Success === "True") {
					console.log("Successfully added", res.data.TaskID);
					setTaskId(res.data.TaskID);
					PubSub.publish("getTaskId", res.data.TaskID);
				} else {
					console.log(res.data);
				}
			}
			fetchitems();
		}, []);

		setPaid(true);
	};

	const RenderSuccess = (e) => {
		if (paid == false) DealTask();

		return (
			<div className="sr-field-success message">
				<img src={success} alt="logo" />
			</div>
		);
	};

	const renderForm = () => {
		const options = {
			style: {
				base: {
					color: "#32325d",
					fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
					fontSmoothing: "antialiased",
					fontSize: "16px",
					"::placeholder": {
						color: "#aab7c4",
					},
				},
				invalid: {
					color: "#fa755a",
					iconColor: "#fa755a",
				},
			},
		};

		return (
			<form onSubmit={handleSubmit}>
				<h1>
					{currency.toLocaleUpperCase()}{" "}
					{amount.toLocaleString(navigator.language, {
						minimumFractionDigits: 2,
					})}{" "}
				</h1>
				<h4>Pay for this order</h4>

				<div className="sr-combo-inputs">
					<div className="sr-combo-inputs-row">
						<input
							type="text"
							id="name"
							name="name"
							placeholder="Name"
							autoComplete="cardholder"
							className="sr-input"
						/>
					</div>

					<div className="sr-combo-inputs-row">
						<CardElement
							className="sr-input sr-card-element"
							options={options}
						/>
					</div>
				</div>

				{error && <div className="message sr-field-error">{error}</div>}

				<button
					className="btn"
					disabled={processing || !clientSecret || !stripe}
				>
					{processing ? "Processing…" : "Pay"}
				</button>
			</form>
		);
	};

	return (
		<div className="checkout-form">
			<div className="sr-payment-form">
				<div className="sr-form-row" />
				{succeeded ? <RenderSuccess /> : renderForm()}
				<Button type="primary">
					<Link to="/result">View Result</Link>
				</Button>
			</div>
		</div>
	);
}

export default withRouter(CheckoutForm);
