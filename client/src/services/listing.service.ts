import Http from "@app/request";
import { IListing } from "@app/types/Listing";

export interface IListingResponse {
	results: IListing;
}

export interface IListingsResponse {
	results: IListing[];
}

export default class ListingService {
	static async get(id?: string): Promise<IListingResponse> {
		return await Http.get(`@api/listing/${id !== undefined ? id : 0}`).then(data => data as unknown as IListingResponse);
	}

	static async similar(name: string): Promise<IListingsResponse> {
		return await Http.get(`@api/listing/similar/${name}`).then(data => data as unknown as IListingsResponse);
	}

	static async bonus(category: string): Promise<IListingsResponse> {
		return await Http.get(`@api/listing/bonus/${category}`).then(data => data as unknown as IListingsResponse);
	}
}
