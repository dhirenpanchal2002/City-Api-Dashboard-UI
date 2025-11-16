import { OctagonXIcon } from "lucide-react";

const ErrorView: React.FC = () => {
  return (
    <>
      <div className="mt-2 flex flex-col rounded-2xl items-center justify-center border-2 border-solid border-cyan-500 bg-white p-10">
        <OctagonXIcon color="red" size={48} />
        <div className="text-center p-4 text-red-500 text-xl mt-6">
          An error occurred while loading the data. Please click 'Switch API' to
          retrieve the data from an alternative source
        </div>
      </div>
    </>
  );
};

export default ErrorView;
