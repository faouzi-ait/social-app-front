import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootSaga } from "./sagas";
import logger from "redux-logger";

import {
  screems_list,
  screems_details,
  screems_loading,
  screems_details_loading,
} from "../redux/reducers/screems_reducers";
import { login } from "../redux/reducers/login_reducer";
import { register } from "../redux/reducers/registration_reducer";
import {
  user_profile,
  loading_profile,
} from "../redux/reducers/profile_reducer";
import { uploading_picture } from "../redux/reducers/uploading_reducer";
import { profile_update } from "../redux/reducers/update_reducer";
import { like_screems } from "../redux/reducers/like_reducers";
import { token_reducer } from "../redux/reducers/token_reducer";

const combinedReducers = combineReducers({
  screems_loading,
  screems_list,
  screems_details,
  screems_details_loading,
  login,
  register,
  user_profile,
  loading_profile,
  uploading_picture,
  profile_update,
  like_screems,
  token_reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["login", "register", "screems_details"],
};

export const persistedReducer = persistReducer(persistConfig, combinedReducers);
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(logger, sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);


export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);
