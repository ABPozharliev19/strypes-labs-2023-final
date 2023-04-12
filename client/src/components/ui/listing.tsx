import styled from "styled-components";

import { Listing, IListing } from "@app/types/Listing";

const ListingContainer = styled.div`
  	display: flex;
  	flex-direction: row;
  
	background-color: #eff3f4;
  	width: 1000px;
  	height: 200px;
`;

const TextContainer = styled.div`
  	display: flex;
  	flex-direction: column;
  	align-items: center;
  
	width: 60%;

  	h1 {
	  	margin: 0;
    }
`;

const PriceContainer = styled.div`
	display: flex;
  	justify-content: center;
  	align-items: center;
  	flex-direction: column;
`;

export const ListingComponent = ({ listing }: { listing: IListing }): JSX.Element => {
	const listingExtended = new Listing(listing);

	return (
		<ListingContainer>
			<img src={listingExtended.image} style={{ height: "200px" }} />
			<TextContainer>
				<h1> {listingExtended.name} </h1>
				<p> {listingExtended.getDescription()} </p>
			</TextContainer>
			<PriceContainer>
				<h2> {listingExtended.price} </h2>
				<h3> Сравни цените </h3>
			</PriceContainer>
		</ListingContainer>
	);
};
