import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const success = login(nim, password);

    if (success) {
      navigate("/");
    } else {
      setError("NIM atau password salah");
    }
  };

return (
  <div className="flex min-h-screen flex-col items-center bg-gray-100 px-4">
    <div className="mt-8 bg-transparent px-12 py-4 text-center">
      <h1 className="text-2xl font-bold text-blue-700">EVENTMS</h1>
    </div>

    <div className="mt-28 w-full max-w-xl rounded-lg bg-white p-8 shadow">
      <h2 className="mb-6 text-center text-2xl font-bold">Login</h2>

      {error && (
        <p className="mb-3 rounded bg-red-100 p-2 text-red-700">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="input"
          placeholder="NIM"
          value={nim}
          onChange={(e) => setNim(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-full">Login</button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-500">
        NIM: 24090122 | Password: admin123
      </p>
    </div>

    <p className="mt-auto pb-6 text-sm text-gray-500">
      © 2026 EVENTMS - Sistem Manajemen Event
    </p>
  </div>
);
}
