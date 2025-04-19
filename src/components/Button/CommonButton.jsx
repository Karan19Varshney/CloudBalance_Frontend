import React from "react";

const CommonButton = ({
  text,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  children,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`transition-all duration-300 font-semibold rounded-md ${className}`}
      {...props}
    >
      {children || text}
    </button>
  );
};

export default CommonButton;