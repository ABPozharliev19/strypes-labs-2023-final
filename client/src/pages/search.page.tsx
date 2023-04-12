import { useEffect, useState } from "react";
import { IListing } from "@app/types/Listing";
import { useSearchText, useStoredListings } from "@app/stores/reducers";
import SearchService from "@app/services/search.service";
import { ListingComponent } from "@app/components/ui/listing";
import { ListingsContainer } from "@app/styles/common.style";

export const SearchPage: React.FC = (): JSX.Element => {
	const storedListings = useStoredListings();
	const storedSearchText = useSearchText();

	const [listings, setListings] = useState<IListing[]>(storedListings);

	useEffect(() => {
		SearchService.search(storedSearchText)
			.then(data => {
				setListings(data.results);
			})
			.catch(console.error);
	}, [storedSearchText]);

	return (
		<ListingsContainer>
			{
				listings?.map(listing => {
					return <ListingComponent listing={listing} key={listing.identifier} />;
				})
			}
		</ListingsContainer>
	);
};
