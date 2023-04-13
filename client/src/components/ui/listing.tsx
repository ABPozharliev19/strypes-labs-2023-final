import styled from "styled-components";

import { Listing, IListing } from "@app/types/Listing";
import { StyledLink } from "@app/styles/common.style";

const ListingContainer = styled.div`
  	display: flex;
  	flex-direction: row;
  
  	gap: 1rem;
  
	background-color: #eff3f4;
  	width: 900px;
  	height: 300px;
  
  	padding: 1rem;
  
  	border-radius: 2rem;
`;

const TextContainer = styled.div`
  	display: flex;
  	flex-direction: column;
  	justify-content: center;
  
  	gap: 1rem;
  
	width: 55%;

  	h1 {
	  	font-size: 1.75rem;
	  	text-align: left;
    }
  	
  	p {
	  	font-weight: 450;
    }
`;

const PriceContainer = styled.div`
	display: flex;
  	justify-content: center;
  	align-items: center;
  	flex-direction: column;
  
  	gap: 2rem;
  
  	h2, h3 {
	  	text-align: center;
    }
  
  	button {
	  	border-radius: .75rem;
	  	padding: 0.20rem 0;
	  	background-color: #f0cfc3;
	  	font-weight: 600;
	  	font-size: 22px;
    }
`;

export const ListingComponent = ({ listing }: { listing: IListing }): JSX.Element => {
	const listingExtended = new Listing(listing);

	return (
		<ListingContainer>
			<StyledLink to={`/listing/${listingExtended.identifier}`}>
				<img src={listingExtended.getImage()} style={{ height: "300px" }} />
			</StyledLink>
			<TextContainer>
				<h1> {listingExtended.name} </h1>
				<p> {listingExtended.getDescription()} </p>
			</TextContainer>
			<PriceContainer>
				<h2> {listingExtended.price?.toFixed(2)} лв. </h2>
				<button> Сравни цените </button>
			</PriceContainer>
		</ListingContainer>
	);
};
