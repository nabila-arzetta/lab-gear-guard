import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/DataTable';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, CheckCircle, XCircle, Clock, Eye, FileText } from 'lucide-react';
import { 
  dummyPermintaan, 
  dummyBarang,
  dummyLaboratorium,
  dummyKategori,
  getUserById,
  getBarangById,
  getLabById,
  PermintaanBarang as PermintaanType
} from '@/data/dummy';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const PermintaanBarang: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<PermintaanType | null>(null);
  const [formData, setFormData] = useState({
    lab_id: '',
    kategori_id: '',
    barang_id: '',
    jumlah_diminta: '',
    alasan: ''
  });
  
  const { isAdmin, getUserLab, user } = useAuth();
  const { toast } = useToast();

  // Filter requests based on user role
  const basePermintaan = isAdmin() && getUserLab() ?
    dummyPermintaan.filter(req => {
      const barang = dummyBarang.find(b => b.barang_id === req.barang_id);
      return barang?.lab_id === getUserLab();
    }) :
    isAdmin() ? dummyPermintaan :
    dummyPermintaan.filter(req => req.user_id === user?.user_id);

  // Filter by search term
  const filteredPermintaan = basePermintaan.filter(req => {
    const user = getUserById(req.user_id);
    const barang = getBarangById(req.barang_id);
    return (
      user?.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      barang?.nama_barang.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.alasan.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Get available barang based on selected lab and category
  const availableBarang = dummyBarang.filter(barang => {
    const labMatch = !formData.lab_id || barang.lab_id === parseInt(formData.lab_id);
    const categoryMatch = !formData.kategori_id || barang.kategori_id === parseInt(formData.kategori_id);
    const statusMatch = barang.status === 'aktif' && barang.stok > 0;
    return labMatch && categoryMatch && statusMatch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.lab_id || !formData.barang_id || !formData.jumlah_diminta || !formData.alasan) {
      toast({
        title: "Error",
        description: "Semua field harus diisi",
        variant: "destructive",
      });
      return;
    }

    const selectedBarang = getBarangById(parseInt(formData.barang_id));
    if (selectedBarang && parseInt(formData.jumlah_diminta) > selectedBarang.stok) {
      toast({
        title: "Error",
        description: "Jumlah permintaan melebihi stok tersedia",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Permintaan berhasil diajukan",
      description: `Permintaan ${selectedBarang?.nama_barang} sebanyak ${formData.jumlah_diminta} telah diajukan.`,
    });
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      lab_id: '',
      kategori_id: '',
      barang_id: '',
      jumlah_diminta: '',
      alasan: ''
    });
    setIsDialogOpen(false);
  };

  const handleApprove = (request: PermintaanType) => {
    const barang = getBarangById(request.barang_id);
    toast({
      title: "Permintaan disetujui",
      description: `Permintaan ${barang?.nama_barang} telah disetujui.`,
    });
  };

  const handleReject = (request: PermintaanType) => {
    const barang = getBarangById(request.barang_id);
    toast({
      title: "Permintaan ditolak",
      description: `Permintaan ${barang?.nama_barang} telah ditolak.`,
      variant: "destructive",
    });
  };

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

  const columns = [
    {
      key: 'permintaan_id',
      header: 'ID',
      render: (request: PermintaanType) => `#${request.permintaan_id}`,
      className: 'w-20'
    },
    ...(isAdmin() ? [{
      key: 'user_id',
      header: 'Pemohon',
      render: (request: PermintaanType) => {
        const user = getUserById(request.user_id);
        return user?.nama || 'Unknown';
      }
    }] : []),
    {
      key: 'barang_id',
      header: 'Barang',
      render: (request: PermintaanType) => {
        const barang = getBarangById(request.barang_id);
        const lab = barang ? getLabById(barang.lab_id) : null;
        return (
          <div>
            <div className="font-medium">{barang?.nama_barang || 'Unknown'}</div>
            {lab && <div className="text-xs text-muted-foreground">{lab.nama_lab}</div>}
          </div>
        );
      }
    },
    {
      key: 'jumlah_diminta',
      header: 'Jumlah',
      render: (request: PermintaanType) => {
        const barang = getBarangById(request.barang_id);
        return `${request.jumlah_diminta} ${barang?.satuan || ''}`;
      }
    },
    {
      key: 'tanggal',
      header: 'Tanggal'
    },
    {
      key: 'status',
      header: 'Status',
      render: (request: PermintaanType) => getStatusBadge(request.status)
    },
    {
      key: 'alasan',
      header: 'Alasan',
      render: (request: PermintaanType) => (
        <div className="max-w-xs truncate" title={request.alasan}>
          {request.alasan}
        </div>
      )
    }
  ];

  const actions = (request: PermintaanType) => (
    <div className="flex items-center gap-2">
      {isAdmin() && request.status === 'diproses' && (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleApprove(request)}
            className="text-success hover:text-success-foreground hover:bg-success"
          >
            <CheckCircle className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleReject(request)}
            className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
          >
            <XCircle className="w-4 h-4" />
          </Button>
        </>
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setSelectedRequest(request)}
        className="text-primary hover:text-primary-foreground hover:bg-primary"
      >
        <Eye className="w-4 h-4" />
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            {isAdmin() ? 'Kelola Permintaan Barang' : 'Permintaan Barang'}
          </h1>
          <p className="text-muted-foreground">
            {isAdmin() 
              ? 'Tinjau dan proses permintaan barang dari pengguna'
              : 'Ajukan permintaan barang untuk kebutuhan laboratorium'
            }
          </p>
        </div>
        
        {!isAdmin() && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
                <Plus className="w-4 h-4 mr-2" />
                Ajukan Permintaan
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Ajukan Permintaan Barang</DialogTitle>
                <DialogDescription>
                  Isi form di bawah untuk mengajukan permintaan barang laboratorium.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lab_id">Laboratorium</Label>
                    <Select value={formData.lab_id} onValueChange={(value) => {
                      setFormData(prev => ({ ...prev, lab_id: value, kategori_id: '', barang_id: '' }));
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih laboratorium" />
                      </SelectTrigger>
                      <SelectContent>
                        {dummyLaboratorium.map((lab) => (
                          <SelectItem key={lab.lab_id} value={lab.lab_id.toString()}>
                            {lab.nama_lab}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kategori_id">Kategori (Opsional)</Label>
                    <Select value={formData.kategori_id} onValueChange={(value) => {
                      setFormData(prev => ({ ...prev, kategori_id: value, barang_id: '' }));
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Semua Kategori</SelectItem>
                        {dummyKategori.map((kategori) => (
                          <SelectItem key={kategori.kategori_id} value={kategori.kategori_id.toString()}>
                            {kategori.nama_kategori}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="barang_id">Barang</Label>
                  <Select 
                    value={formData.barang_id} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, barang_id: value }))}
                    disabled={!formData.lab_id}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={formData.lab_id ? "Pilih barang" : "Pilih laboratorium terlebih dahulu"} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableBarang.map((barang) => (
                        <SelectItem key={barang.barang_id} value={barang.barang_id.toString()}>
                          {barang.nama_barang} (Stok: {barang.stok} {barang.satuan})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jumlah_diminta">Jumlah Diminta</Label>
                  <Input
                    id="jumlah_diminta"
                    type="number"
                    value={formData.jumlah_diminta}
                    onChange={(e) => setFormData(prev => ({ ...prev, jumlah_diminta: e.target.value }))}
                    placeholder="Masukkan jumlah"
                    min="1"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alasan">Alasan Permintaan</Label>
                  <Textarea
                    id="alasan"
                    value={formData.alasan}
                    onChange={(e) => setFormData(prev => ({ ...prev, alasan: e.target.value }))}
                    placeholder="Jelaskan alasan permintaan barang..."
                    rows={3}
                    required
                  />
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Batal
                  </Button>
                  <Button type="submit">
                    Ajukan Permintaan
                  </Button>
                </div>
              </form>
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
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Permintaan</p>
                <p className="text-2xl font-bold">{basePermintaan.length}</p>
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
                  {basePermintaan.filter(req => req.status === 'diproses').length}
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
                  {basePermintaan.filter(req => req.status === 'disetujui').length}
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
                  {basePermintaan.filter(req => req.status === 'ditolak').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredPermintaan}
        columns={columns}
        searchPlaceholder="Cari permintaan..."
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
        emptyMessage="Tidak ada permintaan ditemukan"
        actions={actions}
      />

      {/* Detail Dialog */}
      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Detail Permintaan #{selectedRequest?.permintaan_id}</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-muted-foreground">Pemohon</p>
                  <p>{getUserById(selectedRequest.user_id)?.nama}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Tanggal</p>
                  <p>{selectedRequest.tanggal}</p>
                </div>
              </div>
              
              <div>
                <p className="font-medium text-muted-foreground text-sm">Barang</p>
                <p>{getBarangById(selectedRequest.barang_id)?.nama_barang}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-muted-foreground">Jumlah</p>
                  <p>{selectedRequest.jumlah_diminta}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Status</p>
                  {getStatusBadge(selectedRequest.status)}
                </div>
              </div>
              
              <div>
                <p className="font-medium text-muted-foreground text-sm">Alasan</p>
                <p className="text-sm">{selectedRequest.alasan}</p>
              </div>
              
              {selectedRequest.catatan_admin && (
                <div>
                  <p className="font-medium text-muted-foreground text-sm">Catatan Admin</p>
                  <p className="text-sm">{selectedRequest.catatan_admin}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PermintaanBarang;