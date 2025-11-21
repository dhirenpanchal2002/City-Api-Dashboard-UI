import React from "react";

interface Props {
  children?: React.ReactNode;
}

const PageHeader: React.FC<Props> = ({ children }) => {
  return (
    <div className="p-5 w-full border-cyan-500 border-2 rounded-xl bg-white">
      <div className="flex h-7 items-center justify-start text-2xl font-semibold">
        {children}
      </div>
    </div>
  );
};

export default React.memo(PageHeader);
