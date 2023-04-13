import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useSearchText, useStoredFacets, useStoredListings } from "@app/stores/reducers";
import { setStoredListings } from "@app/stores/listings.store";

import { IListing } from "@app/types/Listing";
import IFacet from "@app/types/Facet";
import SearchService from "@app/services/search.service";

import { ListingsContainer } from "@app/styles/common.style";
import { SearchContainer } from "@app/styles/search.style";

import { ListingComponent } from "@app/components/ui/listing";
import { Facets } from "@app/components/ui/facet";

export const SearchPage: React.FC = (): JSX.Element => {
	const dispatch = useDispatch();

	const storedListings = useStoredListings();
	const storedFacets = useStoredFacets();

	const storedSearchText = useSearchText();

	const [listings, setListings] = useState<IListing[]>(storedListings);
	const [facets, setFacets] = useState<IFacet | undefined>(storedFacets);

	const [searchParams] = useSearchParams();

	useEffect(() => {
		SearchService.search(storedSearchText, searchParams.get("vendor"), searchParams.get("category"))
			.then(data => {
				setListings(data.results);
				setFacets(data.facets);

				dispatch(setStoredListings(data));
			})
			.catch(console.error);
	}, [storedSearchText, searchParams]);

	return (
		<SearchContainer>
			<Facets facets={facets} setFacets={setFacets} />
			<ListingsContainer>
				{
					listings?.map(listing => {
						return <ListingComponent listing={listing} key={listing.identifier} />;
					})
				}
			</ListingsContainer>
		</SearchContainer>
	);
};
