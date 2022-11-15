import React from "react";
import Footer from "../Footer.jsx";
import Header from "../Header.jsx";
import AddIngredient from "./AddIngredient.jsx";
import ViewIngredients from "./ViewIngredients.jsx";

export default function InventoryPage() {
  return (
    <div>
      <Header />
      <div className="container">
        <h1>Inventory</h1>
        <AddIngredient />
        <hr />
        <ViewIngredients />
      </div>
      <Footer />
    </div>
  );
}
