export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-blue-600 p-6 text-white shadow">
        <h2 className="text-3xl font-bold">Dashboard EVENTMS</h2>
        <p className="mt-2">
          Selamat datang di sistem manajemen event kampus.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="card">
          <h3 className="text-lg font-bold">Category Event</h3>
          <p className="mt-2 text-gray-600">
            Kelola kategori seperti seminar, workshop, dan kegiatan lainnya.
          </p>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold">Pembicara</h3>
          <p className="mt-2 text-gray-600">
            Kelola data pembicara event.
          </p>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold">Events</h3>
          <p className="mt-2 text-gray-600">
            Kelola jadwal, lokasi, kategori, dan pembicara event.
          </p>
        </div>
      </div>
    </div>
  );
}