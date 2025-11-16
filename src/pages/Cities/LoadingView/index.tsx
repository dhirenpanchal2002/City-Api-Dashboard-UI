const LoadingView: React.FC = () => {
  return (
    <>
      <div className="flex flex-col rounded-2xl items-center justify-center border-2 border-solid border-cyan-500 bg-white p-10">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-cyan-700" />
        <div className="text-center p-4 text-gray-500 text-xl mt-6">
          Loading city data... Please wait.
        </div>
      </div>
    </>
  );
};

export default LoadingView;
