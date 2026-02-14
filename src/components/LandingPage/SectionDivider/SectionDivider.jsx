import React from "react";
import "./SectionDivider.css";
import artImage from "../../../assets/InfoMap/Art.png";

const SectionDivider = () => {
  return (
    <div className="section-divider-container">
      <img src={artImage} alt="" />
    </div>
  );
};

export default SectionDivider;
