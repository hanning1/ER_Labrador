import axios from "axios";

const SERVER_ADDRESS = "https://eratosuombackend.azurewebsites.net/api/";
const CODE = "pC04Se3EKKG7Is6PPO3az2Idtzg6gJEFrTVbvpOIKh0JXfd9itviGQ==";
const GET_USER_INFO = "getUserInfo";
const UPDATE_USER_INFO = "updateUserInfo";
const CREATE_MODIFY_MODULE = "createModifyModule";
const GET_ALL_MODULES = "getAllModules";
const GET_ALL_ORDERS = "getAllOrders";

export const getAllModules = async (start, end) => {
	let res = await axios.get(
		`${SERVER_ADDRESS}${GET_ALL_MODULES}?start=${start}&end=${end}&code=${CODE}`
	);
	return res;
};
export const createModifyModule = async (payload) => {
	let res = await axios.post(
		`${SERVER_ADDRESS}${CREATE_MODIFY_MODULE}?code=${CODE}`,
		payload
	);
	return res;
};

export const getAllUsers = async (start, end) => {
	let res = await axios.get(
		`${SERVER_ADDRESS}${GET_USER_INFO}?userUri=all&start=${start}&end=${end}&code=${CODE}`
	);
	return res;
};

export const getAllOrders = async (start, end) => {
	let res = await axios.get(
		`${SERVER_ADDRESS}${GET_ALL_ORDERS}?start=${start}&end=${end}&code=${CODE}`
	);
	return res;
};

export const updateUserInfo = async (payload) => {
	let res = await axios.post(
		`${SERVER_ADDRESS}${UPDATE_USER_INFO}?code=${CODE}`,
		payload
	);
	return res;
};
