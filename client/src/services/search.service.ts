import Http from "@app/request";
import IListing from "@app/types/Listing";
import IFacet from "@app/types/Facet";

export interface ISearchRequest {
	searchText?: string;
	facets: IFacet;
}

export interface ISearchResponse {
	results: IListing[];
	facets: IFacet;
}

export default class SearchService {
	static async get(): Promise<ISearchResponse> {
		return await Http.get("@api/listing/").then(data => data as unknown as ISearchResponse);
	}

	static async search(text: string, facets?: IFacet): Promise<ISearchResponse> {
		return await Http.post("@api/listing", {
			searchText: text,
			vendor: facets?.vendors != null ? [facets.vendors] : [],
			category: facets?.categories != null ? [facets.categories] : [],
		}).then(data => data as unknown as ISearchResponse);
	}
}
