import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
	display: flex;
  	justify-content: center;
`;

export const ListingsContainer = styled(Container)`
	align-items: center;
  	flex-direction: column;
  
  	gap: 1rem;
  
  	h1 {
	  	margin-bottom: 1rem;
    }
`;

export const StyledLink = styled(Link)`
	text-decoration: none;
	color: inherit;
`;
