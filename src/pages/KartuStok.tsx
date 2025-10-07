import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Package, TrendingUp, TrendingDown, Clock, FileText } from 'lucide-react';
import { DataTable } from '@/components/ui/DataTable';
import { getBarangById, getStokMovementsByBarang, getLabById, getUserById } from '@/data/dummy';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

export const KartuStok: React.FC = () => {
  const { barangId } = useParams<{ barangId: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const barang = getBarangById(Number(barangId));
  const movements = getStokMovementsByBarang(Number(barangId));

  if (!barang) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Barang Tidak Ditemukan</h3>
            <Button onClick={() => navigate('/data-inventaris')}>
              Kembali ke Inventaris
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const lab = getLabById(barang.lab_id);
  
  const getTransactionBadge = (tipe: string) => {
    const types: Record<string, { variant: any; label: string; icon: JSX.Element }> = {
      masuk: { variant: "default", label: "Masuk", icon: <TrendingUp className="w-3 h-3" /> },
      keluar: { variant: "destructive", label: "Keluar", icon: <TrendingDown className="w-3 h-3" /> },
      transfer_masuk: { variant: "default", label: "Transfer Masuk", icon: <TrendingUp className="w-3 h-3" /> },
      transfer_keluar: { variant: "secondary", label: "Transfer Keluar", icon: <TrendingDown className="w-3 h-3" /> },
      adjustment: { variant: "outline", label: "Adjustment", icon: <FileText className="w-3 h-3" /> },
      return: { variant: "destructive", label: "Return", icon: <TrendingDown className="w-3 h-3" /> }
    };
    
    const type = types[tipe] || types.masuk;
    return (
      <Badge variant={type.variant} className="gap-1">
        {type.icon}
        {type.label}
      </Badge>
    );
  };

  const filteredMovements = movements.filter(movement =>
    movement.catatan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movement.tipe_transaksi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalMasuk = movements
    .filter(m => m.tipe_transaksi === 'masuk' || m.tipe_transaksi === 'transfer_masuk')
    .reduce((sum, m) => sum + m.jumlah, 0);

  const totalKeluar = movements
    .filter(m => m.tipe_transaksi === 'keluar' || m.tipe_transaksi === 'transfer_keluar')
    .reduce((sum, m) => sum + m.jumlah, 0);

  const columns = [
    {
      key: "tanggal",
      header: "Tanggal & Waktu",
      render: (item: any) => (
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <div>
            <div className="font-medium">
              {format(new Date(item.tanggal), "dd MMM yyyy", { locale: idLocale })}
            </div>
            <div className="text-xs text-muted-foreground">
              {format(new Date(item.tanggal), "HH:mm", { locale: idLocale })}
            </div>
          </div>
        </div>
      )
    },
    {
      key: "tipe_transaksi",
      header: "Tipe Transaksi",
      render: (item: any) => getTransactionBadge(item.tipe_transaksi)
    },
    {
      key: "jumlah",
      header: "Jumlah",
      render: (item: any) => (
        <span className={`font-semibold ${
          item.tipe_transaksi.includes('masuk') || item.jumlah > 0 ? 'text-success' : 'text-destructive'
        }`}>
          {item.tipe_transaksi.includes('masuk') || item.jumlah > 0 ? '+' : ''}{item.jumlah} {barang.satuan}
        </span>
      )
    },
    {
      key: "stok_sebelum",
      header: "Stok Sebelum",
      render: (item: any) => `${item.stok_sebelum} ${barang.satuan}`
    },
    {
      key: "stok_sesudah",
      header: "Stok Sesudah",
      render: (item: any) => (
        <span className="font-semibold">{item.stok_sesudah} {barang.satuan}</span>
      )
    },
    {
      key: "user",
      header: "User",
      render: (item: any) => {
        const user = getUserById(item.user_id);
        return user?.nama || "-";
      }
    },
    {
      key: "catatan",
      header: "Catatan",
      render: (item: any) => item.catatan || "-"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            onClick={() => navigate('/data-inventaris')}
            className="mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          <h1 className="text-3xl font-bold">Kartu Stok</h1>
          <p className="text-muted-foreground">
            Riwayat lengkap pergerakan stok barang
          </p>
        </div>
      </div>

      {/* Barang Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Package className="w-8 h-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-2">{barang.nama_barang}</CardTitle>
                <CardDescription className="space-y-1">
                  <div>Laboratorium: <span className="font-semibold text-foreground">{lab?.nama_lab}</span></div>
                  <div>Kategori ID: <span className="font-semibold text-foreground">{barang.kategori_id}</span></div>
                  {barang.serial_number && (
                    <div>Serial Number: <span className="font-semibold text-foreground">{barang.serial_number}</span></div>
                  )}
                </CardDescription>
              </div>
            </div>
            <Badge variant={barang.stok <= 5 ? "destructive" : "default"} className="text-lg px-4 py-2">
              Stok: {barang.stok} {barang.satuan}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Masuk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-success">+{totalMasuk}</span>
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">{barang.satuan}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Keluar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-destructive">-{totalKeluar}</span>
              <TrendingDown className="w-8 h-8 text-destructive" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">{barang.satuan}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Transaksi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">{movements.length}</span>
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Riwayat transaksi</p>
          </CardContent>
        </Card>
      </div>

      {/* Movements Table */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Transaksi</CardTitle>
          <CardDescription>
            Semua pergerakan stok untuk barang ini
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredMovements}
            columns={columns}
            searchPlaceholder="Cari berdasarkan catatan atau tipe..."
            onSearch={setSearchTerm}
            searchTerm={searchTerm}
            emptyMessage="Belum ada riwayat transaksi"
          />
        </CardContent>
      </Card>
    </div>
  );
};
