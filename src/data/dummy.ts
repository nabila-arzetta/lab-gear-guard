// Dummy data for Laboratory Inventory System

export interface Barang {
  barang_id: number;
  nama_barang: string;
  kategori_id: number;
  stok: number;
  satuan: string;
  lab_id: number;
  status: "aktif" | "nonaktif";
  deskripsi?: string;
  harga_satuan?: number;
  tanggal_masuk?: string;
}

export interface Kategori {
  kategori_id: number;
  nama_kategori: string;
  deskripsi?: string;
}

export interface Laboratorium {
  lab_id: number;
  nama_lab: string;
  lokasi: string;
  kapasitas?: number;
}

export interface User {
  user_id: number;
  nama: string;
  email: string;
  role: "admin" | "pengguna";
  lab_id?: number;
  status: "aktif" | "nonaktif";
}

export interface PermintaanBarang {
  permintaan_id: number;
  user_id: number;
  barang_id: number;
  jumlah_diminta: number;
  tanggal: string;
  status: "diproses" | "disetujui" | "ditolak";
  alasan: string;
  catatan_admin?: string;
}

export interface TransferBarang {
  transfer_id: number;
  barang_id: number;
  dari_lab: number;
  ke_lab: number;
  jumlah_transfer: number;
  tanggal: string;
  status: "menunggu" | "diterima" | "ditolak";
  catatan?: string;
  admin_id?: number;
}

// Dummy Data
export const dummyKategori: Kategori[] = [
  { kategori_id: 1, nama_kategori: "Alat Optik", deskripsi: "Peralatan untuk pengamatan dan analisis optik" },
  { kategori_id: 2, nama_kategori: "Kaca Laboratorium", deskripsi: "Peralatan berbahan kaca untuk eksperimen" },
  { kategori_id: 3, nama_kategori: "Reagent", deskripsi: "Bahan kimia dan reagent untuk analisis" },
  { kategori_id: 4, nama_kategori: "Alat Lab", deskripsi: "Peralatan umum laboratorium" },
];

export const dummyLaboratorium: Laboratorium[] = [
  { lab_id: 1, nama_lab: "Lab Biologi", lokasi: "Gedung A", kapasitas: 30 },
  { lab_id: 2, nama_lab: "Lab Kimia", lokasi: "Gedung B", kapasitas: 25 },
  { lab_id: 3, nama_lab: "Lab Fisika", lokasi: "Gedung C", kapasitas: 20 },
  { lab_id: 4, nama_lab: "Lab Komputer", lokasi: "Gedung D", kapasitas: 40 },
];

export const dummyUsers: User[] = [
  { user_id: 1, nama: "Admin Biologi", email: "admin.bio@polban.ac.id", role: "admin", lab_id: 1, status: "aktif" },
  { user_id: 2, nama: "Admin Kimia", email: "admin.kimia@polban.ac.id", role: "admin", lab_id: 2, status: "aktif" },
  { user_id: 3, nama: "Dosen Ahmad", email: "ahmad@polban.ac.id", role: "pengguna", status: "aktif" },
  { user_id: 4, nama: "Dosen Sari", email: "sari@polban.ac.id", role: "pengguna", status: "aktif" },
  { user_id: 5, nama: "Mahasiswa Budi", email: "budi@student.polban.ac.id", role: "pengguna", status: "aktif" },
];

export const dummyBarang: Barang[] = [
  {
    barang_id: 1,
    nama_barang: "Mikroskop",
    kategori_id: 1,
    stok: 5,
    satuan: "unit",
    lab_id: 1,
    status: "aktif",
    deskripsi: "Mikroskop cahaya untuk pengamatan sel",
    harga_satuan: 15000000,
    tanggal_masuk: "2024-01-15"
  },
  {
    barang_id: 2,
    nama_barang: "Tabung Reaksi",
    kategori_id: 2,
    stok: 120,
    satuan: "pcs",
    lab_id: 1,
    status: "aktif",
    deskripsi: "Tabung reaksi borosilikat 10ml",
    harga_satuan: 15000,
    tanggal_masuk: "2024-02-20"
  },
  {
    barang_id: 3,
    nama_barang: "pH Buffer Solution",
    kategori_id: 3,
    stok: 4,
    satuan: "botol",
    lab_id: 2,
    status: "aktif",
    deskripsi: "Larutan buffer pH 4.0, 7.0, 10.0",
    harga_satuan: 250000,
    tanggal_masuk: "2024-01-10"
  },
  {
    barang_id: 4,
    nama_barang: "Spatula Stainless",
    kategori_id: 4,
    stok: 2,
    satuan: "pcs",
    lab_id: 2,
    status: "aktif",
    deskripsi: "Spatula stainless steel 15cm",
    harga_satuan: 75000,
    tanggal_masuk: "2024-03-05"
  },
  {
    barang_id: 5,
    nama_barang: "Test Tube 15ml",
    kategori_id: 2,
    stok: 1,
    satuan: "pack",
    lab_id: 1,
    status: "aktif",
    deskripsi: "Test tube 15ml dengan tutup",
    harga_satuan: 180000,
    tanggal_masuk: "2024-02-28"
  },
  {
    barang_id: 6,
    nama_barang: "Pipet Mikro",
    kategori_id: 4,
    stok: 2,
    satuan: "pcs",
    lab_id: 1,
    status: "aktif",
    deskripsi: "Micropipette 10-100μL",
    harga_satuan: 3500000,
    tanggal_masuk: "2024-01-20"
  },
  {
    barang_id: 7,
    nama_barang: "Beaker Glass 500ml",
    kategori_id: 2,
    stok: 20,
    satuan: "pcs",
    lab_id: 2,
    status: "aktif",
    deskripsi: "Beaker gelas borosilikat 500ml",
    harga_satuan: 125000,
    tanggal_masuk: "2024-02-15"
  },
  {
    barang_id: 8,
    nama_barang: "Reagent Kit",
    kategori_id: 3,
    stok: 10,
    satuan: "kit",
    lab_id: 1,
    status: "aktif",
    deskripsi: "Kit reagent untuk analisis biokimia",
    harga_satuan: 850000,
    tanggal_masuk: "2024-03-10"
  }
];

export const dummyPermintaan: PermintaanBarang[] = [
  {
    permintaan_id: 1,
    user_id: 3,
    barang_id: 2,
    jumlah_diminta: 20,
    tanggal: "2025-09-20",
    status: "diproses",
    alasan: "Untuk praktikum mahasiswa semester 3"
  },
  {
    permintaan_id: 2,
    user_id: 4,
    barang_id: 1,
    jumlah_diminta: 1,
    tanggal: "2025-09-19",
    status: "disetujui",
    alasan: "Penelitian tugas akhir mahasiswa",
    catatan_admin: "Disetujui untuk 1 minggu"
  },
  {
    permintaan_id: 3,
    user_id: 5,
    barang_id: 6,
    jumlah_diminta: 1,
    tanggal: "2025-09-18",
    status: "ditolak",
    alasan: "Tugas praktikum",
    catatan_admin: "Stok sedang diperbaiki"
  }
];

export const dummyTransfer: TransferBarang[] = [
  {
    transfer_id: 1,
    barang_id: 1,
    dari_lab: 1,
    ke_lab: 2,
    jumlah_transfer: 2,
    tanggal: "2025-09-21",
    status: "menunggu",
    catatan: "Transfer untuk kebutuhan riset bersama"
  },
  {
    transfer_id: 2,
    barang_id: 7,
    dari_lab: 2,
    ke_lab: 1,
    jumlah_transfer: 5,
    tanggal: "2025-09-20",
    status: "diterima",
    catatan: "Transfer berhasil",
    admin_id: 1
  }
];

// Helper functions
export const getBarangByLab = (labId: number): Barang[] => {
  return dummyBarang.filter(barang => barang.lab_id === labId);
};

export const getKategoriById = (kategoriId: number): Kategori | undefined => {
  return dummyKategori.find(kategori => kategori.kategori_id === kategoriId);
};

export const getLabById = (labId: number): Laboratorium | undefined => {
  return dummyLaboratorium.find(lab => lab.lab_id === labId);
};

export const getUserById = (userId: number): User | undefined => {
  return dummyUsers.find(user => user.user_id === userId);
};

export const getBarangById = (barangId: number): Barang | undefined => {
  return dummyBarang.find(barang => barang.barang_id === barangId);
};

export const getLowStockItems = (labId?: number): Barang[] => {
  let items = dummyBarang.filter(barang => barang.stok <= 5);
  if (labId) {
    items = items.filter(barang => barang.lab_id === labId);
  }
  return items;
};

export const getRecentTransactions = (labId?: number, limit: number = 5): any[] => {
  // Simulate recent transactions combining transfers and requests
  const transactions = [
    { id: 1, type: "masuk", item: "Cawan", quantity: 9, time: "8 jam lalu", status: "menunggu" },
    { id: 2, type: "keluar", item: "Pipet Mikro", quantity: 5, time: "2 jam lalu", status: "menunggu" },
    { id: 3, type: "masuk", item: "Reagent Kit", quantity: 10, time: "5 jam lalu", status: "diterima" },
    { id: 4, type: "keluar", item: "Beaker Glass 500ml", quantity: 20, time: "1 jam lalu", status: "selesai" }
  ];
  return transactions.slice(0, limit);
};