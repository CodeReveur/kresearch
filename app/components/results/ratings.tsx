import React from "react";

interface RatingsProps {
  rating: number; // Expecting values like 3.6, 4.2, etc.
}

const Ratings: React.FC<RatingsProps> = ({ rating }) => {
  const fullStars = Math.floor(rating); // Get full stars count
  const partialFill = Math.round((rating - fullStars) * 100); // Get percentage for partial star fill
  const totalStars = 5; // Total number of stars

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => (
        <div key={index} className="relative w-5 h-5">
          {/* Empty star as background */}
          <span className="bi bi-star text-gray-400 absolute inset-0"></span>
          {/* Filled star */}
          {index < fullStars ? (
            <span className="bi bi-star-fill text-orange-500 absolute inset-0"></span>
          ) : index === fullStars && partialFill > 0 ? (
            <span
              className="bi bi-star-fill text-orange-500 absolute inset-0"
              style={{
                width: `${partialFill}%`,
                overflow: "hidden",
                display: "inline-block",
                whiteSpace: "nowrap",
              }}
            ></span>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Ratings;
