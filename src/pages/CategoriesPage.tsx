import { FormEvent, useEffect, useState } from "react";
import api from "../lib/api";
import { CategoryEvent } from "../types";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryEvent[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ nama: "", deskripsi: "" });

  const loadData = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const resetForm = () => {
    setEditId(null);
    setForm({ nama: "", deskripsi: "" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (editId) {
      await api.put(`/categories/${editId}`, form);
    } else {
      await api.post("/categories", form);
    }

    resetForm();
    loadData();
  };

  const handleEdit = (item: CategoryEvent) => {
    setEditId(item.id);
    setForm({
      nama: item.nama,
      deskripsi: item.deskripsi || ""
    });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus kategori ini?")) {
      await api.delete(`/categories/${id}`);
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="mb-4 text-2xl font-bold">Form Category Event</h2>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">
          <input
            className="input"
            placeholder="Nama kategori"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            required
          />

          <input
            className="input"
            placeholder="Deskripsi"
            value={form.deskripsi}
            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
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
        <h2 className="mb-4 text-2xl font-bold">List Categories</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">No</th>
              <th className="border p-2">Nama</th>
              <th className="border p-2">Deskripsi</th>
              <th className="border p-2">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((item, index) => (
              <tr key={item.id}>
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">{item.nama}</td>
                <td className="border p-2">{item.deskripsi}</td>
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

            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="border p-3 text-center text-gray-500">
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
