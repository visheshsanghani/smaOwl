import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import LoginReducer from "./login-reducer";
import RegisterReducer from "./register-reducer";


const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  login: LoginReducer,
  register: RegisterReducer,
});

export default persistReducer(persistConfig, rootReducer);
