interface Props {
  children?: React.ReactNode;
}

const PageHeader = ({ children }: Props) => {
  return (
    <div className="p-5 w-full border-cyan-200 border-2 rounded-xl bg-white">
      <div className="flex h-7 items-center justify-start text-2xl font-semibold">
        {children}
      </div>
    </div>
  );
};

export default PageHeader;
