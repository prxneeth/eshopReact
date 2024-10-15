import React from "react";
import { cartState } from "../contextRed/Context";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Ratings } from "./Ratings";
import { Padding } from "@mui/icons-material";

export const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = cartState();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div className="flex">
      <List className="w-3/4" sx={{ bgcolor: "gray" }}>
        {cart.length > 0 ? (
          cart.map((prod) => (
            <ListItem
              key={prod.id}
              sx={{ border: "1px solid lightgray", mb: 1 }}
            >
              <ListItemAvatar>
                <img
                  className="w-32 max-h-32 mr-10 rounded-lg"
                  src={prod.image}
                  alt={prod.name}
                />
              </ListItemAvatar>
              <Typography sx={{ mr: 2, width: "25%" }}>{prod.name}</Typography>
              <Typography sx={{ mr: 0, width: "15%" }}>
                ₹ {prod.price}
              </Typography>
              <Ratings rating={prod.ratings} />
              {/* Use Material-UI Select for the dropdown */}
              <FormControl>
                <Select
                  value={prod.qty}
                  size="small"
                  sx={{ width: "100px", ml: 6 }}
                  onChange={(e) =>
                    dispatch({
                      type: "CHANGE_CART_QTY",
                      payload: { id: prod.id, qty: e.target.value },
                    })
                  }
                >
                  {[...Array(prod.inStock).keys()].map((x) => (
                    <MenuItem key={x + 1} value={x + 1}>
                      {x + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <ListItemAvatar>
                <IconButton
                  size="small"
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: prod,
                    })
                  }
                  items
                  color="error"
                >
                  <DeleteIcon sx={{ ml: 6 }} />
                </IconButton>
              </ListItemAvatar>
            </ListItem>
          ))
        ) : (
          <Typography>No items in the cart</Typography>
        )}
      </List>

      <div className="w-1/4 bg-black-100 h-lvh flex-col justify-end p-5">
        <h1>subtotal {cart.length} items</h1>

        <h3>total : ₹ {total}</h3>
        <Button variant="contained" fullWidth>
          Checkout
        </Button>
      </div>
    </div>
  );
};
