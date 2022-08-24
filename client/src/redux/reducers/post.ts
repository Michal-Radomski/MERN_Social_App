import {ADD_POST, DELETE_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES} from "../types";

const initialState: State = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

const postReducer = (state = initialState, action: Dispatch) => {
  const {type, payload} = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post: {_id: string}) => (post._id === payload.id ? {...post, likes: payload.likes} : post)),
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post: {_id: string}) => post._id !== payload),
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };

    default:
      return state;
  }
};

export default postReducer;
