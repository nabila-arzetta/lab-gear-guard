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
  { kategori_id: 1, nama_kategori: "Alat Utama", deskripsi: "Peralatan utama untuk pengujian dan analisis" },
  { kategori_id: 2, nama_kategori: "Bahan Pendukung", deskripsi: "Bahan-bahan pendukung laboratorium" },
  { kategori_id: 3, nama_kategori: "Bahan Tekstil", deskripsi: "Bahan dan material tekstil untuk pengujian" },
  { kategori_id: 4, nama_kategori: "Alat Bantu", deskripsi: "Peralatan bantu dan aksesoris laboratorium" },
];

export const dummyLaboratorium: Laboratorium[] = [
  { lab_id: 1, nama_lab: "Garment Production Laboratory", lokasi: "Lantai 1", kapasitas: 25 },
  { lab_id: 2, nama_lab: "Textile Engineering Laboratory", lokasi: "Lantai 2", kapasitas: 30 },
  { lab_id: 3, nama_lab: "Textile Chemistry Laboratory", lokasi: "Lantai 3", kapasitas: 20 },
  { lab_id: 4, nama_lab: "Master's Laboratory of Textile Engineering and Apparel", lokasi: "Lantai 4", kapasitas: 15 },
];

export const dummyUsers: User[] = [
  { user_id: 1, nama: "Admin Garment", email: "admin.garment@polban.ac.id", role: "admin", lab_id: 1, status: "aktif" },
  { user_id: 2, nama: "Admin Engineering", email: "admin.engineering@polban.ac.id", role: "admin", lab_id: 2, status: "aktif" },
  { user_id: 3, nama: "Admin Chemistry", email: "admin.chemistry@polban.ac.id", role: "admin", lab_id: 3, status: "aktif" },
  { user_id: 4, nama: "Admin Master's Lab", email: "admin.masters@polban.ac.id", role: "admin", lab_id: 4, status: "aktif" },
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