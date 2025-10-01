import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/DataTable';
import { ArrowLeft, Package, AlertTriangle, Building2, ChevronRight } from 'lucide-react';
import { 
  dummyBarang, 
  dummyLaboratorium,
  Laboratorium,
  getKategoriById, 
  getLabById,
  getBarangByLab,
  getCategoryColor
} from '@/data/dummy';
import { useAuth } from '@/contexts/AuthContext';

export const DataInventaris: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLabId, setSelectedLabId] = useState<number | null>(null);
  const { isAdmin, getUserLab } = useAuth();
  
  const userLabId = getUserLab();
  
  // Get available labs based on user role
  const availableLabs = isAdmin() && userLabId 
    ? dummyLaboratorium.filter(lab => lab.lab_id === userLabId)
    : dummyLaboratorium.filter(lab => lab.status === 'aktif');
  
  // Get barang for selected lab
  const baseBarang = selectedLabId ? getBarangByLab(selectedLabId) : [];

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

  const getLabItemCount = (labId: number) => {
    return dummyBarang.filter(item => item.lab_id === labId).length;
  };

  const getLabLowStockCount = (labId: number) => {
    return dummyBarang.filter(item => item.lab_id === labId && item.stok <= 5).length;
  };

  // If no lab selected, show lab selection view
  if (!selectedLabId) {
    return (
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-primary">Data Inventaris</h1>
          <p className="text-muted-foreground mt-1">
            Pilih laboratorium untuk melihat data inventaris barang
          </p>
        </div>

        {/* Labs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableLabs.map((lab) => {
            const itemCount = getLabItemCount(lab.lab_id);
            const lowStockCount = getLabLowStockCount(lab.lab_id);
            
            return (
              <Card 
                key={lab.lab_id} 
                className="shadow-card hover:shadow-elevated transition-all duration-200 cursor-pointer group"
                onClick={() => setSelectedLabId(lab.lab_id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{lab.nama_lab}</h3>
                    <p className="text-sm text-muted-foreground">{lab.kode_ruang || lab.singkatan}</p>
                    <p className="text-sm text-muted-foreground">{lab.lokasi}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Barang</p>
                      <p className="text-xl font-bold">{itemCount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Stok Rendah</p>
                      <div className="flex items-center gap-1">
                        {lowStockCount > 0 && (
                          <AlertTriangle className="w-4 h-4 text-destructive" />
                        )}
                        <p className="text-xl font-bold">{lowStockCount}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // Lab selected - show item list
  const selectedLab = getLabById(selectedLabId);
  const totalItems = filteredBarang.length;
  const activeItems = filteredBarang.filter(item => item.status === 'aktif').length;
  const lowStockItems = filteredBarang.filter(item => item.stok <= 5).length;

  return (
    <div className="space-y-6">
      {/* Page Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSelectedLabId(null)}
          className="shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-primary">{selectedLab?.nama_lab}</h1>
          <p className="text-muted-foreground mt-1">
            {selectedLab?.kode_ruang} - {selectedLab?.lokasi}
          </p>
        </div>
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