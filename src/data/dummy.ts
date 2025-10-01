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
  kode_ruang?: string;
  singkatan?: string;
  lokasi: string;
  kapasitas: number;
  status?: string;
  kode_bagian?: number;
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
  { kategori_id: 1, nama_kategori: "Alat Utama", deskripsi: "Peralatan utama untuk pengujian dan analisis" },
  { kategori_id: 2, nama_kategori: "Bahan Pendukung", deskripsi: "Bahan-bahan pendukung laboratorium" },
  { kategori_id: 3, nama_kategori: "Bahan Tekstil", deskripsi: "Bahan dan material tekstil untuk pengujian" },
  { kategori_id: 4, nama_kategori: "Alat Bantu", deskripsi: "Peralatan bantu dan aksesoris laboratorium" },
];

export const dummyLaboratorium: Laboratorium[] = [
  { lab_id: 3, nama_lab: 'LAB. BAHASA', kode_ruang: 'L-BHS', singkatan: 'LBHS', lokasi: 'Gedung A', kapasitas: 30, status: 'aktif', kode_bagian: 201 },
  { lab_id: 4, nama_lab: 'LAB. PENCELUPAN', kode_ruang: 'L-CL1', singkatan: 'LCL', lokasi: 'Gedung A', kapasitas: 30, status: 'aktif', kode_bagian: 202 },
  { lab_id: 5, nama_lab: 'LAB. PENCELUPAN', kode_ruang: 'L-CL2', singkatan: 'LCL', lokasi: 'Gedung A', kapasitas: 30, status: 'aktif', kode_bagian: 202 },
  { lab_id: 6, nama_lab: 'LAB. PENCELUPAN', kode_ruang: 'L-CL3', singkatan: 'LCL', lokasi: 'Gedung A', kapasitas: 30, status: 'non-aktif', kode_bagian: 202 },
  { lab_id: 7, nama_lab: 'LAB. PENCAPAN', kode_ruang: 'L-CP1', singkatan: 'LCP', lokasi: 'Gedung B', kapasitas: 30, status: 'aktif', kode_bagian: 203 },
  { lab_id: 8, nama_lab: 'LAB. PENCAPAN', kode_ruang: 'L-CP2', singkatan: 'LCP', lokasi: 'Gedung B', kapasitas: 30, status: 'aktif', kode_bagian: 203 },
  { lab_id: 9, nama_lab: 'LAB. PENCAPAN', kode_ruang: 'L-CP3', singkatan: 'LCP', lokasi: 'Gedung B', kapasitas: 30, status: 'non-aktif', kode_bagian: 203 },
  { lab_id: 10, nama_lab: 'LAB. DESAIN', kode_ruang: 'L-DS1', singkatan: 'LDS', lokasi: 'Gedung C', kapasitas: 30, status: 'aktif', kode_bagian: 204 },
  { lab_id: 11, nama_lab: 'LAB. DESAIN', kode_ruang: 'L-DS2', singkatan: 'LDS', lokasi: 'Gedung C', kapasitas: 30, status: 'aktif', kode_bagian: 204 },
  { lab_id: 12, nama_lab: 'LAB. DESAIN', kode_ruang: 'L-DS3', singkatan: 'LDS', lokasi: 'Gedung C', kapasitas: 30, status: 'non-aktif', kode_bagian: 204 },
  { lab_id: 13, nama_lab: 'LAB. EVALUASI FISIKA', kode_ruang: 'LEVF1', singkatan: 'LEVF', lokasi: 'Gedung D', kapasitas: 30, status: 'aktif', kode_bagian: 205 },
  { lab_id: 14, nama_lab: 'LAB. EVALUASI FISIKA', kode_ruang: 'LEVF2', singkatan: 'LEVF', lokasi: 'Gedung D', kapasitas: 30, status: 'aktif', kode_bagian: 205 },
  { lab_id: 15, nama_lab: 'LAB. EVALUASI FISIKA & KIMIA', kode_ruang: 'LEVF3', singkatan: 'LEVF', lokasi: 'Gedung D', kapasitas: 30, status: 'non-aktif', kode_bagian: 205 },
  { lab_id: 16, nama_lab: 'LAB. EVALUASI GABUNGAN', kode_ruang: 'LEVGB', singkatan: 'LEVG', lokasi: 'Gedung D', kapasitas: 30, status: 'non-aktif', kode_bagian: 205 },
  { lab_id: 17, nama_lab: 'LAB. EVALUASI KIMIA', kode_ruang: 'LEVK1', singkatan: 'LEVK', lokasi: 'Gedung E', kapasitas: 30, status: 'aktif', kode_bagian: 206 },
  { lab_id: 18, nama_lab: 'LAB. EVALUASI KIMIA', kode_ruang: 'LEVK2', singkatan: 'LEVK', lokasi: 'Gedung E', kapasitas: 30, status: 'aktif', kode_bagian: 206 },
  { lab_id: 19, nama_lab: 'LAB. EVALUASI KIMIA & FISIKA', kode_ruang: 'LEVK3', singkatan: 'LEVK', lokasi: 'Gedung E', kapasitas: 30, status: 'non-aktif', kode_bagian: 206 },
  { lab_id: 20, nama_lab: 'LAB. FISIKA', kode_ruang: 'L-FSK', singkatan: 'LFSK', lokasi: 'Gedung F', kapasitas: 30, status: 'aktif', kode_bagian: 207 },
  { lab_id: 21, nama_lab: 'LAB. GAMBAR TEKNIK', kode_ruang: 'L-GT', singkatan: 'LGT', lokasi: 'Gedung G', kapasitas: 30, status: 'aktif', kode_bagian: 208 },
  { lab_id: 22, nama_lab: 'LAB. JACQUARD IGI', kode_ruang: 'L-JQR', singkatan: 'LJQR', lokasi: 'Gedung H', kapasitas: 30, status: 'non-aktif', kode_bagian: 215 },
  { lab_id: 23, nama_lab: 'LAB. KIMIA ANALISA LANTAI 3', kode_ruang: 'L-KA1', singkatan: 'LKA', lokasi: 'Gedung I Lt. 3', kapasitas: 30, status: 'aktif', kode_bagian: 209 },
  { lab_id: 24, nama_lab: 'LAB. KIMIA ANALISA LANTAI 3', kode_ruang: 'L-KA2', singkatan: 'LKA', lokasi: 'Gedung I Lt. 3', kapasitas: 30, status: 'aktif', kode_bagian: 209 },
  { lab_id: 25, nama_lab: 'LAB. KIMIA ANALISA LANTAI 3', kode_ruang: 'L-KA3', singkatan: 'LKA', lokasi: 'Gedung I Lt. 3', kapasitas: 30, status: 'non-aktif', kode_bagian: 209 },
  { lab_id: 26, nama_lab: 'LAB. KIMIA ANALISA LANTAI 4', kode_ruang: 'L-KA4', singkatan: 'LKA', lokasi: 'Gedung I Lt. 4', kapasitas: 30, status: 'non-aktif', kode_bagian: 209 },
  { lab_id: 27, nama_lab: 'LAB. KIMIA ANALISA LANTAI 4', kode_ruang: 'L-KA5', singkatan: 'LKA', lokasi: 'Gedung I Lt. 4', kapasitas: 30, status: 'non-aktif', kode_bagian: 209 },
  { lab_id: 28, nama_lab: 'LAB. KIMIA ANALISA LANTAI 4', kode_ruang: 'L-KA6', singkatan: 'LKA', lokasi: 'Gedung I Lt. 4', kapasitas: 30, status: 'non-aktif', kode_bagian: 209 },
  { lab_id: 29, nama_lab: 'LAB. KIMIA FISIKA TEKSTIL', kode_ruang: 'LKFT1', singkatan: 'LKFT', lokasi: 'Gedung J', kapasitas: 30, status: 'aktif', kode_bagian: 210 },
  { lab_id: 30, nama_lab: 'LAB. KIMIA FISIKA TEKSTIL', kode_ruang: 'LKFT2', singkatan: 'LKFT', lokasi: 'Gedung J', kapasitas: 30, status: 'aktif', kode_bagian: 210 },
  { lab_id: 31, nama_lab: 'LAB. KOMPUTER', kode_ruang: 'L-KMP', singkatan: 'LKMP', lokasi: 'Gedung K', kapasitas: 30, status: 'aktif', kode_bagian: 211 },
  { lab_id: 32, nama_lab: 'LAB. PEMINTALAN', kode_ruang: 'L-PT1', singkatan: 'LPT', lokasi: 'Gedung L', kapasitas: 30, status: 'aktif', kode_bagian: 212 },
  { lab_id: 33, nama_lab: 'LAB. PEMINTALAN', kode_ruang: 'L-PT2', singkatan: 'LPT', lokasi: 'Gedung L', kapasitas: 30, status: 'aktif', kode_bagian: 212 },
  { lab_id: 34, nama_lab: 'LAB. PERAJUTAN', kode_ruang: 'L-RJ1', singkatan: 'LRJ', lokasi: 'Gedung M', kapasitas: 30, status: 'aktif', kode_bagian: 213 },
  { lab_id: 35, nama_lab: 'LAB. PERAJUTAN', kode_ruang: 'L-RJ2', singkatan: 'LRJ', lokasi: 'Gedung M', kapasitas: 30, status: 'aktif', kode_bagian: 213 },
  { lab_id: 36, nama_lab: 'LAB. PERAJUTAN', kode_ruang: 'L-RJ3', singkatan: 'LRJ', lokasi: 'Gedung M', kapasitas: 30, status: 'non-aktif', kode_bagian: 213 },
  { lab_id: 37, nama_lab: 'LAB. PERTENUNAN', kode_ruang: 'L-TN1', singkatan: 'LTN', lokasi: 'Gedung N', kapasitas: 30, status: 'aktif', kode_bagian: 214 },
  { lab_id: 38, nama_lab: 'LAB. PERTENUNAN', kode_ruang: 'L-TN2', singkatan: 'LTN', lokasi: 'Gedung N', kapasitas: 30, status: 'aktif', kode_bagian: 214 },
  { lab_id: 39, nama_lab: 'LAB. PERTENUNAN', kode_ruang: 'L-TN3', singkatan: 'LTN', lokasi: 'Gedung N', kapasitas: 30, status: 'non-aktif', kode_bagian: 214 },
  { lab_id: 40, nama_lab: 'LAB. TEXPRO IGI', kode_ruang: 'L-TXP', singkatan: 'LTXP', lokasi: 'Gedung O', kapasitas: 30, status: 'non-aktif', kode_bagian: 215 },
  // Keep original 4 labs for backward compatibility with existing barang data
  { lab_id: 1, nama_lab: "Garment Production Laboratory", kode_ruang: 'GPL', singkatan: 'GPL', lokasi: "Lantai 1", kapasitas: 25, status: 'aktif' },
  { lab_id: 2, nama_lab: "Textile Engineering Laboratory", kode_ruang: 'TEL', singkatan: 'TEL', lokasi: "Lantai 2", kapasitas: 30, status: 'aktif' },
];

export const dummyUsers: User[] = [
  { user_id: 1, nama: "Admin Lab Pencelupan", email: "admin.pencelupan@polban.ac.id", role: "admin", lab_id: 4, status: "aktif" },
  { user_id: 2, nama: "Admin Lab Pencapan", email: "admin.pencapan@polban.ac.id", role: "admin", lab_id: 7, status: "aktif" },
  { user_id: 3, nama: "Admin Lab Desain", email: "admin.desain@polban.ac.id", role: "admin", lab_id: 10, status: "aktif" },
  { user_id: 4, nama: "Admin Lab Evaluasi Fisika", email: "admin.evaluasi@polban.ac.id", role: "admin", lab_id: 13, status: "aktif" },
  { user_id: 5, nama: "Dosen Ahmad", email: "ahmad@polban.ac.id", role: "pengguna", status: "aktif" },
  { user_id: 6, nama: "Dosen Sari", email: "sari@polban.ac.id", role: "pengguna", status: "aktif" },
  { user_id: 7, nama: "Mahasiswa Budi", email: "budi@student.polban.ac.id", role: "pengguna", status: "aktif" },
];

export const dummyBarang: Barang[] = [
  // Garment Production Laboratory (Lab 1)
  {
    barang_id: 1,
    nama_barang: "Fibrograph",
    kategori_id: 1,
    stok: 2,
    satuan: "unit",
    lab_id: 1,
    status: "aktif",
    deskripsi: "Alat pengukur panjang serat kapas",
    harga_satuan: 85000000,
    tanggal_masuk: "2024-01-15"
  },
  {
    barang_id: 2,
    nama_barang: "Kompresor",
    kategori_id: 2,
    stok: 3,
    satuan: "unit",
    lab_id: 1,
    status: "aktif",
    deskripsi: "Kompresor udara untuk alat pneumatik",
    harga_satuan: 12000000,
    tanggal_masuk: "2024-02-20"
  },
  {
    barang_id: 3,
    nama_barang: "Kapas Uji",
    kategori_id: 3,
    stok: 50,
    satuan: "kg",
    lab_id: 1,
    status: "aktif",
    deskripsi: "Kapas untuk sampel pengujian serat",
    harga_satuan: 85000,
    tanggal_masuk: "2024-01-10"
  },
  
  // Textile Engineering Laboratory (Lab 2)
  {
    barang_id: 4,
    nama_barang: "Micronaire",
    kategori_id: 1,
    stok: 1,
    satuan: "unit",
    lab_id: 2,
    status: "aktif",
    deskripsi: "Alat pengukur fineness dan maturity serat",
    harga_satuan: 120000000,
    tanggal_masuk: "2024-03-05"
  },
  {
    barang_id: 5,
    nama_barang: "Microscope",
    kategori_id: 1,
    stok: 4,
    satuan: "unit",
    lab_id: 2,
    status: "aktif",
    deskripsi: "Mikroskop untuk analisis serat tekstil",
    harga_satuan: 25000000,
    tanggal_masuk: "2024-02-28"
  },
  {
    barang_id: 6,
    nama_barang: "Benang Uji",
    kategori_id: 3,
    stok: 25,
    satuan: "cone",
    lab_id: 2,
    status: "aktif",
    deskripsi: "Benang untuk pengujian kekuatan",
    harga_satuan: 45000,
    tanggal_masuk: "2024-01-20"
  },
  
  // Textile Chemistry Laboratory (Lab 3)
  {
    barang_id: 7,
    nama_barang: "Stelometer",
    kategori_id: 1,
    stok: 2,
    satuan: "unit",
    lab_id: 3,
    status: "aktif",
    deskripsi: "Alat uji kekuatan serat kapas",
    harga_satuan: 95000000,
    tanggal_masuk: "2024-02-15"
  },
  {
    barang_id: 8,
    nama_barang: "Oven",
    kategori_id: 2,
    stok: 3,
    satuan: "unit",
    lab_id: 3,
    status: "aktif",
    deskripsi: "Oven pengering untuk preparasi sampel",
    harga_satuan: 15000000,
    tanggal_masuk: "2024-03-10"
  },
  {
    barang_id: 9,
    nama_barang: "Kain Katun",
    kategori_id: 3,
    stok: 15,
    satuan: "meter",
    lab_id: 3,
    status: "aktif",
    deskripsi: "Kain katun untuk pengujian kimia",
    harga_satuan: 125000,
    tanggal_masuk: "2024-01-25"
  },
  
  // Master's Laboratory (Lab 4)
  {
    barang_id: 10,
    nama_barang: "Instron",
    kategori_id: 1,
    stok: 1,
    satuan: "unit",
    lab_id: 4,
    status: "aktif",
    deskripsi: "Universal testing machine untuk pengujian mekanik",
    harga_satuan: 450000000,
    tanggal_masuk: "2024-01-05"
  },
  {
    barang_id: 11,
    nama_barang: "Martindale Wear Tester",
    kategori_id: 1,
    stok: 2,
    satuan: "unit",
    lab_id: 4,
    status: "aktif",
    deskripsi: "Alat uji ketahanan aus dan abrasi",
    harga_satuan: 180000000,
    tanggal_masuk: "2024-02-10"
  },
  {
    barang_id: 12,
    nama_barang: "Sample Fabric",
    kategori_id: 3,
    stok: 30,
    satuan: "lembar",
    lab_id: 4,
    status: "aktif",
    deskripsi: "Sampel kain untuk penelitian mahasiswa S2",
    harga_satuan: 75000,
    tanggal_masuk: "2024-03-01"
  },
  
  // Additional items spread across labs
  {
    barang_id: 13,
    nama_barang: "Pinset",
    kategori_id: 4,
    stok: 20,
    satuan: "pcs",
    lab_id: 1,
    status: "aktif",
    deskripsi: "Pinset untuk handling sampel serat",
    harga_satuan: 25000,
    tanggal_masuk: "2024-02-05"
  },
  {
    barang_id: 14,
    nama_barang: "Botol Timbang",
    kategori_id: 2,
    stok: 15,
    satuan: "pcs",
    lab_id: 2,
    status: "aktif",
    deskripsi: "Botol timbang untuk preparasi sampel",
    harga_satuan: 85000,
    tanggal_masuk: "2024-01-30"
  },
  {
    barang_id: 15,
    nama_barang: "Twist Tester",
    kategori_id: 1,
    stok: 1,
    satuan: "unit",
    lab_id: 3,
    status: "aktif",
    deskripsi: "Alat pengujian antiran benang",
    harga_satuan: 65000000,
    tanggal_masuk: "2024-02-20"
  },
  {
    barang_id: 16,
    nama_barang: "Polyester Thread",
    kategori_id: 3,
    stok: 3,
    satuan: "cone",
    lab_id: 4,
    status: "aktif",
    deskripsi: "Benang polyester untuk penelitian",
    harga_satuan: 125000,
    tanggal_masuk: "2024-03-08"
  }
];

export const dummyPermintaan: PermintaanBarang[] = [
  {
    permintaan_id: 1,
    user_id: 5,
    barang_id: 2,
    jumlah_diminta: 1,
    tanggal: "2025-09-20",
    status: "diproses",
    alasan: "Untuk praktikum mahasiswa semester 3"
  },
  {
    permintaan_id: 2,
    user_id: 6,
    barang_id: 1,
    jumlah_diminta: 1,
    tanggal: "2025-09-19",
    status: "disetujui",
    alasan: "Penelitian tugas akhir mahasiswa",
    catatan_admin: "Disetujui untuk 1 minggu"
  },
  {
    permintaan_id: 3,
    user_id: 7,
    barang_id: 5,
    jumlah_diminta: 2,
    tanggal: "2025-09-18",
    status: "ditolak",
    alasan: "Tugas praktikum",
    catatan_admin: "Stok sedang diperbaiki"
  },
  {
    permintaan_id: 4,
    user_id: 5,
    barang_id: 10,
    jumlah_diminta: 1,
    tanggal: "2025-09-17",
    status: "diproses",
    alasan: "Penelitian material tekstil"
  }
];

export const dummyTransfer: TransferBarang[] = [
  {
    transfer_id: 1,
    barang_id: 5,
    dari_lab: 2,
    ke_lab: 3,
    jumlah_transfer: 1,
    tanggal: "2025-09-21",
    status: "menunggu",
    catatan: "Transfer untuk kebutuhan riset bersama"
  },
  {
    transfer_id: 2,
    barang_id: 14,
    dari_lab: 2,
    ke_lab: 4,
    jumlah_transfer: 5,
    tanggal: "2025-09-20",
    status: "diterima",
    catatan: "Transfer berhasil",
    admin_id: 2
  },
  {
    transfer_id: 3,
    barang_id: 3,
    dari_lab: 1,
    ke_lab: 3,
    jumlah_transfer: 10,
    tanggal: "2025-09-19",
    status: "menunggu",
    catatan: "Transfer sampel untuk pengujian kimia"
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
    { id: 1, type: "masuk", item: "Microscope", quantity: 1, time: "8 jam lalu", status: "menunggu" },
    { id: 2, type: "keluar", item: "Benang Uji", quantity: 5, time: "2 jam lalu", status: "menunggu" },
    { id: 3, type: "masuk", item: "Sample Fabric", quantity: 10, time: "5 jam lalu", status: "diterima" },
    { id: 4, type: "keluar", item: "Kapas Uji", quantity: 20, time: "1 jam lalu", status: "selesai" },
    { id: 5, type: "masuk", item: "Pinset", quantity: 15, time: "12 jam lalu", status: "diterima" }
  ];
  return transactions.slice(0, limit);
};

// Helper function to get category color class for UI
export const getCategoryColor = (kategoriId: number): string => {
  switch (kategoriId) {
    case 1: // Alat Utama - Blue neon (alat yang dipasang di alat)
      return "bg-primary";
    case 2: // Bahan Pendukung - Green (hijau bahan pendukung)  
      return "bg-success";
    case 3: // Bahan Tekstil - Yellow (kuning bahan tekstil)
      return "bg-warning";
    case 4: // Alat Bantu - Purple
      return "bg-primary-accent";
    default:
      return "bg-primary";
  }
};