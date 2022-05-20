const redux = require("redux");
const axios = require("axios");
const thunkMiddle = require("redux-thunk").default;
const createStore = redux.createStore;
const applymiddleware = redux.applyMiddleware;

const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

const fetch_user_request = () => {
  return {
    type: FETCH_USER_REQUEST,
    // loading: true,
  };
};

const fetch_user_success = (users) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: users,
  };
};

const fetch_user_failure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USER_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetch_user_request());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data.map((user) => user.id);
        dispatch(fetch_user_success(users));
      })
      .catch((error) => {
        dispatch(fetch_user_failure(error.message));
      });
  };
};

const store = createStore(reducer, applymiddleware(thunkMiddle));
console.log("Initial State", store.getState());
store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUsers());

// unSubscribe();
