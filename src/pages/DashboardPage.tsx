import { useEffect, useState } from "react";
import api from "../lib/api";
import { CategoryEvent, EventItem, Pembicara } from "../types";

export default function DashboardPage() {
  const [categories, setCategories] = useState<CategoryEvent[]>([]);
  const [pembicara, setPembicara] = useState<Pembicara[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const [categoryRes, pembicaraRes, eventRes] = await Promise.all([
        api.get("/categories"),
        api.get("/pembicara"),
        api.get("/events"),
      ]);

      setCategories(categoryRes.data);
      setPembicara(pembicaraRes.data);
      setEvents(eventRes.data);
    };

    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-blue-600 p-6 text-white shadow">
        <h2 className="text-3xl font-bold">Dashboard EVENTMS</h2>
        <p className="mt-2">
          Ringkasan data sistem manajemen event kampus.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="card">
          <p className="text-gray-500">Total Categories</p>
          <h3 className="mt-2 text-3xl font-bold">{categories.length}</h3>
        </div>

        <div className="card">
          <p className="text-gray-500">Total Pembicara</p>
          <h3 className="mt-2 text-3xl font-bold">{pembicara.length}</h3>
        </div>

        <div className="card">
          <p className="text-gray-500">Total Events</p>
          <h3 className="mt-2 text-3xl font-bold">{events.length}</h3>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <h3 className="mb-4 text-xl font-bold">Event Terbaru</h3>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">No</th>
              <th className="border p-2">Judul</th>
              <th className="border p-2">Kategori</th>
              <th className="border p-2">Pembicara</th>
              <th className="border p-2">Tanggal</th>
            </tr>
          </thead>

          <tbody>
            {events.slice(0, 5).map((event, index) => (
              <tr key={event.id}>
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">{event.judul}</td>
                <td className="border p-2">{event.category?.nama}</td>
                <td className="border p-2">{event.pembicara?.nama}</td>
                <td className="border p-2">
                  {new Date(event.tanggal).toLocaleDateString("id-ID")}
                </td>
              </tr>
            ))}

            {events.length === 0 && (
              <tr>
                <td colSpan={5} className="border p-3 text-center text-gray-500">
                  Belum ada event
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}