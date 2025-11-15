import type { ApiSource } from "../ApiClient/ApiSource";

interface Props {
  selectedApi: ApiSource;
  ApirUrl: string;
  sourceChangeHandler: () => void;
}

const ApiSourceHeader = ({
  selectedApi,
  ApirUrl,
  sourceChangeHandler,
}: Props) => {
  return (
    <div className="mt-2 bg-white p-5 w-full border-cyan-200 border-2 rounded-xl">
      <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="text-lg font-medium">
          Data Source:
          <span
            className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold 
                ${
                  selectedApi === "Legacy"
                    ? "bg-amber-100 text-amber-800 border border-amber-300"
                    : "bg-green-100 text-green-800 border border-green-300"
                }`}
          >
            {selectedApi}
          </span>
        </div>

        <button
          onClick={sourceChangeHandler}
          className="mt-3 sm:mt-0 px-4 py-2 bg-cyan-500 text-white font-medium rounded-lg shadow-md hover:bg-cyan-600 transition duration-150 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        >
          Switch to {selectedApi === "Legacy" ? "New API" : "Legacy API"}
        </button>
      </div>
      <p className="mt-2 text-sm text-gray-500 italic">
        Fetching from:{" "}
        <span className="font-mono text-xs text-gray-700">{ApirUrl}</span>
      </p>
    </div>
  );
};

export default ApiSourceHeader;
