//  import logo from './logo.svg';
import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import PageNavbar from "./components/PageNavbar/PageNavbar";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import { BrowserRouter } from "react-router-dom";
import React, { useState, useEffect } from "react";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Main></Main>
      </div>
    </BrowserRouter>
  );
}

//useLocation hook can only be used within the Router component. Hence Main.
function Main() {
  const location = useLocation();
  const [navLocation, setNavLocation] = useState("");

  useEffect(() => {
    if (location.pathname === "/search") {
      setNavLocation("search");
    } else if (location.pathname === "/favorites") {
      setNavLocation("favorites");
    }
  }, [location.pathname]);
  return (
    <div>
      <PageNavbar navLocation={navLocation}></PageNavbar>
      <Routes>
        <Route path="*" element={<Navigate to="/search" replace={true} />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
