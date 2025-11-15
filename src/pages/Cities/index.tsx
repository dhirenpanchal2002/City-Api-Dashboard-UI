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

const Cities = () => {
  const [currentApiSource, setCurrentApiSource] = useState<ApiSource>("New");
  const [cityData, setCityData] = useState<City[]>([]);
  const [fetchStatus, SetFetchStatus] = useState<FetchStatus>("Success");
  const apiConfig = API_CONFIG[currentApiSource];

  const [cityNameFilter, setCityNameFilter] = useState<string>("");
  const [countryFilter, setCountryFilter] = useState<string>("");

  useEffect(() => {
    const fetchCityData = async () => {
      SetFetchStatus("Loading");

      const api = GetApiInstatnace(currentApiSource);
      console.log(api);

      await api
        .get<City[]>("")
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

  const toggleSource = () => {
    const newSource = currentApiSource === "Legacy" ? "New" : "Legacy";
    setCurrentApiSource(newSource);
  };

  return (
    <main className="p-1 shadow-xl gap-10 min-h-full border-2 border-solid rounded-2xl border-cyan-500">
      <PageHeader>City Data</PageHeader>
      <ApiSourceHeader
        selectedApi={currentApiSource}
        ApirUrl={apiConfig.url}
        sourceChangeHandler={toggleSource}
      ></ApiSourceHeader>
      <Filters
        viewStatus={fetchStatus}
        cityFilterValue={cityNameFilter}
        countryFilterValue={countryFilter}
        onCityFilterChange={setCityNameFilter}
        onCountryFilterChange={setCountryFilter}
      ></Filters>
      {fetchStatus === "Error" && <ErrorView />}
      {fetchStatus === "Loading" && <LoadingView />}
      {fetchStatus === "Success" && <SuccessView data={filteredData} />}
    </main>
  );
};

export default Cities;
