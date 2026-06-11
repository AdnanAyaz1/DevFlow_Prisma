import React from "react";

const loading = () => {
  return (
    <div className="bg-black/70 backdrop-blur-lg fixed inset-0 flex items-center justify-center z-50">
      <div className="loader"></div>
    </div>
  );
};

export default loading;

/* HTML: <div class="loader"></div> */
