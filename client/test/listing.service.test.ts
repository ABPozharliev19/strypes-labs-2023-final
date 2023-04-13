import { describe, expect, test } from '@jest/globals';
import ListingService from "../src/services/listing.service";

describe('ListingService', () => {
	test('should not return a listing', async () => {
		const listing = await ListingService.get();

		expect(listing.results.identifier).toBeUndefined();
	});

	test('should return a listing', async () => {
		const listing = await ListingService.get('1');

		expect(listing.results.identifier).not.toBeUndefined();
	});

	test('should return similar listings', async () => {
		const listing = await ListingService.similar('raspberry pi');

		expect(listing.results.length).toBeGreaterThan(0);
	});

	test('should return bonus listings', async () => {
		const listing = await ListingService.bonus('accessories');

		expect(listing.results.length).toBeGreaterThan(0);
	});
});