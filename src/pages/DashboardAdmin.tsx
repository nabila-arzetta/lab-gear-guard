import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/components/ui/StatsCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Clock,
  AlertTriangle,
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { 
  dummyBarang, 
  dummyPermintaan, 
  dummyTransfer, 
  getLowStockItems, 
  getRecentTransactions,
  getBarangByLab,
  getKategoriById,
  getUserById
} from '@/data/dummy';
import { useAuth } from '@/contexts/AuthContext';

export const DashboardAdmin: React.FC = () => {
  const { getUserLab } = useAuth();
  const userLabId = getUserLab();
  
  // Get data for admin's lab only
  const labBarang = userLabId ? getBarangByLab(userLabId) : dummyBarang;
  const lowStockItems = userLabId ? getLowStockItems(userLabId) : getLowStockItems();
  const recentTransactions = getRecentTransactions(userLabId);
  
  // Stats calculations
  const totalBarang = labBarang.length;
  const barangMasuk = 200; // This would be calculated from actual incoming items
  const barangKeluar = 189; // This would be calculated from actual outgoing items
  const antrianBarang = dummyPermintaan.filter(p => p.status === 'diproses').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'menunggu':
        return <Badge variant="secondary" className="bg-warning/20 text-warning border-warning/30">Menunggu</Badge>;
      case 'diterima':
      case 'selesai':
        return <Badge variant="secondary" className="bg-success/20 text-success border-success/30">Selesai</Badge>;
      case 'diproses':
        return <Badge variant="secondary" className="bg-primary-accent/20 text-primary-accent border-primary-accent/30">Diterima</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Dashboard Inventaris Admin</h1>
          <p className="text-muted-foreground mt-1">
            Kelola inventaris laboratorium Anda dengan mudah
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Barang"
          value={totalBarang}
          icon={Package}
          variant="default"
        />
        <StatsCard
          title="Barang Masuk"
          value={barangMasuk}
          subtitle="bulan ini"
          icon={ArrowUpCircle}
          variant="success"
        />
        <StatsCard
          title="Barang Keluar"
          value={barangKeluar}
          subtitle="bulan ini"
          icon={ArrowDownCircle}
          variant="primary"
        />
        <StatsCard
          title="Antrian Barang"
          value={antrianBarang}
          subtitle="perlu restock"
          icon={Clock}
          variant="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-primary">
              <Clock className="w-5 h-5 inline mr-2" />
              Transaksi Terbaru
            </CardTitle>
            <Button variant="outline" size="sm" className="text-primary-accent">
              Lihat Semua →
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'masuk' 
                        ? 'bg-success/20 text-success' 
                        : 'bg-primary-accent/20 text-primary-accent'
                    }`}>
                      {transaction.type === 'masuk' ? 
                        <ArrowUpCircle className="w-4 h-4" /> : 
                        <ArrowDownCircle className="w-4 h-4" />
                      }
                    </div>
                    <div>
                      <p className="font-medium text-sm">{transaction.item}</p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {transaction.quantity} • {transaction.time}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(transaction.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-destructive">
              <AlertTriangle className="w-5 h-5 inline mr-2" />
              Peringatan Stok
            </CardTitle>
            <Button variant="outline" size="sm" className="text-primary-accent">
              Lihat Semua →
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.slice(0, 4).map((item) => {
                const kategori = getKategoriById(item.kategori_id);
                return (
                  <div key={item.barang_id} className="flex items-center justify-between p-3 border-l-4 border-l-destructive bg-destructive/5 rounded-r-lg">
                    <div>
                      <p className="font-medium text-sm">{item.nama_barang}</p>
                      <p className="text-xs text-muted-foreground">
                        {kategori?.nama_kategori}
                      </p>
                    </div>
                    <Badge variant="destructive" className="font-bold">
                      {item.stok}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary">
            Aksi Cepat
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Package className="w-6 h-6 text-primary" />
              <span>Tambah Barang</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <CheckCircle className="w-6 h-6 text-success" />
              <span>Proses Permintaan</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <ArrowUpCircle className="w-6 h-6 text-primary-accent" />
              <span>Transfer Barang</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Eye className="w-6 h-6 text-secondary" />
              <span>Lihat Laporan</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardAdmin;