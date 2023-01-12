import React from "react";

const Image = (props) => {
  const { src, className, ...other } = props;
  return (
    <img 
      src={src}
      className={className}
      {...other} 
    />
  );
};

export default Image;
