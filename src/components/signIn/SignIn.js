import React from "react";
import "./sign-in.scss";

const SignIn = ({
  label,
  isDisabled,
  handleSubmit,
  backgroundColor,
  color,
  size,
}) => {
  const submit = () => {
    if (!isDisabled) handleSubmit();
  };
  return (
    <input
      className={`sign-in-button ${isDisabled ? "desactivated" : ""}`}
      style={
        isDisabled
          ? { width: `${size * 18}px`, height: `${size * 5}px` }
          : {
              backgroundColor: backgroundColor,
              color: color,
              width: `${size * 18}px`,
              height: `${size * 5}px`,
            }
      }
      type="submit"
      value={label}
      onClick={() => submit()}
    />
  );
};

export default SignIn;
