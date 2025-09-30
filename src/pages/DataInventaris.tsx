import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/DataTable';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Package, AlertTriangle } from 'lucide-react';
import { 
  dummyBarang, 
  dummyLaboratorium,
  getKategoriById, 
  getLabById,
  getBarangByLab,
  getCategoryColor
} from '@/data/dummy';
import { useAuth } from '@/contexts/AuthContext';

export const DataInventaris: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLabId, setSelectedLabId] = useState<string>('all');
  const { isAdmin, getUserLab } = useAuth();
  
  // Get data based on user role
  // Users can see all labs and select which one to view
  // Admins only see their lab
  const userLabId = getUserLab();
  let baseBarang = dummyBarang;
  
  if (isAdmin() && userLabId) {
    // Admin only sees their lab
    baseBarang = getBarangByLab(userLabId);
  } else if (!isAdmin()) {
    // User can select which lab to view
    if (selectedLabId !== 'all') {
      baseBarang = getBarangByLab(Number(selectedLabId));
    }
  }

  // Filter data based on search term
  const filteredBarang = searchTerm 
    ? baseBarang.filter(item =>
        item.nama_barang.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getKategoriById(item.kategori_id)?.nama_kategori.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : baseBarang;

  const getStatusBadge = (status: string) => {
    return status === 'aktif' 
      ? <Badge variant="default" className="bg-success/20 text-success border-success/30">Aktif</Badge>
      : <Badge variant="secondary">Non-Aktif</Badge>;
  };

  const getStockBadge = (stok: number) => {
    if (stok <= 5) {
      return (
        <div className="flex items-center gap-1">
          <AlertTriangle className="w-3 h-3 text-destructive" />
          <Badge variant="destructive">{stok}</Badge>
        </div>
      );
    } else if (stok <= 20) {
      return <Badge variant="secondary" className="bg-warning/20 text-warning border-warning/30">{stok}</Badge>;
    }
    return <Badge variant="outline">{stok}</Badge>;
  };

  const getCategoryBadge = (kategoriId: number) => {
    const kategori = getKategoriById(kategoriId);
    const colorClass = getCategoryColor(kategoriId);
    return (
      <Badge variant="outline" className={`${colorClass} text-white border-none`}>
        {kategori?.nama_kategori || 'Unknown'}
      </Badge>
    );
  };

  const columns = [
    {
      key: 'nama_barang',
      header: 'Nama Barang',
      className: 'font-medium',
    },
    {
      key: 'kategori_id',
      header: 'Kategori',
      render: (item: any) => getCategoryBadge(item.kategori_id),
    },
    {
      key: 'stok',
      header: 'Stok',
      render: (item: any) => getStockBadge(item.stok),
    },
    {
      key: 'satuan',
      header: 'Satuan',
    },
    {
      key: 'lab_id',
      header: 'Laboratorium',
      render: (item: any) => getLabById(item.lab_id)?.nama_lab || '-',
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: any) => getStatusBadge(item.status),
    },
    {
      key: 'deskripsi',
      header: 'Deskripsi',
      render: (item: any) => (
        <span className="max-w-xs truncate block" title={item.deskripsi}>
          {item.deskripsi || '-'}
        </span>
      ),
    },
  ];

  const totalItems = filteredBarang.length;
  const activeItems = filteredBarang.filter(item => item.status === 'aktif').length;
  const lowStockItems = filteredBarang.filter(item => item.stok <= 5).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Data Inventaris</h1>
          <p className="text-muted-foreground mt-1">
            Lihat data inventaris barang laboratorium
          </p>
        </div>
        
        {/* Lab Selection for Users Only */}
        {!isAdmin() && (
          <div className="w-full sm:w-64">
            <Select value={selectedLabId} onValueChange={setSelectedLabId}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Laboratorium" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Laboratorium</SelectItem>
                {dummyLaboratorium.map((lab) => (
                  <SelectItem key={lab.lab_id} value={lab.lab_id.toString()}>
                    {lab.nama_lab}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/20 rounded-lg">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Barang</p>
                <p className="text-2xl font-bold">{totalItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-success/20 rounded-lg">
                <Package className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Barang Aktif</p>
                <p className="text-2xl font-bold">{activeItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-destructive/20 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Stok Rendah</p>
                <p className="text-2xl font-bold">{lowStockItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Daftar Inventaris Barang</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredBarang}
            columns={columns}
            searchPlaceholder="Cari nama barang atau kategori..."
            onSearch={setSearchTerm}
            searchTerm={searchTerm}
            emptyMessage={
              searchTerm 
                ? "Tidak ada barang yang ditemukan dengan kata kunci tersebut"
                : "Belum ada data inventaris"
            }
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DataInventaris;