import axios from "axios";
export const SERVER_ADDRESS = "https://eratosuombackend.azurewebsites.net/api/";
export const CODE = "DO8U6Got0JOKu9TYa4qDdE/kykdH8Yd6f7eF8WdCTcJ/WjppQTQOaA==";
export const CREATE_TASK = "createTask";


export const createTask= async (payload) => {
	let res = await axios.post(
		`${SERVER_ADDRESS}${CREATE_TASK}?code=${CODE}`,
		 payload
	);
	return res;
};

const createPaymentIntent = options => {
  console.log([options],options);
  return window
    .fetch(`/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(options)
    })
    .then(res => {
      console.log("[intent-res]",res);
      if (res.status === 200) {
        return res.json();
      } else {
        return null;
      }
    })
    .then(data => {
      if (!data || data.error) {
        throw new Error("PaymentIntent API Error");
      } else {
        return data.client_secret;
      }
    });
};


const getProductDetails = options => {
  return window
    .fetch(`/product-details`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        return null;
      }
    })
    .then(data => {
      if (!data || data.error) {
        throw Error("API Error");
      } else {
        return data;
      }
    });
};

const getPublicStripeKey = options => {
  return window
    .fetch(`/public-key`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        return null;
      }
    })
    .then(data => {
      if (!data || data.error) {
        
        throw Error("API Error");
      } else {
        return data.publicKey;
      }
    });
};

const api = {
  createPaymentIntent,
  getPublicStripeKey: getPublicStripeKey,
  getProductDetails: getProductDetails,
};

export default api;
