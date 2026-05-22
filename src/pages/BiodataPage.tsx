export default function BiodataPage() {
  return (
    <div className="card">
      <h2 className="mb-4 text-2xl font-bold">Biodata Mahasiswa</h2>

      <table className="w-full border">
        <tbody>
          <tr className="border-b">
            <td className="w-52 bg-gray-100 p-3 font-semibold">NIM</td>
            <td className="p-3">24090122</td>
          </tr>
          <tr className="border-b">
            <td className="bg-gray-100 p-3 font-semibold">Nama</td>
            <td className="p-3">Deka Setiawan</td>
          </tr>
          <tr className="border-b">
            <td className="bg-gray-100 p-3 font-semibold">Program Studi</td>
            <td className="p-3">Sistem Informasi</td>
          </tr>
          <tr>
            <td className="bg-gray-100 p-3 font-semibold">Informasi Lainnya</td>
            <td className="p-3">
              Website EVENTMS dibuat menggunakan React, TypeScript, Tailwind CSS,
              Zustand, Express, Prisma, dan Supabase PostgreSQL.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
