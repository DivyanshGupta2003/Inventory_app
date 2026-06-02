import React, { useEffect, useState } from "react";
import api from "../api";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => { api.get("/dashboard").then(r => setData(r.data)); }, []);

  if (!data) return <p>Loading…</p>;

  return (
    <>
      <h1>Dashboard</h1>
      <div className="cards">
        <div className="card"><h3>Products</h3><p>{data.total_products}</p></div>
        <div className="card"><h3>Customers</h3><p>{data.total_customers}</p></div>
        <div className="card"><h3>Orders</h3><p>{data.total_orders}</p></div>
        <div className={`card ${data.low_stock.length ? "warn" : ""}`}>
          <h3>Low Stock Items</h3><p>{data.low_stock.length}</p>
        </div>
      </div>

      {data.low_stock.length > 0 && (
        <>
          <h2 style={{ marginBottom: 12, fontSize: 16 }}>⚠️ Low Stock Products</h2>
          <div className="table-wrap">
            <table>
              <thead><tr><th>ID</th><th>Name</th><th>Qty</th></tr></thead>
              <tbody>
                {data.low_stock.map(p => (
                  <tr key={p.id}><td>{p.id}</td><td>{p.name}</td><td style={{ color: "#ef4444" }}>{p.quantity}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
