import {SET_ALERT, REMOVE_ALERT} from "../types";

const initialState: State = [];

function alertReducer(state = initialState, action: Dispatch) {
  console.log({action});
  console.log("action.payload:", action.payload);
  console.log("action.type:", action.type);

  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter((alert: {id: number}) => alert.id !== action.payload);
    default:
      return state;
  }
}

export default alertReducer;
