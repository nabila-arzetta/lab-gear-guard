import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PackageX, Plus, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';
import { DataTable } from '@/components/ui/DataTable';
import { dummyPengembalian, dummyBarang, getBarangById, getLabById, getUserById } from '@/data/dummy';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { toast } from 'sonner';

export const PengembalianBarang: React.FC = () => {
  const { getUserLab, user } = useAuth();
  const userLabId = getUserLab();
  const isAdmin = user?.role === "admin";
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    barang_id: "",
    jumlah: 1,
    kondisi: "rusak" as "baik" | "rusak",
    alasan: ""
  });

  const pengembalianData = userLabId && !isAdmin
    ? dummyPengembalian.filter(p => p.dari_lab === userLabId)
    : dummyPengembalian;

  const availableBarang = userLabId
    ? dummyBarang.filter(b => b.lab_id === userLabId)
    : dummyBarang;

  const handleSubmit = () => {
    if (!formData.barang_id || formData.jumlah <= 0 || !formData.alasan) {
      toast.error("Lengkapi semua field yang diperlukan");
      return;
    }

    const barang = getBarangById(Number(formData.barang_id));
    toast.success(`Pengembalian ${barang?.nama_barang} berhasil diajukan`);
    setIsDialogOpen(false);
    setFormData({
      barang_id: "",
      jumlah: 1,
      kondisi: "rusak",
      alasan: ""
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "outline" as const, icon: Clock, label: "Menunggu" },
      approved: { variant: "default" as const, icon: CheckCircle, label: "Disetujui" },
      rejected: { variant: "destructive" as const, icon: XCircle, label: "Ditolak" }
    };
    const statusConfig = variants[status as keyof typeof variants] || variants.pending;
    const Icon = statusConfig.icon;
    return (
      <Badge variant={statusConfig.variant} className="gap-1">
        <Icon className="w-3 h-3" />
        {statusConfig.label}
      </Badge>
    );
  };

  const getKondisiBadge = (kondisi: string) => {
    return (
      <Badge variant={kondisi === "rusak" ? "destructive" : "default"}>
        {kondisi === "rusak" ? "Rusak" : "Baik"}
      </Badge>
    );
  };

  const handleApprove = (id: number) => {
    toast.success("Pengembalian disetujui. Barang akan dikembalikan ke logistik");
  };

  const handleReject = (id: number) => {
    toast.error("Pengembalian ditolak");
  };

  const filteredData = pengembalianData.filter(item => {
    const barang = getBarangById(item.barang_id);
    return barang?.nama_barang.toLowerCase().includes(searchTerm.toLowerCase()) ||
           item.alasan.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Calculate stats
  const totalPending = pengembalianData.filter(p => p.status === 'pending').length;
  const totalApproved = pengembalianData.filter(p => p.status === 'approved').length;
  const totalRejected = pengembalianData.filter(p => p.status === 'rejected').length;
  const totalRusak = pengembalianData.filter(p => p.kondisi === 'rusak').length;

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
        return (
          <div>
            <div className="font-medium">{barang?.nama_barang || "-"}</div>
            {barang?.serial_number && (
              <div className="text-xs text-muted-foreground">SN: {barang.serial_number}</div>
            )}
          </div>
        );
      }
    },
    {
      key: "lab",
      header: "Dari Lab",
      render: (item: any) => {
        const lab = getLabById(item.dari_lab);
        return lab?.nama_lab || "-";
      }
    },
    {
      key: "jumlah",
      header: "Jumlah",
      render: (item: any) => (
        <span className="font-semibold">{item.jumlah}</span>
      )
    },
    {
      key: "kondisi",
      header: "Kondisi",
      render: (item: any) => getKondisiBadge(item.kondisi)
    },
    {
      key: "alasan",
      header: "Alasan",
      render: (item: any) => (
        <div className="max-w-xs">
          <p className="text-sm line-clamp-2">{item.alasan}</p>
        </div>
      )
    },
    {
      key: "status",
      header: "Status",
      render: (item: any) => getStatusBadge(item.status)
    },
    {
      key: "user",
      header: "Pengaju",
      render: (item: any) => {
        const usr = getUserById(item.user_id);
        return usr?.nama || "-";
      }
    }
  ];

  const actions = (item: any) => {
    if (!isAdmin || item.status !== 'pending') return null;

    return (
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="default"
          onClick={() => handleApprove(item.pengembalian_id)}
        >
          <CheckCircle className="w-4 h-4 mr-1" />
          Setujui
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => handleReject(item.pengembalian_id)}
        >
          <XCircle className="w-4 h-4 mr-1" />
          Tolak
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <PackageX className="w-8 h-8 text-primary" />
            Pengembalian Barang ke Logistik
          </h1>
          <p className="text-muted-foreground mt-2">
            Kelola pengembalian barang rusak atau tidak terpakai ke logistik
          </p>
        </div>
        {!isAdmin && (
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Ajukan Pengembalian
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Menunggu Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{totalPending}</div>
              <Clock className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Disetujui</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-success">{totalApproved}</div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ditolak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-destructive">{totalRejected}</div>
              <XCircle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Barang Rusak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{totalRusak}</div>
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengembalian</CardTitle>
          <CardDescription>
            Riwayat pengajuan pengembalian barang ke logistik
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredData}
            columns={columns}
            actions={actions}
            searchPlaceholder="Cari barang atau alasan..."
            onSearch={setSearchTerm}
            searchTerm={searchTerm}
            emptyMessage="Belum ada pengajuan pengembalian"
          />
        </CardContent>
      </Card>

      {/* Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Ajukan Pengembalian Barang</DialogTitle>
            <DialogDescription>
              Kembalikan barang yang rusak atau tidak terpakai ke logistik
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Pilih Barang</Label>
              <Select value={formData.barang_id} onValueChange={(value) => setFormData({ ...formData, barang_id: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih barang yang akan dikembalikan" />
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Jumlah</Label>
                <Input
                  type="number"
                  min="1"
                  value={formData.jumlah}
                  onChange={(e) => setFormData({ ...formData, jumlah: Number(e.target.value) })}
                  placeholder="Jumlah barang"
                />
              </div>

              <div className="space-y-2">
                <Label>Kondisi Barang</Label>
                <Select value={formData.kondisi} onValueChange={(value: "baik" | "rusak") => setFormData({ ...formData, kondisi: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rusak">Rusak</SelectItem>
                    <SelectItem value="baik">Baik (Tidak terpakai)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Alasan Pengembalian</Label>
              <Textarea
                value={formData.alasan}
                onChange={(e) => setFormData({ ...formData, alasan: e.target.value })}
                placeholder="Jelaskan alasan pengembalian barang (kerusakan, tidak terpakai, dll)"
                rows={4}
              />
            </div>

            {formData.kondisi === "rusak" && (
              <Card className="border-destructive">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold mb-1">Barang Rusak</p>
                      <p className="text-muted-foreground">
                        Pastikan menjelaskan kerusakan secara detail. Barang akan dikirim ke service center atau dimusnahkan sesuai kebijakan.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSubmit} disabled={!formData.barang_id || !formData.alasan}>
              Ajukan Pengembalian
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
