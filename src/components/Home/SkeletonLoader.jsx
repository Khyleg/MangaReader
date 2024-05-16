import React from 'react';
import './SkeletonLoader.css'; // Import CSS for styling

const SkeletonLoader = () => {
  return (
    <div className="skeleton-loader">
        <div className="descriptive-text">
            <div className="skeleton-title"></div>
            <div className="skeleton-summary"></div>
        </div>
      <div className="skeleton-cover"></div>
    </div>
  );
};

export default SkeletonLoader;
