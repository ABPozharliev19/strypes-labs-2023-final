import Http from "@app/request";

export interface ISearchRequest {
	searchText?: string;
}

// export interface ICartResponse {
// 	totals: ICartTotals;
// 	items: { [key: number]: ICartItem };
// 	stores: IComponentStore[];
// }

export default class CartService {
	static async get(): Promise<ICartResponse> {
		return await Http.get("@api/cart").then(data => data as unknown as ICartResponse);
	}

	static async addItem(itemId: number, quantity = 1): Promise<ICartResponse> {
		return await Http.put(`@api/cart/item/${itemId}`, { quantity }).then(data => data as unknown as ICartResponse);
	}

	static async updateItem(itemId: number, quantity: number): Promise<ICartResponse> {
		return await Http.patch(`@api/cart/item/${itemId}`, { quantity }).then(data => data as unknown as ICartResponse);
	}

	static async removeItem(itemId: number): Promise<ICartResponse> {
		return await Http.delete(`@api/cart/item/${itemId}`).then(data => data as unknown as ICartResponse);
	}
}
