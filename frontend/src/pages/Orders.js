import React, { useEffect, useState } from "react";
import api from "../api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [custId, setCustId] = useState("");
  const [items, setItems] = useState([{ product_id: "", quantity: 1 }]);
  const [msg, setMsg] = useState(null);
  const [detail, setDetail] = useState(null);

  const load = () => api.get("/orders").then(r => setOrders(r.data));
  useEffect(() => {
    load();
    api.get("/customers").then(r => setCustomers(r.data));
    api.get("/products").then(r => setProducts(r.data));
  }, []);

  const notify = (text, type = "success") => { setMsg({ text, type }); setTimeout(() => setMsg(null), 3000); };

  const addItem = () => setItems([...items, { product_id: "", quantity: 1 }]);
  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i, k, v) => { const copy = [...items]; copy[i][k] = v; setItems(copy); };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        customer_id: parseInt(custId),
        items: items.map(it => ({ product_id: parseInt(it.product_id), quantity: parseInt(it.quantity) }))
      };
      await api.post("/orders", payload);
      notify("Order created");
      setCustId(""); setItems([{ product_id: "", quantity: 1 }]); load();
    } catch (err) { notify(err.response?.data?.detail || "Error", "error"); }
  };

  const del = async (id) => { if (!window.confirm("Cancel order?")) return; await api.delete(`/orders/${id}`); load(); };

  const viewDetail = async (id) => {
    const r = await api.get(`/orders/${id}`);
    setDetail(r.data);
  };

  return (
    <>
      <h1>Orders</h1>
      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

      <div className="form-card">
        <h2>Create Order</h2>
        <form onSubmit={submit}>
          <div className="form-group" style={{ marginBottom: 16, maxWidth: 300 }}>
            <label>Customer</label>
            <select value={custId} onChange={e => setCustId(e.target.value)} required>
              <option value="">Select customer…</option>
              {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          {items.map((it, i) => (
            <div className="form-row" key={i} style={{ marginBottom: 10 }}>
              <div className="form-group">
                <label>Product</label>
                <select value={it.product_id} onChange={e => updateItem(i, "product_id", e.target.value)} required>
                  <option value="">Select…</option>
                  {products.map(p => <option key={p.id} value={p.id}>{p.name} (stock: {p.quantity})</option>)}
                </select>
              </div>
              <div className="form-group" style={{ maxWidth: 120 }}>
                <label>Qty</label>
                <input type="number" min="1" value={it.quantity} onChange={e => updateItem(i, "quantity", e.target.value)} required />
              </div>
              {items.length > 1 && (
                <div className="form-group" style={{ justifyContent: "flex-end", maxWidth: 80 }}>
                  <label>&nbsp;</label>
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => removeItem(i)}>✕</button>
                </div>
              )}
            </div>
          ))}

          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button type="button" className="btn" onClick={addItem}>+ Add Item</button>
            <button type="submit" className="btn btn-primary">Place Order</button>
          </div>
        </form>
      </div>

      {detail && (
        <div className="form-card" style={{ background: "#f8fafc" }}>
          <h2>Order #{detail.id} — {detail.customer?.name}</h2>
          <table style={{ width: "100%", marginTop: 12 }}>
            <thead><tr><th>Product</th><th>Qty</th><th>Unit Price</th><th>Subtotal</th></tr></thead>
            <tbody>
              {detail.items.map((it, i) => (
                <tr key={i}>
                  <td>{it.product?.name || it.product_id}</td>
                  <td>{it.quantity}</td>
                  <td>${it.unit_price.toFixed(2)}</td>
                  <td>${(it.quantity * it.unit_price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ marginTop: 12, fontWeight: 700 }}>Total: ${detail.total.toFixed(2)}</p>
          <button className="btn btn-sm" style={{ marginTop: 12 }} onClick={() => setDetail(null)}>Close</button>
        </div>
      )}

      <div className="table-wrap">
        <table>
          <thead><tr><th>ID</th><th>Customer</th><th>Total</th><th>Actions</th></tr></thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.customer?.name || o.customer_id}</td>
                <td>${o.total.toFixed(2)}</td>
                <td style={{ display: "flex", gap: 8 }}>
                  <button className="btn btn-primary btn-sm" onClick={() => viewDetail(o.id)}>View</button>
                  <button className="btn btn-danger btn-sm" onClick={() => del(o.id)}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
