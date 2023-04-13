import styled from "styled-components";

export const ListingContainer = styled.div`
	display: flex;
  	justify-content: center;
	align-items: center;
  	flex-direction: row;
  	gap: 2rem;
  
  	width: 100%;
  	height: 800px;
  
  	img {
	  	height: 800px;
    }
`;

export const TextContainer = styled.div`
	display: flex;
  	flex-direction: column;
  	gap: 2rem;
  
  	p {
	  	font-size: 16px;
	  	font-weight: 600;
		max-width: 1000px;
	}
  
  	h2 {
	  	font-size: 32px;
    }
`;

export const NameContainer = styled.div`
	display: flex;
	flex-direction: column;
  	align-items: flex-start;
  	gap: 2rem;
  
  	h1 {
	  	max-width: 1000px;
    }
  
  	h3 {
	  	font-size: 30px;
    }
`;

export const OtherListingsContainer = styled.div`
	display: flex;
	flex-direction: row;
  	justify-content: center;
  	gap: 5rem;
  
`;
