import React from "react";

function StarRating({ averageRating }) {
  // Ensure averageRating is a number and within the valid range (0 to 5)
  const rating = typeof averageRating === 'number' ? averageRating : 0;
  const fullStars = Math.floor(rating); // Number of full stars
  const hasPartialStar = rating % 1 !== 0; // Check for a partial star

  // Helper function to render full stars
  const renderFullStars = (count) => {
    return [...Array(count)].map((_, i) => (
      <span key={`full_${i}`} style={{ color: 'orange' }}>★</span>
    ));
  };

  // Helper function to render partial star
  const renderPartialStar = (partial) => {
    if (!partial) return null;
    return (
      <span style={{ position: 'relative', display: 'inline-block' }}>
        <span style={{ color: 'lightgray' }}>★</span> {/* Background star */}
        <span style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: `${partial * 100}%`, /* Width of the partial fill */
          overflow: 'hidden',
          color: 'orange'
        }}>★</span> {/* Foreground star */}
      </span>
    );
  };

  return (
    <div>
      {renderFullStars(fullStars)}
      {hasPartialStar && renderPartialStar(rating - fullStars)}
    </div>
  );
}

export default StarRating;
