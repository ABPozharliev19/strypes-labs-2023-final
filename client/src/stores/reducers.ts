import { useSelector } from "react-redux";

import { RootState } from "@app/store";
import { IListing } from "@app/types/Listing";
import IFacet from "@app/types/Facet";

export const useSearchText = (): string => {
	return useSelector((state: RootState) => {
		return state.search.searchText;
	});
};

export const useStoredListings = (): IListing[] => {
	return useSelector((state: RootState) => {
		return state.listings.listings;
	});
};

export const useStoredFacets = (): IFacet | undefined => {
	return useSelector((state: RootState) => {
		return state.listings.facets;
	});
};
