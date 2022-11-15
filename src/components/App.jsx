import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./homepage/HomePage.jsx";
import RecipesPage from "./recipes/RecipesPage.jsx";
import InventoryPage from "./ingredients/InventoryPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/recipes" exact element={<RecipesPage />} />
        <Route path="/inventory" exact element={<InventoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
