import React from "react";
import Image from "next/image";

type Props = {
  className?: string;
};

const BrandLogoText: React.FC<Props> = ({ className }) => {
  return (
    <Image
      src="https://res.cloudinary.com/dt93sahp2/image/upload/v1766958848/Untitled_design_1_vvsld2.png"
      alt="StratX Logo"
      width={40}
      height={40}
      priority
      className={className}
      style={{ width: "auto", height: "40px" }}
    />
  );
};

export default BrandLogoText;



