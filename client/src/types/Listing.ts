
export interface IListing {
	identifier: number;
	name: string;
	url: string;
	price?: number;
	category?: string;
	image: string;
	properties: {
		description: string;
	};
	sourceName: string;
}

export class Listing implements IListing {
	identifier: number;
	name: string;
	url: string;
	price?: number;
	category?: string;
	image: string;
	sourceName: string;
	properties: {
		description: string;
	};

	constructor(listing: IListing) {
		this.identifier = listing.identifier;
		this.name = listing.name;
		this.url = listing.url;
		this.price = listing.price;
		this.category = listing.category;
		this.image = listing.image;
		this.properties = listing.properties;
		this.sourceName = listing.sourceName;
	}

	getDescription(): string {
		return this.properties.description.split(". ").join("\n");
	}
}
