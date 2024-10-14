import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Ratings } from "./Ratings";
import { cartState } from "../contextRed/Context";

export const Allproducts = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = cartState();

  return (
    <div className="box-border rounded-lg shadow-md shadow-red-700 transition-transform duration-300 hover:scale-95 m-2">
      <Card
        sx={{
          maxWidth: 285,
          maxHeight: 500,

          padding: 1,
          backgroundColor: "gray",
        }}
      >
        <CardMedia
          component="img"
          alt={prod.name}
          height="250"
          image={prod.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {prod.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
            description description description description description
            description
          </Typography>
          <Ratings rating={prod.ratings} />
          <Typography sx={{ fontSize: 20, ml: "4px", mb: 1, mt: 1 }}>
            {" "}
            <span style={{ fontSize: 14, fontWeight: 500 }}>
              {" "}
              <sup>$</sup>
            </span>
            {prod.price}
          </Typography>
          <Typography sx={{ ml: "4px" }}>
            {prod.fastDelivery ? "Fast Delivery " : "4 Days Delivery"}
          </Typography>
        </CardContent>
        <CardActions>
          {cart.some((p) => p.id === prod.id) ? (
            <Button
              fullWidth
              variant="contained"
              color="warning"
              size="small"
              sx={{ marginBottom: "12px" }}
              onClick={() => {
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: prod,
                });
              }}
            >
              Remove From Cart
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              color="error"
              size="small"
              sx={{ marginBottom: "12px" }}
              disabled={!prod.inStock}
              onClick={() => {
                dispatch({
                  type: "ADD_TO_CART",
                  payload: prod,
                });
              }}
            >
              {!prod.inStock ? "out of stock" : "Add to Cart"}
            </Button>
          )}

          <br />
          {/* <Button size="small">Learn More</Button> */}
        </CardActions>
      </Card>
    </div>
  );
};
