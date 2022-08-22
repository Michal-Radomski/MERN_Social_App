import axios from "axios";
// import {setAlert} from "./alert";

import {GET_PROFILE, PROFILE_ERROR} from "../types";

//* Default headers in axios are already included: Content-Type: application/json; Also axios stringifies and parses JSON !!!

// Get current users profile
export const getCurrentProfile = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get("/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: (err as CustomError).response.statusText, status: (err as CustomError).response.status},
    });
  }
};
