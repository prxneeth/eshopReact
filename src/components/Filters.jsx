import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import { Button, Rating } from "@mui/material";
import { Ratings } from "./Ratings";
import { useState } from "react";
import { cartState } from "../contextRed/Context";

export const Filters = () => {
  //   const [rate, setRate] = useState(0);

  const {
    productState: { byStock, byFastDelivery, sort, byRating, searchQuery },
    productDispatch,
  } = cartState();

  return (
    // <div className="bg-slate-300  ">
    <FormControl
      //   fullWidth
      sx={{
        bgcolor: "gray",
        height: "100%",
        width: "100%",
        maxWidth: "230px",
        marginLeft: "10px",
        marginTop: "27px",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      <FormLabel
        id="demo-radio-buttons-group-label"
        sx={{ textAlign: "center" }}
      >
        FILTER BY
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        color="secondary"
      >
        <FormControlLabel
          value="ascending"
          control={<Radio />}
          label="Low to High"
          color="secondary"
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "lowToHigh",
            })
          }
          checked={sort === "lowToHigh" ? true : false}
        />
        <FormControlLabel
          value="descending"
          control={<Radio />}
          label="High to Low"
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "highToLow",
            })
          }
          checked={sort === "highToLow" ? true : false}
        />
      </RadioGroup>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox />}
          label="Include out of stock"
          onChange={() =>
            productDispatch({
              type: "FILTER_BY_STOCK",
            })
          }
          checked={byStock}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Fast Delivery"
          onChange={() =>
            productDispatch({
              type: "FILTER_BY_DELIVERY",
            })
          }
          checked={byFastDelivery}
        />
      </FormGroup>
      <span>
        {" "}
        <FormLabel>Rating</FormLabel>
        <Ratings
          rating={byRating}
          //   onClick={(i) => setRate(i + 1)}

          onClick={(i) =>
            productDispatch({
              type: "FILTER_BY_RATING",
              payload: i + 1,
            })
          }
          style={{ cursor: "pointer" }}
        />
      </span>

      <Button
        color="error"
        variant="contained"
        onClick={() =>
          productDispatch({
            type: "CLEAR_FILTERS",
          })
        }
      >
        Clear Filters
      </Button>
    </FormControl>
    // </div>
  );
};
