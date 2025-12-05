import React from "react";

type Props = {
  className?: string;
};

const BrandLogoText: React.FC<Props> = ({ className }) => {
  return (
    <span
      className={className}
      style={{
        fontWeight: 700,
        fontStyle: "italic",
        fontSize: "24px",
        lineHeight: 1,
        letterSpacing: "0.04em",
      }}
    >
      StratX
    </span>
  );
};

export default BrandLogoText;



