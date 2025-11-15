import type { City } from "../../../Types/City";

interface Props {
  data: City[] | null;
}

const SuccessView = ({ data }: Props) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500 bg-white rounded-xl shadow-lg mt-6">
        No city data found for the selected source.
      </div>
    );
  }

  return (
    <div className="mt-2 overflow-x-auto overflow-y-auto max-h-screen shadow-xl rounded-xl">
      <table className="min-w-full divide-y divide-cyan-200">
        <thead className="bg-cyan-600">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
              Country
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
              Latitude (Lat)
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
              Longitude (Lng)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((city, index) => (
            <tr
              key={city.name + index}
              className={
                index % 2 === 0
                  ? "bg-cyan-50"
                  : "bg-white hover:bg-cyan-100 transition duration-150"
              }
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {city.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {city.country}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {city.lat}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {city.lng}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuccessView;
