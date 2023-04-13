import styled from "styled-components";
import { MEDIUM, SMALL, X_LARGE, XX_LARGE } from "@app/const";

export const SearchBarIcon = styled.i`
	height: auto;
	position: absolute;
	left: 63%;

	@media (max-width: ${MEDIUM}px) {
		left: 60%;
	}

	@media (min-width: ${X_LARGE}px) {
		left: 64%;
	}

	@media (min-width: ${XX_LARGE}px) {
		left: 65%;
	}

	@media (max-width: ${SMALL}px) {
		left: 64%;
	}
`;

export const SearchBar = styled.input`
	border: 1px solid #231f20;
	border-radius: 5.283rem;

	padding-left: 1.5rem;
  	margin-top: 2rem;
  

	width: 35vw;
	height: 44px;

	@media (max-width: ${SMALL}px) {
		width: 47vw;
		padding-left: 0.75rem;
	}
`;

export const NavSearchBar = ({ children }: { children?: JSX.Element[] }): JSX.Element => {
	return (
		<>
			<SearchBar type="text" placeholder="Case, memory card..." />
		</>
	);
};
