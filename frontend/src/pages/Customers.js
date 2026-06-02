import React, { useEffect, useState } from "react";
import api from "../api";

const EMPTY = { name: "", email: "", phone: "" };

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [msg, setMsg] = useState(null);

  const load = () => api.get("/customers").then(r => setCustomers(r.data));
  useEffect(() => { load(); }, []);

  const notify = (text, type = "success") => { setMsg({ text, type }); setTimeout(() => setMsg(null), 3000); };

  const submit = async (e) => {
    e.preventDefault();
    try { await api.post("/customers", form); notify("Customer added"); setForm(EMPTY); load(); }
    catch (err) { notify(err.response?.data?.detail || "Error", "error"); }
  };

  const del = async (id) => { if (!window.confirm("Delete?")) return; await api.delete(`/customers/${id}`); load(); };

  return (
    <>
      <h1>Customers</h1>
      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

      <div className="form-card">
        <h2>Add Customer</h2>
        <form onSubmit={submit}>
          <div className="form-row">
            {[["name","Full Name","text"],["email","Email","email"],["phone","Phone","text"]].map(([k,l,t]) => (
              <div className="form-group" key={k}>
                <label>{l}</label>
                <input type={t} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} required={k!=="phone"} />
              </div>
            ))}
          </div>
          <button className="btn btn-primary" style={{ marginTop: 16 }} type="submit">Add</button>
        </form>
      </div>

      <div className="table-wrap">
        <table>
          <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th></th></tr></thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td><td>{c.name}</td><td>{c.email}</td><td>{c.phone || "—"}</td>
                <td><button className="btn btn-danger btn-sm" onClick={() => del(c.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
