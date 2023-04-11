import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISearchState {
	searchText?: string;
}

const searchInitialState: ISearchState = {
	searchText: undefined,
};

const cartSlice = createSlice({
	name: "search",
	initialState: searchInitialState,
	reducers: {
		setSearchText: (state: ISearchState, action: PayloadAction<string>): void => {
			state.searchText = action.payload;
		},
	},
});

const searchReducer = cartSlice.reducer;

export const { setSearchText } = cartSlice.actions;

export default searchReducer;
