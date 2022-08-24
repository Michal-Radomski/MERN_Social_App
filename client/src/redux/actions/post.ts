import axios from "axios";

// import {setAlert} from "./alert";
import {GET_POSTS, POST_ERROR} from "../types";

// Get posts
export const getPosts = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get("/api/posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: (err as CustomError).response.statusText, status: (err as CustomError).response.status},
    });
  }
};
