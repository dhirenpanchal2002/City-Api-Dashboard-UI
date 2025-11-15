import { OctagonXIcon } from "lucide-react";

const ErrorView = () => {
  return (
    <>
      <div className="flex flex-col rounded-2xl items-center justify-center border-2 border-solid border-red-700">
        <OctagonXIcon color="red" size={96} />;
        <div className="grow text-xl text-red-700 ">
          Error has occured while loading the data. Please click Reload to
          reload the page.
        </div>
      </div>
    </>
  );
};

export default ErrorView;
