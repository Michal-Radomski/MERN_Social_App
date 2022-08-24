import axios from "axios";

import {setAlert} from "./alert";
import {ADD_COMMENT, ADD_POST, DELETE_POST, GET_POST, GET_POSTS, POST_ERROR, REMOVE_COMMENT, UPDATE_LIKES} from "../types";

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

// Delete post
export const deletePost = (postId: string) => async (dispatch: Dispatch) => {
  try {
    await axios.delete(`/api/posts/${postId}`);

    dispatch({
      type: DELETE_POST,
      payload: postId,
    });

    dispatch(setAlert("Post Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: (err as CustomError).response.statusText, status: (err as CustomError).response.status},
    });
  }
};

// Add post
export const addPost = (formData: FormData) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.post("/api/posts", formData);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: (err as CustomError).response.statusText, status: (err as CustomError).response.status},
    });
  }
};

// Get post by postId
export const getPost = (postId: string) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);
    // console.log({postId});

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: (err as CustomError).response.statusText, status: (err as CustomError).response.status},
    });
  }
};

// Add comment
export const addComment = (postId: string, formData: FormData) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: (err as CustomError).response.statusText, status: (err as CustomError).response.status},
    });
  }
};

// Delete comment
export const deleteComment = (postId: string, commentId: string) => async (dispatch: Dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {msg: (err as CustomError).response.statusText, status: (err as CustomError).response.status},
    });
  }
};
