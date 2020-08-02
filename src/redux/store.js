import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas";
import logger from "redux-logger";

import {
  screems_loading,
  screems_list,
  screems_fail,
} from "../redux/reducers/screems_reducers";
import { login } from "../redux/reducers/login_reducer";
import { register } from "../redux/reducers/registration_reducer";

const combinedReducers = combineReducers({
  screems_loading,
  screems_list,
  screems_fail,
  login,
  register,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combinedReducers,
  compose(
    applyMiddleware(logger, sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

sagaMiddleware.run(rootSaga);
export default store;
