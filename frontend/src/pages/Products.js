import React, { useEffect, useState } from "react";
import api from "../api";

const EMPTY = { name: "", sku: "", price: "", quantity: "" };

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState(null);

  const load = () => api.get("/products").then(r => setProducts(r.data));
  useEffect(() => { load(); }, []);

  const notify = (text, type = "success") => { setMsg({ text, type }); setTimeout(() => setMsg(null), 3000); };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, price: parseFloat(form.price), quantity: parseInt(form.quantity) };
      if (editing) { await api.put(`/products/${editing}`, payload); notify("Product updated"); }
      else          { await api.post("/products", payload); notify("Product created"); }
      setForm(EMPTY); setEditing(null); load();
    } catch (err) { notify(err.response?.data?.detail || "Error", "error"); }
  };

  const startEdit = (p) => { setForm({ name: p.name, sku: p.sku, price: p.price, quantity: p.quantity }); setEditing(p.id); };
  const del = async (id) => { if (!window.confirm("Delete?")) return; await api.delete(`/products/${id}`); load(); };

  return (
    <>
      <h1>Products</h1>
      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

      <div className="form-card">
        <h2>{editing ? "Edit Product" : "Add Product"}</h2>
        <form onSubmit={submit}>
          <div className="form-row">
            {[["name","Name","text"],["sku","SKU","text"],["price","Price","number"],["quantity","Qty","number"]].map(([k,l,t]) => (
              <div className="form-group" key={k}>
                <label>{l}</label>
                <input type={t} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} required min={t==="number"?0:undefined} step={k==="price"?"0.01":undefined} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
            <button className="btn btn-primary" type="submit">{editing ? "Update" : "Add"}</button>
            {editing && <button className="btn" type="button" onClick={() => { setForm(EMPTY); setEditing(null); }}>Cancel</button>}
          </div>
        </form>
      </div>

      <div className="table-wrap">
        <table>
          <thead><tr><th>ID</th><th>Name</th><th>SKU</th><th>Price</th><th>Qty</th><th>Actions</th></tr></thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td><td>{p.name}</td><td>{p.sku}</td>
                <td>${p.price.toFixed(2)}</td>
                <td style={{ color: p.quantity < 5 ? "#ef4444" : undefined }}>{p.quantity}</td>
                <td style={{ display: "flex", gap: 8 }}>
                  <button className="btn btn-primary btn-sm" onClick={() => startEdit(p)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => del(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}