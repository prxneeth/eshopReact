import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { Filters } from "./Filters";
import { createContext } from "react";
import { useContext } from "react";
import { cartState, filt } from "../contextRed/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteIcon from "@mui/icons-material/Delete";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Header() {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = cartState();

  const { filtersOpen, setFiltersOpen } = useContext(filt);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  return (
    <filt.Provider value={filtersOpen}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="error">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2, ml: 3 }}
              onClick={toggleFilters}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              REACTeSHOP
            </Typography>
            <Search sx={{ mr: 4 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                sx={{ mr: 4 }}
                onChange={(e) => {
                  productDispatch({
                    type: "FILTER_BY_SEARCH",
                    payload: e.target.value,
                  });
                }}
              />
            </Search>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 3 }}
              component={Link}
              to="/components/cart"
            >
              <ShoppingCartIcon />
            </IconButton> */}
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              variant="contained"
              color="success"
              size="small"
              sx={{ mr: 4 }}
            >
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="open drawer"
              >
                <ShoppingCartIcon /> ({cart.length})
              </IconButton>
              <ArrowDropDownIcon />
            </Button>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              sx={{
                width: "350px",
                padding: 2,
                mt: 1,
              }}
            >
              {cart.length > 0 ? (
                <>
                  {cart.map((prod) => (
                    <MenuItem
                      key={prod.id}
                      sx={{
                        // display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 2,
                        marginTop: 0,
                      }}
                    >
                      <div>
                        <span>{prod.name}</span>
                        <br />
                        <span>₹{prod.price}</span>
                      </div>
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
                        <DeleteIcon sx={{ ml: 3 }} />
                      </IconButton>
                    </MenuItem>
                  ))}
                  <Button
                    sx={{ width: "80%", ml: 3 }}
                    color="error"
                    variant="contained"
                    component={Link}
                    to="/components/cart"
                  >
                    Go to Cart
                  </Button>
                </>
              ) : (
                <MenuItem onClick={handleClose}>Cart is Empty</MenuItem>
              )}
            </Menu>
          </Toolbar>
        </AppBar>

        {/* {filtersOpen && <Filters />} */}
      </Box>
    </filt.Provider>
  );
}
