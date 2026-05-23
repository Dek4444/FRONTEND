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
            <td className="p-3">Aurelio Deca Setyawan</td>
          </tr>

          <tr className="border-b">
            <td className="bg-gray-100 p-3 font-semibold">
              Program Studi
            </td>
            <td className="p-3">Informatic Engineering</td>
          </tr>

          <tr>
            <td className="bg-gray-100 p-3 font-semibold">
              Informasi Lainnya
            </td>

            <td className="space-y-2 p-3">
              <div>
                <a
                  href="https://instagram.com/dekastywn_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:underline"
                >
                  Instagram: @dekastywn_
                </a>
              </div>

              <div>
                <a
                  href="https://github.com/Dek4444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Github: Dek4444
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}