import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IListing } from "@app/types/Listing";

export interface IListingsState {
	listings: IListing[];
}

const listingsInitialState: IListingsState = {
	listings: [],
};

const listingsSlice = createSlice({
	name: "listings",
	initialState: listingsInitialState,
	reducers: {
		setListings: (state: IListingsState, action: PayloadAction<IListingsState>): void => {
			state.listings = action.payload.listings;
		},
	},
});

const listingsReducer = listingsSlice.reducer;

export const { setListings } = listingsSlice.actions;

export default listingsReducer;
