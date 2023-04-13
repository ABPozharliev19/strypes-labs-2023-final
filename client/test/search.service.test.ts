import { describe, expect, test } from '@jest/globals';
import SearchService from "@app/services/search.service";

describe('SearchService', () => {
	test('should return a listing', async () => {
		const listing = await SearchService.get();

		expect(listing.results.length).toBeGreaterThan(0);
	});

	test('should return a listing', async () => {
		const listing = await SearchService.search('raspberry pi');

		expect(listing.results.length).toBeGreaterThan(0);
	});

	test('should return a listing', async () => {
		const listing = await SearchService.search('raspberry pi', 'erelement');

		expect(listing.results.length).toBeGreaterThan(0);
	});

	test('should return a listing', async () => {
		const listing = await SearchService.search('raspberry pi', 'erelement', 'raspberry-pi');


		expect(listing.results.length).toBeGreaterThan(0);
	});

	test('should return a listing', async () => {
		const listing = await SearchService.search('raspberry pi', undefined, 'raspberry-pi');

		expect(listing.results.length).toBeGreaterThan(0);
	});
});