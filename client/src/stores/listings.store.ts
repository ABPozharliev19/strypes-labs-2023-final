import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IListing } from "@app/types/Listing";
import IFacet from "@app/types/Facet";
import { ISearchResponse } from "@app/services/search.service";

export interface IListingsState {
	listings: IListing[];
	facets?: IFacet;
}

const listingsInitialState: IListingsState = {
	listings: [],
	facets: undefined,
};

const listingsSlice = createSlice({
	name: "listings",
	initialState: listingsInitialState,
	reducers: {
		setStoredListings: (state: IListingsState, action: PayloadAction<ISearchResponse>): void => {
			state.listings = action.payload.results;
			state.facets = action.payload.facets;
		},

	},
});

const listingsReducer = listingsSlice.reducer;

export const { setStoredListings } = listingsSlice.actions;

export default listingsReducer;
