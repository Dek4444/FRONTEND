import { FormEvent, useEffect, useState } from "react";
import api from "../lib/api";
import { Pembicara } from "../types";

export default function PembicaraPage() {
  const [pembicara, setPembicara] = useState<Pembicara[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ nama: "", keahlian: "", email: "" });

  const loadData = async () => {
    const res = await api.get("/pembicara");
    setPembicara(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const resetForm = () => {
    setEditId(null);
    setForm({ nama: "", keahlian: "", email: "" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (editId) {
      await api.put(`/pembicara/${editId}`, form);
    } else {
      await api.post("/pembicara", form);
    }

    resetForm();
    loadData();
  };

  const handleEdit = (item: Pembicara) => {
    setEditId(item.id);
    setForm({
      nama: item.nama,
      keahlian: item.keahlian || "",
      email: item.email || ""
    });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus pembicara ini?")) {
      await api.delete(`/pembicara/${id}`);
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="mb-4 text-2xl font-bold">Form Pembicara</h2>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-4">
          <input
            className="input"
            placeholder="Nama pembicara"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            required
          />

          <input
            className="input"
            placeholder="Keahlian"
            value={form.keahlian}
            onChange={(e) => setForm({ ...form, keahlian: e.target.value })}
          />

          <input
            className="input"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <div className="flex gap-2">
            <button className="btn btn-primary">
              {editId ? "Update" : "Tambah"}
            </button>

            {editId && (
              <button type="button" onClick={resetForm} className="btn bg-gray-300">
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="card overflow-x-auto">
        <h2 className="mb-4 text-2xl font-bold">List Pembicara</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">No</th>
              <th className="border p-2">Nama</th>
              <th className="border p-2">Keahlian</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {pembicara.map((item, index) => (
              <tr key={item.id}>
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">{item.nama}</td>
                <td className="border p-2">{item.keahlian}</td>
                <td className="border p-2">{item.email}</td>
                <td className="space-x-2 border p-2 text-center">
                  <button onClick={() => handleEdit(item)} className="btn bg-yellow-400">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="btn btn-danger">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}

            {pembicara.length === 0 && (
              <tr>
                <td colSpan={5} className="border p-3 text-center text-gray-500">
                  Belum ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
