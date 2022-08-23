import axios from "axios";
import {History} from "history";

import {setAlert} from "./alert";
import {
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  NO_REPOS,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from "../types";

//* Default headers in axios are already included: Content-Type: application/json; Also axios stringifies and parses JSON !!!

// Get current users profile
export const getCurrentProfile = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    await dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    await dispatch({type: CLEAR_PROFILE});
    await dispatch({
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

// Add Experience
export const addExperience = (formData: FormData, history: History) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.put("/api/profile/experience", formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience Added", "success"));
    history.push("/dashboard");
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

// Add Education
export const addEducation = (formData: FormData, history: History) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.put("/api/profile/education", formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education Added", "success"));
    history.push("/dashboard");
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

// Delete experience
export const deleteExperience = (id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: (err as CustomError).response.statusText, status: (err as CustomError).response.status},
    });
  }
};

// Delete education
export const deleteEducation = (id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: (err as CustomError).response.statusText, status: (err as CustomError).response.status},
    });
  }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch: Dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await axios.delete("/api/profile");

      dispatch({type: CLEAR_PROFILE});
      dispatch({type: ACCOUNT_DELETED});

      dispatch(setAlert("Your account has been permanently deleted", "danger"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {msg: (err as CustomError).response.statusText, status: (err as CustomError).response.status},
      });
    }
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch: Dispatch) => {
  dispatch({type: CLEAR_PROFILE});

  try {
    const res = await axios.get("/api/profile");

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: (err as CustomError).response.statusText, status: (err as CustomError).response.status},
    });
  }
};

// Get profile by ID
export const getProfileById = (userId: string) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

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

// Get Github repos
export const getGithubRepos = (username: string) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NO_REPOS,
    });
  }
};
