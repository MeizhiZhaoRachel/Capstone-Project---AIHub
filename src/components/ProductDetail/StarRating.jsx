import React from "react";

function StarRating({ averageRating }) {
  const fullStars = Math.floor(averageRating); // Number of full stars
  const partialStar = averageRating % 1; // Fractional part of the rating

  return (
    <div className="stars">
      {[...Array(fullStars)].map((_, i) => (
        <span key={i} style={{ color: 'orange' }}>★</span>
      ))}
      {partialStar > 0 && (
        <span style={{ position: 'relative', display: 'inline-block' }}>
          <span style={{ color: 'lightgray' }}>★</span> {/* Background star */}
          <span style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: `${partialStar * 100}%`, /* Width of the partial fill */
            overflow: 'hidden',
            color: 'orange'
          }}>★</span> {/* Foreground star */}
        </span>
      )}
    </div>
  );
}

export default StarRating;
