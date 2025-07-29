import {
  combineReducers,
  configureStore,
  UnknownAction,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { api } from "./features/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userReducer, { userTypes } from "./features/slices/userSlice";
import { CombinedState, setupListeners } from "@reduxjs/toolkit/query";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whiteList: ["user"],
};

// Root reducer
const appReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  user: userReducer,
});

// Custom root reducer to clear state on logout
const rootReducer = (
  state:
    | Partial<{
        api:
          | CombinedState<
              {},
              | "User"
              | "Membership"
              | "Organization"
              | "Subscription"
              | "Event"
              | "id",
              "api"
            >
          | undefined;
        user: userTypes | undefined;
      }>
    | undefined,
  action: UnknownAction,
) => {
  if (action.type === "user/setLogout") {
    // Clear the persisted state
    state = undefined;
  }
  return appReducer(state, action);
};

//We are persisting only userSlice
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(api.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
