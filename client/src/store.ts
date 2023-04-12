import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import localStorage from "redux-persist/es/storage";

import searchReducer from "@app/stores/search.store";
import listingsReducer from "@app/stores/listings.store";

const reducers = combineReducers({
	search: searchReducer,
	listings: listingsReducer,
});

const persistorConfig = {
	key: "root",
	storage: localStorage,
	whitelist: ["listings", "search"],
};

const persistedReducer = persistReducer(persistorConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
