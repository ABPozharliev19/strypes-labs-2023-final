import { describe, expect, test } from '@jest/globals';
import { Listing } from '@app/types/listing';

describe('Listing', () => {
	test('should return a listing', () => {
		const listing = new Listing({
			identifier: 1,
			name: 'test',
			url: 'http://localhost:8000',
			price: 10,
			category: 'test',
			image: 'test',
			properties: {
				description: 'test',
			},
			sourceName: 'test',
		});

		expect(listing).toBeInstanceOf(Listing);
	});

	test('should return correct image', () => {
		const listing = new Listing({
			identifier: 1,
			name: 'test',
			url: 'http://localhost:8000',
			price: 10,
			category: 'test',
			image: 'test',
			properties: {
				description: 'test',
			},
			sourceName: 'test',
		});

		expect(listing.getImage()).toBe(`http://localhost:8000/listing/image/${listing.identifier}`);
	});

	test('should return correct description', () => {
		const listing = new Listing({
			identifier: 1,
			name: 'test',
			url: 'http://localhost:8000',
			price: 10,
			category: 'test',
			image: 'test',
			properties: {
				description: 'teeest',
			},
			sourceName: 'test',
		});

		expect(listing.getDescription()).toBe('teeest');
	});

	test('should not be undefined', () => {
		const listing = new Listing({
			identifier: 1,
			name: 'test',
			url: 'http://localhost:8000',
			price: 10,
			category: 'test',
			image: 'test',
			properties: {
				description: 'teeest',
			},
			sourceName: 'test',
		});

		expect(listing).not.toBeUndefined();
	});
});

export {};
