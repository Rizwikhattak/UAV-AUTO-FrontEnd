import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-7 h-7 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
