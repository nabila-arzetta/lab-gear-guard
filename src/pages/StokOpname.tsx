import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClipboardCheck, Plus, AlertCircle, CheckCircle, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { DataTable } from '@/components/ui/DataTable';
import { dummyStokOpname, dummyBarang, getBarangById, getLabById } from '@/data/dummy';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { toast } from 'sonner';

export const StokOpname: React.FC = () => {
  const { getUserLab, user } = useAuth();
  const userLabId = getUserLab();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    barang_id: "",
    stok_sistem: 0,
    stok_fisik: 0,
    keterangan: ""
  });

  const opnameData = userLabId 
    ? dummyStokOpname.filter(o => o.lab_id === userLabId)
    : dummyStokOpname;

  const availableBarang = userLabId
    ? dummyBarang.filter(b => b.lab_id === userLabId)
    : dummyBarang;

  const handleBarangChange = (barangId: string) => {
    const barang = getBarangById(Number(barangId));
    setFormData({
      ...formData,
      barang_id: barangId,
      stok_sistem: barang?.stok || 0,
      stok_fisik: 0
    });
  };

  const handleSubmit = () => {
    if (!formData.barang_id || formData.stok_fisik === 0) {
      toast.error("Lengkapi semua field yang diperlukan");
      return;
    }

    const selisih = formData.stok_fisik - formData.stok_sistem;
    toast.success(`Stok Opname berhasil dicatat. Selisih: ${selisih > 0 ? '+' : ''}${selisih}`);
    setIsDialogOpen(false);
    setFormData({
      barang_id: "",
      stok_sistem: 0,
      stok_fisik: 0,
      keterangan: ""
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: { variant: "outline" as const, icon: Clock, label: "Draft" },
      approved: { variant: "default" as const, icon: CheckCircle, label: "Approved" }
    };
    const statusConfig = variants[status as keyof typeof variants] || variants.draft;
    const Icon = statusConfig.icon;
    return (
      <Badge variant={statusConfig.variant} className="gap-1">
        <Icon className="w-3 h-3" />
        {statusConfig.label}
      </Badge>
    );
  };

  const getSelisihBadge = (selisih: number) => {
    if (selisih === 0) {
      return <Badge variant="outline">Sesuai</Badge>;
    }
    return (
      <Badge variant={selisih > 0 ? "default" : "destructive"} className="gap-1">
        {selisih > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {selisih > 0 ? '+' : ''}{selisih}
      </Badge>
    );
  };

  const filteredData = opnameData.filter(item => {
    const barang = getBarangById(item.barang_id);
    return barang?.nama_barang.toLowerCase().includes(searchTerm.toLowerCase()) ||
           item.keterangan?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Calculate stats
  const totalOpname = opnameData.length;
  const totalSelisihPositif = opnameData.filter(o => o.selisih > 0).length;
  const totalSelisihNegatif = opnameData.filter(o => o.selisih < 0).length;
  const totalSesuai = opnameData.filter(o => o.selisih === 0).length;

  const columns = [
    {
      key: "tanggal",
      header: "Tanggal",
      render: (item: any) => format(new Date(item.tanggal), "dd MMM yyyy HH:mm", { locale: idLocale })
    },
    {
      key: "barang",
      header: "Nama Barang",
      render: (item: any) => {
        const barang = getBarangById(item.barang_id);
        return barang?.nama_barang || "-";
      }
    },
    {
      key: "lab",
      header: "Laboratorium",
      render: (item: any) => {
        const lab = getLabById(item.lab_id);
        return lab?.nama_lab || "-";
      }
    },
    {
      key: "stok_sistem",
      header: "Stok Sistem",
      render: (item: any) => (
        <span className="font-semibold">{item.stok_sistem}</span>
      )
    },
    {
      key: "stok_fisik",
      header: "Stok Fisik",
      render: (item: any) => (
        <span className="font-semibold">{item.stok_fisik}</span>
      )
    },
    {
      key: "selisih",
      header: "Selisih",
      render: (item: any) => getSelisihBadge(item.selisih)
    },
    {
      key: "status",
      header: "Status",
      render: (item: any) => getStatusBadge(item.status)
    },
    {
      key: "keterangan",
      header: "Keterangan",
      render: (item: any) => item.keterangan || "-"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ClipboardCheck className="w-8 h-8 text-primary" />
            Stok Opname
          </h1>
          <p className="text-muted-foreground mt-2">
            Pengecekan dan penyesuaian stok fisik dengan sistem
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Buat Stok Opname
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Opname</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalOpname}</div>
            <p className="text-xs text-muted-foreground mt-1">Riwayat</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Kelebihan Stok</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">{totalSelisihPositif}</div>
            <p className="text-xs text-muted-foreground mt-1">Selisih positif</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Kekurangan Stok</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{totalSelisihNegatif}</div>
            <p className="text-xs text-muted-foreground mt-1">Selisih negatif</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Stok Sesuai</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalSesuai}</div>
            <p className="text-xs text-muted-foreground mt-1">Tidak ada selisih</p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Stok Opname</CardTitle>
          <CardDescription>
            Daftar semua kegiatan stok opname yang telah dilakukan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredData}
            columns={columns}
            searchPlaceholder="Cari barang atau keterangan..."
            onSearch={setSearchTerm}
            searchTerm={searchTerm}
            emptyMessage="Belum ada data stok opname"
          />
        </CardContent>
      </Card>

      {/* Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Buat Stok Opname Baru</DialogTitle>
            <DialogDescription>
              Lakukan pengecekan stok fisik dan catat perbedaannya dengan sistem
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Pilih Barang</Label>
              <Select value={formData.barang_id} onValueChange={handleBarangChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih barang untuk opname" />
                </SelectTrigger>
                <SelectContent>
                  {availableBarang.map((barang) => (
                    <SelectItem key={barang.barang_id} value={barang.barang_id.toString()}>
                      {barang.nama_barang} - Stok: {barang.stok} {barang.satuan}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.barang_id && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Stok di Sistem</Label>
                    <Input
                      type="number"
                      value={formData.stok_sistem}
                      disabled
                      className="bg-muted"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Stok Fisik (Hasil Perhitungan)</Label>
                    <Input
                      type="number"
                      value={formData.stok_fisik}
                      onChange={(e) => setFormData({ ...formData, stok_fisik: Number(e.target.value) })}
                      placeholder="Masukkan jumlah stok fisik"
                    />
                  </div>
                </div>

                {formData.stok_fisik > 0 && (
                  <Card className={`
                    ${formData.stok_fisik - formData.stok_sistem > 0 ? 'border-success' : ''}
                    ${formData.stok_fisik - formData.stok_sistem < 0 ? 'border-destructive' : ''}
                  `}>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Selisih:</span>
                        <span className={`text-2xl font-bold ${
                          formData.stok_fisik - formData.stok_sistem > 0 ? 'text-success' :
                          formData.stok_fisik - formData.stok_sistem < 0 ? 'text-destructive' :
                          'text-foreground'
                        }`}>
                          {formData.stok_fisik - formData.stok_sistem > 0 ? '+' : ''}
                          {formData.stok_fisik - formData.stok_sistem}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-2">
                  <Label>Keterangan</Label>
                  <Textarea
                    value={formData.keterangan}
                    onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                    placeholder="Jelaskan hasil opname dan penyebab selisih jika ada"
                    rows={3}
                  />
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSubmit} disabled={!formData.barang_id || formData.stok_fisik === 0}>
              Simpan Stok Opname
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
