import { Suspense } from "react";
import { useEffect, useState } from "react";
import ApiSourceHeader from "../../components/ApiSourceHeader";
import PageHeader from "../../components/PageHeader";
import ErrorView from "./ErrorView";
import LoadingView from "./LoadingView";
import type { FetchStatus } from "../../Types/FetchStatus";
import type { City } from "../../Types/City";
import type { ApiSource } from "../../ApiClient/ApiSource";
import { API_CONFIG } from "../../ApiClient/ApiConfig";
import { GetApiInstatnace } from "../../ApiClient/ApiClient";
import Filters from "./Filters";
import { useSortAndFilter } from "../../hooks/useSortAndFilter";
import React from "react";
import { useSearchParams } from "react-router";

// Implement Lazy Loding with React.Lazy method
const LazySuccessView = React.lazy(() => import("./SuccessView"));

const Cities: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentApiSource = (searchParams.get('source') as ApiSource) || 'Legacy';
  
  const [cityData, setCityData] = useState<City[]>([]);
  const [fetchStatus, SetFetchStatus] = useState<FetchStatus>("Success");
  const apiConfig = API_CONFIG[currentApiSource];

  const {
    sortedData,
    cityNameFilter,
    setCityNameFilter,
    countryFilter,
    setCountryFilter,
    sortConfig,
    handleOnSort,
  } = useSortAndFilter(cityData);

  useEffect(() => {
    let isOpeerationActive = true;

    const fetchCityData = async () => {
      SetFetchStatus("Loading");

      const api = GetApiInstatnace(currentApiSource);
      //console.log(api);
      await api
        .get<City[]>("/data")
        .then((response) => {          
                if(isOpeerationActive)
                {
                  setCityData(response.data);
                  setCityNameFilter(""); // Reset filters
                  setCountryFilter(""); // Reset filters
                  SetFetchStatus("Success");
                }
              })
        .catch(() => {
          //console.error(`Axios Error for ${currentApiSource}:`, error);
          SetFetchStatus("Error");
        });
    };

    fetchCityData();
    
    return () => {
       isOpeerationActive = false;
    }

  }, [currentApiSource]);



  // Helper to switch sources (updates URL)
  const switchSource = () => {
    setSearchParams((prev) => {
      const toggleSource: ApiSource = currentApiSource === 'Legacy' ? 'New' : 'Legacy';
      const newParams = new URLSearchParams(prev);
      newParams.set('source', toggleSource);
      return newParams;
    });
  };

  const isFilterEnabled =
    fetchStatus === "Success" && cityData && cityData.length > 0;

  return (
    <main className="bg-white p-5 rounded-2xl shadow-xl border-t-4 border-cyan-500">
      <PageHeader>City Data</PageHeader>
      <ApiSourceHeader
        selectedApi={currentApiSource}
        ApirUrl={apiConfig.url}
        sourceChangeHandler={switchSource}
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
        <Suspense
          fallback={
            <div className="text-center py-8 text-sm text-gray-500">
              Loading data table...
            </div>
          }
        >
          {
            <LazySuccessView
              data={sortedData}
              sortConfig={sortConfig}
              onSort={handleOnSort}
            />
          }
        </Suspense>
      )}
    </main>
  );
};

export default Cities;
