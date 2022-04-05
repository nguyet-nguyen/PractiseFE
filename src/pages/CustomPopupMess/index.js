import React from "react";

const CustomPopupMessage = ({mess}) => {
  return (
    <div>
      <i className="fa fa-check pr-2 text-amber-500" aria-hidden="true"></i>
      {mess}
    </div>
  );
};

export default CustomPopupMessage;
