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
import { Margin } from "@mui/icons-material";

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
        // height: "120%",
        width: "1600px",
        maxWidth: "240px",
        marginLeft: "10px",
        marginTop: "27px",
        borderRadius: "10px",
        padding: "10px",
        zIndex: 31,
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
      <hr
        style={{
          width: "100%",
          border: "1px solid white",
          backgroundColor: "Red",
          marginBottom: "15px",
        }}
      />
      <span>
        {" "}
        <FormLabel sx={{ ml: 0.5 }}> Filter By Rating </FormLabel>
        <br />
        <Ratings
          rating={byRating}
          //   onClick={(i) => setRate(i + 1)}

          onClick={(i) =>
            productDispatch({
              type: "FILTER_BY_RATING",
              payload: i + 1,
            })
          }
          style={{ cursor: "pointer", padding: "1px" }}
        />
      </span>

      <Button
        sx={{ margin: 1 }}
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
