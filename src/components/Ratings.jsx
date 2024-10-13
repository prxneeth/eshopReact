import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export const Ratings = ({ rating, onClick, style }) => {
  return (
    <>
      {[...Array(5)].map((_, i) => {
        return (
          <span key={i} onClick={() => onClick(i)} style={style}>
            {rating > i ? (
              <StarIcon fontSize="small" />
            ) : (
              <StarBorderIcon fontSize="small" />
            )}
          </span>
        );
      })}
    </>
  );
};
