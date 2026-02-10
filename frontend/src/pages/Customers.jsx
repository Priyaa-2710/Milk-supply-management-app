import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getCustomers,
  createCustomer,
  deactivateCustomer,
  reactivateCustomer,
  updateCustomer,
  getInactiveCustomers,
} from "../api/customers.api";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [showInactive, setShowInactive] = useState(false);
  const [editingPhone, setEditingPhone] = useState(null);

  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [editForm, setEditForm] = useState({ name: "", address: "" });

  const fetchCustomers = async () => {
    const res = showInactive ? await getInactiveCustomers() : await getCustomers();
    const list = Array.isArray(res.data) ? res.data : [];
    setCustomers(list);
  };

  useEffect(() => {
    fetchCustomers();
  }, [showInactive]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCustomer(form);
    setForm({ name: "", phone: "", address: "" });
    fetchCustomers();
  };

  const handleDeactivate = async (phone) => {
    if (!window.confirm("Deactivate this customer?")) return;
    await deactivateCustomer(phone);
    fetchCustomers();
  };

  const handleReactivate = async (phone) => {
    await reactivateCustomer(phone);
    fetchCustomers();
  };

  const startEdit = (c) => {
    setEditingPhone(c.phone);
    setEditForm({ name: c.name, address: c.address || "" });
  };

  const saveEdit = async (phone) => {
    await updateCustomer(phone, editForm);
    setEditingPhone(null);
    fetchCustomers();
  };

  return (
    <div className="min-h-screen bg-[#fff9f0] font-sans p-6 flex flex-col items-center space-y-6">
      <h1 className="text-3xl font-bold text-[#b37c4d]">Customers</h1>

      {/* ================= ADD CUSTOMER ================= */}
      {!showInactive && (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-4 items-center"
        >
          <input
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b37c4d]"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b37c4d]"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          <input
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b37c4d]"
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          <button
            type="submit"
            className="bg-[#f8eede] text-[#b37c4d] py-2 px-4 rounded hover:bg-[#f1dcc8] transition"
          >
            Add Customer
          </button>
        </form>
      )}

      <hr className="w-full max-w-3xl border-gray-300" />

      {/* ================= TOGGLE ================= */}
      <label className="text-gray-700 text-sm flex items-center gap-2">
        <input
          type="checkbox"
          checked={showInactive}
          onChange={() => setShowInactive(!showInactive)}
          className="w-4 h-4"
        />
        Show Deactivated Customers
      </label>

      {/* ================= CUSTOMER TABLE ================= */}
      <div className="w-full max-w-6xl overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-xl shadow">
          <thead>
            <tr className="bg-[#f8eede] text-[#b37c4d]">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Ledger</th>
              <th className="px-4 py-2 text-left">Customer Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No customers found
                </td>
              </tr>
            ) : (
              customers.map((c) => (
                <tr
                  key={c.phone}
                  className={`${c.isActive ? "bg-white" : "bg-gray-100"} border-b`}
                >
                  {/* NAME */}
                  <td className="px-4 py-2">
                    {editingPhone === c.phone ? (
                      <input
                        className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-[#b37c4d]"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                      />
                    ) : (
                      c.name
                    )}
                  </td>

                  {/* PHONE */}
                  <td className="px-4 py-2">{c.phone}</td>

                  {/* ADDRESS */}
                  <td className="px-4 py-2">
                    {editingPhone === c.phone ? (
                      <input
                        className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-[#b37c4d]"
                        value={editForm.address}
                        onChange={(e) =>
                          setEditForm({ ...editForm, address: e.target.value })
                        }
                      />
                    ) : (
                      c.address || "—"
                    )}
                  </td>

                  {/* LEDGER */}
                  <td className="px-4 py-2">
                    <Link
                      to={`/ledger/${c.phone}`}
                      className="text-[#b37c4d] hover:underline"
                    >
                      View Ledger
                    </Link>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-2 flex flex-wrap gap-2">
                    {editingPhone === c.phone ? (
                      <>
                        <button
                          onClick={() => saveEdit(c.phone)}
                          className="bg-[#f8eede] text-[#b37c4d] px-2 py-1 rounded hover:bg-[#f1dcc8] transition"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingPhone(null)}
                          className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 transition"
                        >
                          Cancel
                        </button>
                      </>
                    ) : c.isActive ? (
                      <>
                        <button
                          onClick={() => startEdit(c)}
                          className="bg-[#f8eede] text-[#b37c4d] px-2 py-1 rounded hover:bg-[#f1dcc8] transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeactivate(c.phone)}
                          className="bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200 transition"
                        >
                          Deactivate
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleReactivate(c.phone)}
                        className="bg-green-100 text-green-600 px-2 py-1 rounded hover:bg-green-200 transition"
                      >
                        Reactivate
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-gray-500 text-sm mt-2 max-w-6xl text-center">
        Deactivated customers are hidden by default but their ledger and history
        remain intact.
      </p>
    </div>
  );
};

export default Customers;
