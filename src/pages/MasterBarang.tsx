import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Search, Edit, Trash2, Package } from 'lucide-react';
import { 
  dummyBarang, 
  getBarangByLab,
  getKategoriById, 
  getLabById,
  dummyKategori
} from '@/data/dummy';
import { useAuth } from '@/contexts/AuthContext';

export const MasterBarang: React.FC = () => {
  const { getUserLab } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const userLabId = getUserLab();
  
  // Filter barang berdasarkan lab admin dan search term
  let filteredBarang = userLabId ? getBarangByLab(userLabId) : dummyBarang;
  
  if (searchTerm) {
    filteredBarang = filteredBarang.filter(item =>
      item.nama_barang.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getKategoriById(item.kategori_id)?.nama_kategori.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const getStatusBadge = (status: string) => {
    return status === 'aktif' 
      ? <Badge variant="default" className="bg-success/20 text-success border-success/30">Aktif</Badge>
      : <Badge variant="secondary">Non-Aktif</Badge>;
  };

  const getStockBadge = (stok: number) => {
    if (stok <= 5) {
      return <Badge variant="destructive">{stok}</Badge>;
    } else if (stok <= 20) {
      return <Badge variant="secondary" className="bg-warning/20 text-warning border-warning/30">{stok}</Badge>;
    }
    return <Badge variant="outline">{stok}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Master Data Barang</h1>
          <p className="text-muted-foreground mt-1">
            Kelola data barang inventaris laboratorium
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-light">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Barang
            </Button>
          </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Tambah Barang Baru</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Kode Barang</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                        placeholder="Masukkan kode barang"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Nama Barang</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                        placeholder="Masukkan nama barang"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Kategori</label>
                      <select className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground">
                        <option value="">Pilih Kategori</option>
                        {dummyKategori.map(kategori => (
                          <option key={kategori.kategori_id} value={kategori.kategori_id}>
                            {kategori.nama_kategori}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Satuan</label>
                      <select className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground">
                        <option value="">Pilih Satuan</option>
                        <option value="pcs">Pcs</option>
                        <option value="unit">Unit</option>
                        <option value="botol">Botol</option>
                        <option value="pack">Pack</option>
                        <option value="kit">Kit</option>
                        <option value="box">Box</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Stok</label>
                      <input 
                        type="number" 
                        className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                        placeholder="0"
                        min="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Stok Minimum</label>
                      <input 
                        type="number" 
                        className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                        placeholder="0"
                        min="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Harga Satuan</label>
                      <input 
                        type="number" 
                        className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                        placeholder="0"
                        min="0"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Lokasi Penyimpanan</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                      placeholder="Rak/Lemari/Lokasi penyimpanan"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Deskripsi</label>
                    <textarea 
                      className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground resize-none"
                      rows={3}
                      placeholder="Deskripsi barang (spesifikasi, keterangan)"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Status</label>
                    <select className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground">
                      <option value="aktif">Aktif</option>
                      <option value="nonaktif">Non-aktif</option>
                    </select>
                  </div>
                  
                  <div className="flex gap-2 justify-end pt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Batal
                    </Button>
                    <Button type="submit" className="bg-primary hover:bg-primary-light">
                      Simpan Barang
                    </Button>
                  </div>
                </form>
              </div>
            </DialogContent>
        </Dialog>
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
                <p className="text-2xl font-bold">{filteredBarang.length}</p>
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
                <p className="text-2xl font-bold">
                  {filteredBarang.filter(item => item.status === 'aktif').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-destructive/20 rounded-lg">
                <Package className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Stok Rendah</p>
                <p className="text-2xl font-bold">
                  {filteredBarang.filter(item => item.stok <= 5).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Daftar Barang</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Cari nama barang atau kategori..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Table */}
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Barang</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Stok</TableHead>
                  <TableHead>Satuan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Harga Satuan</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBarang.map((item) => {
                  const kategori = getKategoriById(item.kategori_id);
                  return (
                    <TableRow key={item.barang_id}>
                      <TableCell className="font-medium">{item.nama_barang}</TableCell>
                      <TableCell>{kategori?.nama_kategori || '-'}</TableCell>
                      <TableCell>{getStockBadge(item.stok)}</TableCell>
                      <TableCell>{item.satuan}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>
                        {item.harga_satuan ? `Rp ${item.harga_satuan.toLocaleString('id-ID')}` : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredBarang.length === 0 && (
            <div className="text-center py-8">
              <Package className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">
                {searchTerm ? 'Tidak ada barang yang ditemukan' : 'Belum ada data barang'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MasterBarang;