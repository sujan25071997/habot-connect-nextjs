import React from "react";
import "./SkeletonCard.css";

export const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-line title"></div>
      <div className="skeleton-line text"></div>
      <div className="skeleton-line text short"></div>
      <div className="skeleton-line button"></div>
    </div>
  );
};
