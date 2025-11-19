
import type { City } from "../Types/City";
import { useMemo, useState } from "react";
import type { SortableKey } from "../Types/SortableKey";
import type { SortConfig } from "../Types/SortConfig";

type IndexableCity = City & Record<SortableKey, string | number>;

/*
 * Custom hook to handle filtering (by city name and country) and sorting logic
 * for an array of City data.
 */
export const useSortAndFilter = (data: City[]) => {

  // Filter & sort States
  const [cityNameFilter, setCityNameFilter] = useState<string>("");
  const [countryFilter, setCountryFilter] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({ 
    key: null, 
    direction: "asc" 
  });

  //Filtering Logic
  const filteredData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    let currentData = [...data];
    const cityFilter = cityNameFilter.trim().toLowerCase();
    const countryFilterLower = countryFilter.trim().toLowerCase();

    if (cityFilter) {
      currentData = currentData.filter((city) =>
        city.name.toLowerCase().includes(cityFilter)
      );
    }

    if (countryFilterLower) {
      currentData = currentData.filter((city) =>
        city.country.toLowerCase().includes(countryFilterLower)
      );
    }

    return currentData;
  }, [data, cityNameFilter, countryFilter]);

  //Sorting Logic 
  const sortedData = useMemo(() => {
    const sortableData = [...filteredData]; 

    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        // Fix: Assert objects to the IndexableCity type to allow dynamic property access
        const aIndexable = a as IndexableCity;
        const bIndexable = b as IndexableCity;
        const key = sortConfig.key!; // Key is guaranteed non-null here

        const aValue = aIndexable[key]; 
        const bValue = bIndexable[key]; 

        let comparison = 0;

        if (key === "lat" || key === "lng") {
          // Numeric comparison
          const aNum = parseFloat(String(aValue));
          const bNum = parseFloat(String(bValue));
          if (aNum < bNum) comparison = -1;
          if (aNum > bNum) comparison = 1;
        } else {
          // String (locale) comparison
          comparison = String(aValue).toLowerCase().localeCompare(String(bValue).toLowerCase());
        }

        return sortConfig.direction === "asc" ? comparison : -comparison;
      });
    }

    return sortableData;
  }, [filteredData, sortConfig]);


  //Sorting Handler
  const handleOnSort = (key: SortableKey) => {
    let direction: "asc" | "desc" = "asc";

    // If clicking the same column, toggle direction
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  // returns all the state and processed data 
  return {
    sortedData,
    cityNameFilter,
    setCityNameFilter,
    countryFilter,
    setCountryFilter,
    sortConfig,
    handleOnSort
  };
};