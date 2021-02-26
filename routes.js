"use strict";

const express = require("express");
const routes = express.Router();

const incart = [
  { id: 1, product: "Coffee", price: 6, quantity: 10 },
  { id: 2, product: "Tea", price: 8, quantity: 8 },
  { id: 3, product: "Small Cups", price: 4, quantity: 15 },
  { id: 4, product: "Large Cups", price: 4.5, quantity: 10 },
  { id: 5, product: "Pastry Bags", price: 25, quantity: 4 },
];
let nextId = 6;

routes.post("/cart-items", (req, res) => {
  let cart = req.body;
  cart.id = nextId++;
  incart.push(cart);
  res.status(201);
  res.json(cart);
});

routes.get("/cart-items/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let foundProduct = incart.find((item) => {
    return item.id === id;
  });
  if (foundProduct) {
    res.json(foundProduct);
  } else {
    res.send(`No product with id: ${id}`);
  }
});

routes.get("/cart-items", (req, res) => {
  let product = req.query.product;
  let filteredProducts = incart;
  let maxPrice = req.query.maxPrice;

  if (product) {
    filteredProducts = filteredProducts.filter((item) => {
      return item.product === product;
    });
  }
  if (maxPrice) {
    filteredProducts = filteredProducts.filter((item) => {
      return item.price <= parseInt(maxPrice);
    });
  }

  res.json(filteredProducts);
});

module.exports = routes;
