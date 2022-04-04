import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import usersReducer from "../slices/users";
const rootReducer = combineReducers({ user: usersReducer });

export default rootReducer;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
let composeEnhancers = compose;
if (typeof window !== "undefined") {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const composedEnhancers = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, composedEnhancers);

export { store };
