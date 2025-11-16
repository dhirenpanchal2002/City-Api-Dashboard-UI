import { useEffect, useMemo, useState } from "react";
import ApiSourceHeader from "../../components/ApiSourceHeader";
import PageHeader from "../../components/PageHeader";
import ErrorView from "./ErrorView";
import LoadingView from "./LoadingView";
import type { FetchStatus } from "../../Types/FetchStatus";
import SuccessView from "./SuccessView";
import type { City } from "../../Types/City";
import type { ApiSource } from "../../ApiClient/ApiSource";
import { API_CONFIG } from "../../ApiClient/ApiConfig";
import { GetApiInstatnace } from "../../ApiClient/ApiClient";
import Filters from "./Filters";
import type { SortableKey } from "../../Types/SortableKey";

const Cities: React.FC = () => {
  const [currentApiSource, setCurrentApiSource] = useState<ApiSource>("New");
  const [cityData, setCityData] = useState<City[]>([]);
  const [fetchStatus, SetFetchStatus] = useState<FetchStatus>("Success");
  const apiConfig = API_CONFIG[currentApiSource];

  const [cityNameFilter, setCityNameFilter] = useState<string>("");
  const [countryFilter, setCountryFilter] = useState<string>("");

  const [sortConfig, setSortConfig] = useState<{
    key: SortableKey | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    const fetchCityData = async () => {
      SetFetchStatus("Loading");

      const api = GetApiInstatnace(currentApiSource);
      console.log(api);

      await api
        .get<City[]>("/data")
        .then((response) => {
          //setCityData(response.data);
          //console.log(Array.isArray(response.data));
          //console.log(response.data);
          setCityData(response.data);

          setCityNameFilter(""); // Reset filters
          setCountryFilter(""); // Reset filters

          SetFetchStatus("Success");
        })
        .catch((error) => {
          console.error(`Axios Error for ${currentApiSource}:`, error);
          //throw new Error(error.message || `API call failed with status ${error.response?.status}`);
          SetFetchStatus("Error");
        });
    };

    fetchCityData();
  }, [currentApiSource]);

  const filteredData = useMemo(() => {
    if (!cityData || !Array.isArray(cityData)) {
      return null;
    }

    let currentData = [...cityData];

    if (cityNameFilter) {
      currentData = currentData.filter((city) =>
        city.name.toLowerCase().includes(cityNameFilter.toLowerCase())
      );
    }

    if (countryFilter) {
      currentData = currentData.filter((city) =>
        city.country.toLowerCase().includes(countryFilter.toLowerCase())
      );
    }

    return currentData;
  }, [cityData, cityNameFilter, countryFilter]); // Re-calculates when data or filters change

  const sortedData = useMemo(() => {
    if (!filteredData) {
      return null;
    }

    const sortableData = [...filteredData]; // Make a mutable copy

    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        if (sortConfig.key === "lat" || sortConfig.key === "lng") {
          // Numeric comparison
          if (parseFloat(String(aValue)) < parseFloat(String(bValue))) {
            return sortConfig.direction === "asc" ? -1 : 1;
          }
          if (parseFloat(String(aValue)) > parseFloat(String(bValue))) {
            return sortConfig.direction === "asc" ? 1 : -1;
          }
        } else {
          // String (locale) comparison
          if (String(aValue).toLowerCase() < String(bValue).toLowerCase()) {
            return sortConfig.direction === "asc" ? -1 : 1;
          }
          if (String(aValue).toLowerCase() > String(bValue).toLowerCase()) {
            return sortConfig.direction === "asc" ? 1 : -1;
          }
        }
        return 0; // values are equal
      });
    }

    return sortableData;
  }, [filteredData, sortConfig]);

  const toggleSource = () => {
    const newSource = currentApiSource === "Legacy" ? "New" : "Legacy";
    setCurrentApiSource(newSource);
  };

  const handleOnSort = (key: SortableKey) => {
    let direction: "asc" | "desc" = "asc";

    // If clicking the same column, toggle direction
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  const isFilterEnabled =
    fetchStatus === "Success" && cityData && cityData.length > 0;

  return (
    <main className="bg-white p-5 rounded-2xl shadow-xl border-t-4 border-cyan-500">
      <PageHeader>City Data</PageHeader>
      <ApiSourceHeader
        selectedApi={currentApiSource}
        ApirUrl={apiConfig.url}
        sourceChangeHandler={toggleSource}
      ></ApiSourceHeader>
      <Filters
        isEanbled={isFilterEnabled}
        cityFilterValue={cityNameFilter}
        countryFilterValue={countryFilter}
        onCityFilterChange={setCityNameFilter}
        onCountryFilterChange={setCountryFilter}
      ></Filters>
      {fetchStatus === "Error" && <ErrorView />}
      {fetchStatus === "Loading" && <LoadingView />}
      {fetchStatus === "Success" && (
        <SuccessView
          data={sortedData}
          sortConfig={sortConfig}
          onSort={handleOnSort}
        />
      )}
    </main>
  );
};

export default Cities;
