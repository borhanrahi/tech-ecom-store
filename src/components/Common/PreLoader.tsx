import React from "react";

const PreLoader = () => {
  return (
    <div className="fixed left-0 top-0 z-999999 flex h-screen w-screen items-center justify-center bg-gray-800">
      <div className="h-24 w-24 animate-bounce rounded-full border-8 border-solid border-green-500 border-t-transparent"></div>
    </div>
  );
};

export default PreLoader;
