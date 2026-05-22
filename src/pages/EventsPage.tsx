import { FormEvent, useEffect, useState } from "react";
import api from "../lib/api";
import { CategoryEvent, EventItem, Pembicara } from "../types";

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [categories, setCategories] = useState<CategoryEvent[]>([]);
  const [pembicara, setPembicara] = useState<Pembicara[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
    tanggal: "",
    lokasi: "",
    categoryId: "",
    pembicaraId: ""
  });

  const loadData = async () => {
    const [eventsRes, categoriesRes, pembicaraRes] = await Promise.all([
      api.get("/events"),
      api.get("/categories"),
      api.get("/pembicara")
    ]);

    setEvents(eventsRes.data);
    setCategories(categoriesRes.data);
    setPembicara(pembicaraRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const resetForm = () => {
    setEditId(null);
    setForm({
      judul: "",
      deskripsi: "",
      tanggal: "",
      lokasi: "",
      categoryId: "",
      pembicaraId: ""
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (editId) {
      await api.put(`/events/${editId}`, form);
    } else {
      await api.post("/events", form);
    }

    resetForm();
    loadData();
  };

  const handleEdit = (item: EventItem) => {
    setEditId(item.id);
    setForm({
      judul: item.judul,
      deskripsi: item.deskripsi || "",
      tanggal: item.tanggal.substring(0, 10),
      lokasi: item.lokasi,
      categoryId: String(item.categoryId),
      pembicaraId: String(item.pembicaraId)
    });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus event ini?")) {
      await api.delete(`/events/${id}`);
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="mb-4 text-2xl font-bold">Form Event</h2>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <input
            className="input"
            placeholder="Judul event"
            value={form.judul}
            onChange={(e) => setForm({ ...form, judul: e.target.value })}
            required
          />

          <input
            className="input"
            placeholder="Lokasi"
            value={form.lokasi}
            onChange={(e) => setForm({ ...form, lokasi: e.target.value })}
            required
          />

          <input
            className="input"
            type="date"
            value={form.tanggal}
            onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
            required
          />

          <input
            className="input"
            placeholder="Deskripsi"
            value={form.deskripsi}
            onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
          />

          <select
            className="input"
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            required
          >
            <option value="">Pilih Kategori</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </select>

          <select
            className="input"
            value={form.pembicaraId}
            onChange={(e) => setForm({ ...form, pembicaraId: e.target.value })}
            required
          >
            <option value="">Pilih Pembicara</option>
            {pembicara.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </select>

          <div className="flex gap-2 md:col-span-2">
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
        <h2 className="mb-4 text-2xl font-bold">List Events</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">No</th>
              <th className="border p-2">Judul</th>
              <th className="border p-2">Tanggal</th>
              <th className="border p-2">Lokasi</th>
              <th className="border p-2">Kategori</th>
              <th className="border p-2">Pembicara</th>
              <th className="border p-2">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {events.map((item, index) => (
              <tr key={item.id}>
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">{item.judul}</td>
                <td className="border p-2">
                  {new Date(item.tanggal).toLocaleDateString("id-ID")}
                </td>
                <td className="border p-2">{item.lokasi}</td>
                <td className="border p-2">{item.category?.nama}</td>
                <td className="border p-2">{item.pembicara?.nama}</td>
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

            {events.length === 0 && (
              <tr>
                <td colSpan={7} className="border p-3 text-center text-gray-500">
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
