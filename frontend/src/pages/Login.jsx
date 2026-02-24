import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate("/");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff9f0] px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-[#b37c4d]">
          Login to Your Account
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
              onChange={(e) => setForm({ ...form, username: e.target.value })}
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
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b37c4d]"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#b37c4d] text-white py-2 rounded-md font-medium hover:bg-[#9c653b] transition"
          >
            Login
          </button>

          <p>
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-[#b37c4d] font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
