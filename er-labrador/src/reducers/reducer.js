import { UPDATE_COLLAPSE, UPDATE_USER } from "../store/actionTypes";

const defaultState = {
	user: {
		id: "",
		nickname: "",
		email: "",
		email_verified: false,
		name: "",
		picture: "",
		sub: "",
		updated_at: "",
	},
	collapsed: false,
	list: ["早八点开始服务", "早九点下一波", "早九点下一波"],
};

export default (state = defaultState, action) => {
	if (action.type === UPDATE_USER) {
		let newState = JSON.parse(JSON.stringify(state));
		newState.user = action.value;
		return newState;
	}
	if (action.type === UPDATE_COLLAPSE) {
		let newState = JSON.parse(JSON.stringify(state));
		newState.collapsed = action.value;
		return newState;
	}
	return state;
};
