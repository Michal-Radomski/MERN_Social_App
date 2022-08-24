import axios from "axios";

// import {setAlert} from "./alert";
import {GET_POSTS, POST_ERROR, UPDATE_LIKES} from "../types";

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

// Add like
export const addLike = (postId: string) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: {postId, likes: res.data},
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: (err as CustomError).response.statusText, status: (err as CustomError).response.status},
    });
  }
};

// Remove like
export const removeLike = (postId: string) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: {postId, likes: res.data},
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: (err as CustomError).response.statusText, status: (err as CustomError).response.status},
    });
  }
};
