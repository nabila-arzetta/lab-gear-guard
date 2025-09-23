import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { Plus, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import { 
  dummyPermintaan, 
  getUserById,
  getBarangById,
  dummyLaboratorium,
  dummyKategori,
  dummyBarang,
} from '@/data/dummy';
import { useAuth } from '@/contexts/AuthContext';

export const PermintaanBarang: React.FC = () => {
  const { isAdmin } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'diproses':
        return <Badge variant="secondary" className="bg-warning/20 text-warning border-warning/30">Diproses</Badge>;
      case 'disetujui':
        return <Badge variant="secondary" className="bg-success/20 text-success border-success/30">Disetujui</Badge>;
      case 'ditolak':
        return <Badge variant="destructive">Ditolak</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'diproses':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'disetujui':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'ditolak':
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            {isAdmin() ? 'Kelola Permintaan Barang' : 'Permintaan Barang'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isAdmin() 
              ? 'Tinjau dan proses permintaan barang dari pengguna'
              : 'Ajukan permintaan barang untuk kebutuhan laboratorium'
            }
          </p>
        </div>
        {!isAdmin() && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary-light">
                <Plus className="w-4 h-4 mr-2" />
                Ajukan Permintaan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Ajukan Permintaan Barang</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Laboratorium</label>
                      <select className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground">
                        <option value="">Pilih Laboratorium</option>
                        {dummyLaboratorium.map(lab => (
                          <option key={lab.lab_id} value={lab.lab_id}>
                            {lab.nama_lab} - {lab.lokasi}
                          </option>
                        ))}
                      </select>
                    </div>
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
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Barang</label>
                    <select className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground">
                      <option value="">Pilih Barang</option>
                      {dummyBarang.map(barang => (
                        <option key={barang.barang_id} value={barang.barang_id}>
                          {barang.nama_barang} (Stok: {barang.stok} {barang.satuan})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Jumlah</label>
                      <input 
                        type="number" 
                        className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                        placeholder="Masukkan jumlah"
                        min="1"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Jenis Permintaan</label>
                      <select className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground">
                        <option value="lab">Lab/Logistik</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Alasan Permintaan</label>
                    <textarea 
                      className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground resize-none"
                      rows={3}
                      placeholder="Jelaskan alasan permintaan barang..."
                    />
                  </div>
                  
                  <div className="flex gap-2 justify-end pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Batal
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-primary hover:bg-primary-light"
                    >
                      Ajukan Permintaan
                    </Button>
                  </div>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/20 rounded-lg">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Permintaan</p>
                <p className="text-2xl font-bold">{dummyPermintaan.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-warning/20 rounded-lg">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Diproses</p>
                <p className="text-2xl font-bold">
                  {dummyPermintaan.filter(req => req.status === 'diproses').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-success/20 rounded-lg">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Disetujui</p>
                <p className="text-2xl font-bold">
                  {dummyPermintaan.filter(req => req.status === 'disetujui').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-destructive/20 rounded-lg">
                <XCircle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ditolak</p>
                <p className="text-2xl font-bold">
                  {dummyPermintaan.filter(req => req.status === 'ditolak').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requests Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>
            {isAdmin() ? 'Daftar Permintaan' : 'Riwayat Permintaan Anda'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Pemohon</TableHead>
                  <TableHead>Barang</TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Alasan</TableHead>
                  {isAdmin() && <TableHead className="text-right">Aksi</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyPermintaan.map((request) => {
                  const user = getUserById(request.user_id);
                  const barang = getBarangById(request.barang_id);
                  return (
                    <TableRow key={request.permintaan_id}>
                      <TableCell className="font-medium">#{request.permintaan_id}</TableCell>
                      <TableCell>{user?.nama || 'Unknown'}</TableCell>
                      <TableCell>{barang?.nama_barang || 'Unknown'}</TableCell>
                      <TableCell>{request.jumlah_diminta}</TableCell>
                      <TableCell>{request.tanggal}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell className="max-w-xs truncate">{request.alasan}</TableCell>
                      {isAdmin() && (
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            {request.status === 'diproses' && (
                              <>
                                <Button variant="ghost" size="sm" className="text-success">
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-destructive">
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {dummyPermintaan.length === 0 && (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">Belum ada permintaan barang</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PermintaanBarang;