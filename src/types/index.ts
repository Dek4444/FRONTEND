export interface CategoryEvent {
  id: number;
  nama: string;
  deskripsi?: string;
}

export interface Pembicara {
  id: number;
  nama: string;
  keahlian?: string;
  email?: string;
}

export interface EventItem {
  id: number;
  judul: string;
  deskripsi?: string;
  tanggal: string;
  lokasi: string;
  categoryId: number;
  pembicaraId: number;
  category?: CategoryEvent;
  pembicara?: Pembicara;
}
