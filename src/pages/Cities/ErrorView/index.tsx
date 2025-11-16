import { OctagonXIcon } from "lucide-react";

const ErrorView: React.FC = () => {
  return (
    <>
      <div className="pt-10 flex flex-col rounded-2xl items-center justify-center border-2 border-solid border-cyan-500 bg-white">
        <OctagonXIcon color="red" size={48} />
        <div className="p-5 grow text-xl text-red-700 ">
          Error has occured while loading the data. Please click Switch API to
          get the data from alternative source.
        </div>
      </div>
    </>
  );
};

export default ErrorView;
