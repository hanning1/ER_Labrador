import { UPDATE_USERNAME } from "../store/actionTypes";

const defaultState = {
	username: "",
	list: ["早八点开始服务", "早九点下一波", "早九点下一波"],
};

export default (state = defaultState, action) => {
	if (action.type === UPDATE_USERNAME) {
		let newState = JSON.parse(JSON.stringify(state));
		newState.username = action.value;
		return newState;
	}

	return state;
};
