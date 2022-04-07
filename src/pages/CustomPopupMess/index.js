import React from "react";

const CustomPopupMessage = ({mess, icon}) => {
  return (
    <div>
      <p className="font-bold">Notification</p>
      <i className={`fa fa-${icon} pr-2 text-amber-500`} aria-hidden="true"></i>
      {mess}
    </div>
  );
};

export default CustomPopupMessage;
