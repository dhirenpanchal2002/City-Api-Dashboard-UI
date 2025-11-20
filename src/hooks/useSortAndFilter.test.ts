import { renderHook, act } from '@testing-library/react';
import { useSortAndFilter } from './useSortAndFilter'; // Adjust path to where your hook is saved

// Define mock data locally to make the test self-contained
const MOCK_DATA = [
    { name: "Dubai", country: "AE", lat: 25.2, lng: 55.2, admin1: "01", admin2: "" },
    { name: "Dublin", country: "IE", lat: 53.3, lng: -6.2, admin1: "L", admin2: "" },
    { name: "Paris", country: "FR", lat: 48.8, lng: 2.3, admin1: "IDF", admin2: "75" },
];

describe('useSortAndFilter Custom Hook', () => {
    test('should correctly filter data and handle sorting', () => {

        // 1. Render the hook with mock data
        const { result } = renderHook(() => useSortAndFilter(MOCK_DATA));

        // Assert Initial State: Should return all data
        expect(result.current.sortedData).toHaveLength(3);

        // 2. Test Filtering: Search for "Du" (Matches Dubai and Dublin)
        act(() => {
            result.current.setCityNameFilter("Du");
        });

        expect(result.current.sortedData).toHaveLength(2);

        // Verify Paris is filtered out
        expect(result.current.sortedData.find(c => c.name === "Paris")).toBeUndefined();

        // 3. Test Sorting: Sort by 'name' (Ascending first)
        act(() => {
            // Assuming 'name' is a valid SortableKey in your types
            result.current.handleOnSort("name");
        });

        // "Dubai" should come before "Dublin" in ASC order
        expect(result.current.sortedData[0].name).toBe("Dubai");
        expect(result.current.sortedData[1].name).toBe("Dublin");

        // 4. Test Sorting Toggle: Click 'name' again for Descending
        act(() => {
            result.current.handleOnSort("name");
        });

        // "Dublin" should come before "Dubai" in DESC order
        expect(result.current.sortedData[0].name).toBe("Dublin");
        expect(result.current.sortedData[1].name).toBe("Dubai");
    });
});