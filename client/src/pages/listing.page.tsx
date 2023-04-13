import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ListingContainer, NameContainer, OtherListingsContainer, TextContainer } from "@app/styles/listing.style";
import { ListingsContainer, StyledLink } from "@app/styles/common.style";

import { ListingComponent } from "@app/components/ui/listing";

import ListingService from "@app/services/listing.service";

import { IListing } from "@app/types/Listing";

export const ProductPage: React.FC = (): JSX.Element => {
	const { id } = useParams();

	const [listing, setListing] = useState<IListing>();
	const [similarListings, setSimilarListings] = useState<IListing[]>();
	const [bonuslistings, setBonusListings] = useState<IListing[]>();

	useEffect(() => {
		ListingService.get(id)
			.then(data => {
				setListing(data.results);
			})
			.catch(console.error);
	}, [id]);

	useEffect(() => {
		if (listing === undefined) {
			return;
		}

		ListingService.similar(listing.name)
			.then(data => {
				setSimilarListings(data.results);
			})
			.catch(console.error);

		ListingService.bonus(listing.category ?? "raspberry-pi")
			.then(data => {
				setBonusListings(data.results);
			})
			.catch(console.error);
	}, [listing]);

	return (
		<>
			<ListingContainer>
				<img src={listing?.image} />
				<TextContainer>
					<NameContainer>
						<StyledLink to={listing?.url}>
							<h1> {listing?.name} </h1>
						</StyledLink>
						<h3> {((listing?.category) != null) ? listing.category.toUpperCase() : "No category"} </h3>
					</NameContainer>
					<p> {listing?.properties.description} </p>
					<h2> Цена: {listing?.price?.toFixed(2)} лв.</h2>
				</TextContainer>
			</ListingContainer>

			<OtherListingsContainer>
				<ListingsContainer>
					<h1> Similar listings </h1>
					{
						similarListings?.slice(1, 6).map(listing => {
							return <ListingComponent key={listing.identifier} listing={listing} />;
						})
					}
				</ListingsContainer>

				<ListingsContainer>
					<h1> Bonus listings that go well </h1>
					{
						bonuslistings?.slice(1, 6).map(listing => {
							return <ListingComponent key={listing.identifier} listing={listing} />;
						})
					}
				</ListingsContainer>
			</OtherListingsContainer>
		</>
	);
};
