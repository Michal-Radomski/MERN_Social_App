import {uuid as uuidv4} from "uuidv4";

import {SET_ALERT, REMOVE_ALERT} from "../types";

export const setAlert =
  (msg: string, alertType: string, timeout = 5000) =>
  (dispatch: Dispatch) => {
    const id = uuidv4();
    console.log({id});
    dispatch({
      type: SET_ALERT,
      payload: {msg, alertType, id},
    });

    setTimeout(() => dispatch({type: REMOVE_ALERT, payload: id}), timeout);
  };
