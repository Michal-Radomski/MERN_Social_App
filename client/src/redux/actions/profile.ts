import axios from "axios";
import {History} from "history";

import {setAlert} from "./alert";
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

// Create or update profile
export const createProfile =
  (formData: FormData, history: History, edit = false) =>
  async (dispatch: Dispatch) => {
    try {
      const res = await axios.post("/api/profile", formData);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

      if (!edit) {
        history.push("/dashboard");
      }
    } catch (err) {
      const errors = (err as CustomError).response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {msg: (err as CustomError).response.statusText, status: (err as CustomError).response.status},
      });
    }
  };
