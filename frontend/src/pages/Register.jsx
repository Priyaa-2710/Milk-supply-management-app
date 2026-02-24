import { useState } from "react";
import { registerRequest } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await registerRequest(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff9f0] px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8 space-y-6">

        <h2 className="text-2xl font-bold text-center text-[#b37c4d]">
          Create an Account
        </h2>

        <form onSubmit={submit} className="space-y-4">

          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b37c4d]"
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b37c4d]"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#b37c4d] text-white py-2 rounded-md font-medium hover:bg-[#9c653b] transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already registered?{" "}
          <Link
            to="/login"
            className="text-[#b37c4d] font-medium hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;