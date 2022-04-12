import React from "react";

const CustomPopupMessage = ({mess, icon}) => {
  return (
    <div>
      <p className="font-semibold text-gray-700">Notification</p>
      <i className={`fa fa-${icon} pr-2 text-amber-500`} aria-hidden="true"></i>
      <span className="text-gray-500 text-sm font-normal">{mess}</span>
 
    </div>
  );
};

export default CustomPopupMessage;
