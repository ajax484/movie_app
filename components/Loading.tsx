import React from "react";

interface ILoading {
  loading: boolean;
  children: React.ReactNode;
}

const Loading: React.FC<ILoading> = ({ loading, children }) => {
  if (loading)
    return (
      <div className="flex justify-center items-center w-full h-80">
        <div className="h-12 w-12 rounded-full border-t-sky-600 border-r-sky-600 border-l-zinc-200 border-b-zinc-200 border-4 animate-spin" />
      </div>
    );

  return <>{children}</>;
};

export default Loading;
