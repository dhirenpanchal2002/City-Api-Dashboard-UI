interface Props {
  isEanbled: boolean;
  cityFilterValue: string;
  countryFilterValue: string;
  onCityFilterChange: (value: string) => void;
  onCountryFilterChange: (value: string) => void;
}
const Filters: React.FC<Props> = ({
  isEanbled,
  cityFilterValue,
  countryFilterValue,
  onCityFilterChange,
  onCountryFilterChange,
}) => {
  return (
    <div className="mt-2 bg-white p-5 w-full border-cyan-500 border-2 rounded-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-0">
        <div>
          <label
            htmlFor="cityFilter"
            className="block text-sm font-medium text-gray-700"
          >
            Filter by City
          </label>
          <input
            type="text"
            id="cityFilter"
            value={cityFilterValue}
            onChange={(e) => onCityFilterChange(e.target.value)}
            disabled={!isEanbled}
            className="mt-1 block w-full px-3 py-2 border border-cyan-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
            placeholder="e.g., Dubai"
          />
        </div>
        <div>
          <label
            htmlFor="countryFilter"
            className="block text-sm font-medium text-gray-700"
          >
            Filter by Country
          </label>
          <input
            type="text"
            id="countryFilter"
            value={countryFilterValue}
            onChange={(e) => onCountryFilterChange(e.target.value)}
            disabled={!isEanbled}
            className="mt-1 block w-full px-3 py-2 border border-cyan-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
            placeholder="e.g., AE"
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
