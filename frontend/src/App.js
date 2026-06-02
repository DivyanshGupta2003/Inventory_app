import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";

const PAGES = ["Dashboard", "Products", "Customers", "Orders"];

export default function App() {
  const [page, setPage] = useState("Dashboard");

  const Page = { Dashboard, Products, Customers, Orders }[page];

  return (
    <div className="app">
      <nav className="sidebar">
        <h2>IMS</h2>
        {PAGES.map(p => (
          <a key={p} onClick={() => setPage(p)} className={page === p ? "active" : ""} style={{ cursor: "pointer" }}>
            {p}
          </a>
        ))}
      </nav>
      <main className="main">
        <Page />
      </main>
    </div>
  );
}
