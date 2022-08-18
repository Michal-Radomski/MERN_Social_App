import {SET_ALERT, REMOVE_ALERT} from "../types";

const initialState: State = [];

const alertReducer = (state = initialState, action: Dispatch) => {
  // console.log({action});
  // console.log("action.payload:", action.payload);
  // console.log("action.type:", action.type);
  const {type, payload} = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert: {id: string}) => alert.id !== payload);
    default:
      return state;
  }
};

export default alertReducer;
