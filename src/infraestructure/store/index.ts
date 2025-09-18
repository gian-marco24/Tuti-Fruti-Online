import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // solo persistimos auth
};

const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
  },
  middleware: (getDefault) => getDefault({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export { store };
