
export default interface IFacet {
	categories?: {
		[name: string]: number;
	};
	vendors?: {
		[name: string]: number;
	};
	price?: {
		[name: string]: number;
	};
}