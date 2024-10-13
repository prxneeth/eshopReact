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

export const Filters = () => {
  const [rate, setRate] = useState(0);

  return (
    // <div className="bg-slate-300  ">
    <FormControl
      //   fullWidth
      sx={{
        bgcolor: "gray",
        height: "100%",
        width: "120%",
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
        />
        <FormControlLabel
          value="descending"
          control={<Radio />}
          label="High to Low"
        />
      </RadioGroup>
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="Include out of stock" />
        <FormControlLabel control={<Checkbox />} label="Fast Delivery" />
      </FormGroup>
      <span>
        {" "}
        <FormLabel>Rating</FormLabel>
        <Ratings
          rating={rate}
          onClick={(i) => setRate(i + 1)}
          style={{ cursor: "pointer" }}
        />
      </span>

      <Button color="error" variant="contained">
        Clear Filters
      </Button>
    </FormControl>
    // </div>
  );
};
