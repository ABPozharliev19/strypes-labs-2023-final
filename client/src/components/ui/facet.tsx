import styled from "styled-components";

import { useSearchParams } from "react-router-dom";

import IFacet from "@app/types/Facet";

const FacetContainer = styled.div`
	display: flex;
  	flex-direction: column;
`;

const Facet = styled.div`
	display: flex;
  	flex-direction: row;
  	justify-content: space-between;
  	gap: 5rem;
  
  	h1 {
	  	font-weight: 500;
	  	
	  	color: #929494;
    }
  
  	&:hover {
	  	cursor: pointer;
    }
`;

export const Facets = ({ facets, setFacets }: { facets?: IFacet, setFacets: (facets: IFacet) => void }): JSX.Element => {
	const [searchParams, setSearchParams] = useSearchParams();

	const setFacet = (type: string, facet: string): void => {
		if (searchParams.get(type) !== null) {
			searchParams.delete(type);
		} else {
			searchParams.set(type, facet);
		}

		setSearchParams(searchParams);
	};

	return (
		<FacetContainer>
			<h1 style={{ marginBottom: "1rem" }}> Vendors </h1>
			{
				facets?.vendors !== undefined && Object.keys(facets?.vendors).map(facet => {
					return (
						<Facet key={1} style={{ display: "flex", flexDirection: "row" }} onClick={() => setFacet("vendor", facet)}>
							<h1 key={1}> {facet} </h1>
							<h1 key={1}> {facets?.vendors !== undefined && facets.vendors[facet]} </h1>
						</Facet>
					);
				})
			}
			<br />
			<h1 style={{ marginBottom: "1rem" }}> Categories </h1>
			{
				facets?.categories !== undefined && Object.keys(facets?.categories).map(facet => {
					return (
						<Facet key={1} style={{ display: "flex", flexDirection: "row" }} onClick={() => setFacet("category", facet)}>
							<h1 key={1}> {facet} </h1>
							<h1 key={1}> {facets?.categories !== undefined && facets.categories[facet]} </h1>
						</Facet>
					);
				})
			}
			<br />
			<h1 style={{ marginBottom: "1rem" }}> Price Ranges </h1>
			{
				facets?.price !== undefined && Object.keys(facets?.price).map(facet => {
					return (
						<Facet key={1} style={{ display: "flex", flexDirection: "row" }}>
							<h1 key={1}> {facet} </h1>
							<h1 key={1}> {facets?.price !== undefined && facets.price[facet]} </h1>
						</Facet>
					);
				})
			}
		</FacetContainer>
	);
};
