import React from "react";


type LuminaProps = {
    className?: string;
    children?: React.ReactNode;
  };
  
  const Lumina = ({ className= '', children = '' }:LuminaProps) => {
    return (
      <div className={`${className}`}>
        {children}
      </div>
    )
  }
  
  export default Lumina;