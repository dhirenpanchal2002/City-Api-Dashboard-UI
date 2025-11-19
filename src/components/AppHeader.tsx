import { Cloud } from "lucide-react";

const AppHeader: React.FC = () => {
  return (
    <header className="bg-white p-4 rounded-2xl shadow-xl border-t-4 border-cyan-500">
      <h1 className="p-2 text-4xl font-bold text-gray-900 flex items-center">
        <Cloud className="h-8 w-8 text-cyan-500 mr-2" />
        API Data Dashboard
      </h1>
      <p className="mt-1 ml-12 text-sm text-gray-500">
        Displaying data from different API sources.
      </p>
    </header>
  );
};

export default AppHeader;
