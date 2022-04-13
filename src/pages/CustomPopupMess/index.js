import React from "react";

const CustomPopupMessage = ({mess, icon, iconColor, titleColor}) => {
  return (
    <div>
      <p className={`font-semibold text-${titleColor}-500`}>Notification</p>
      <i className={`fa fa-${icon} pr-2 text-${iconColor}-500`} aria-hidden="true"></i>
      <span className="text-gray-600 text-sm font-normal">{mess}</span>
 
    </div>
  );
};

export default CustomPopupMessage;
