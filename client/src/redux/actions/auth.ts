import axios from "axios";

import {REGISTER_SUCCESS, REGISTER_FAIL} from "../types";
import {setAlert} from "./alert";

// Register a User
export const register =
  ({name, email, password}: {name: string | undefined; email: string; password: string}) =>
  async (dispatch: Dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({name, email, password});

    try {
      const res = await axios.post("/api/users", body, config);
      // console.log("res.data:", res.data);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.error((error as CustomError).response.data);
      const errors = (error as CustomError).response.data.errors;

      if (errors) {
        errors.forEach((error: {msg: string}) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
