import {GET_PROFILE, PROFILE_ERROR} from "../types";

const initialState: State = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

const profileReducer = (state = initialState, action: Dispatch) => {
  const {type, payload} = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };

    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    default:
      return state;
  }
};

export default profileReducer;
