const LoadingView: React.FC = () => {
  return (
    <>
      <div className="flex flex-col rounded-2xl items-center justify-center border-2 border-solid border-cyan-500 bg-white ">
        <div className="pt-10 pb-10 animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-700"></div>
        <div className="text-center p-8 text-gray-500 text-xl mt-6">
          Loading city data... Please wait.
        </div>
      </div>
    </>
  );
};

export default LoadingView;
