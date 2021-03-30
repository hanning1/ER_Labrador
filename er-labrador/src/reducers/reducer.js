import { UPDATE_USER } from "../store/actionTypes";

const defaultState = {
	user: {
		nickname: "",
		email: "",
		email_verified: false,
		name: "",
		picture: "",
		sub: "",
		updated_at: "",
	},
	list: ["早八点开始服务", "早九点下一波", "早九点下一波"],
};

export default (state = defaultState, action) => {
	if (action.type === UPDATE_USER) {
		let newState = JSON.parse(JSON.stringify(state));
		newState.user = action.value;
		return newState;
	}
	return state;
};
