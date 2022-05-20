const redux = require("redux");
const reduxLogger = require("redux-logger");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applymiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

function buy_cake() {
  return {
    type: BUY_CAKE,
    info: "First redux action",
  };
}
function buy_icecream() {
  return {
    type: BUY_ICECREAM,
    info: "Second redux action",
  };
}

/* const initialState = {
  numberOfCakes: 10,
  numberOfIcecream: 20,
}; */
const initialCakeState = {
  numberOfCakes: 10,
};
const initialIceCreamState = {
  numberOfIcecream: 20,
};

/* const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };
    case BUY_ICECREAM:
      return {
        ...state,
        numberOfIcecream: state.numberOfIcecream - 1,
      };

    default:
      return state;
  }
}; */
const cakereducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };

    default:
      return state;
  }
};
const icecreamreducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numberOfIcecream: state.numberOfIcecream - 1,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakereducer,
  icecream: icecreamreducer,
});
const store = createStore(rootReducer, applymiddleware(logger));
console.log("Initial State", store.getState());
// const unSubscribe = store.subscribe(() => console.log("Updated State", store.getState()));
store.dispatch(buy_cake());
store.dispatch(buy_cake());
store.dispatch(buy_cake());
store.dispatch(buy_icecream());
store.dispatch(buy_icecream());
store.dispatch(buy_icecream());
// unSubscribe();
