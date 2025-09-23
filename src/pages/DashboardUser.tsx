import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/components/ui/StatsCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ClipboardList, 
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Eye
} from 'lucide-react';
import { 
  dummyPermintaan, 
  getUserById
} from '@/data/dummy';
import { useAuth } from '@/contexts/AuthContext';

export const DashboardUser: React.FC = () => {
  const { user } = useAuth();
  
  // Get user's requests
  const userRequests = dummyPermintaan.filter(req => req.user_id === user?.user_id);
  
  // Stats calculations
  const totalPermintaan = userRequests.length;
  const permintaanDiproses = userRequests.filter(req => req.status === 'diproses').length;
  const permintaanDisetujui = userRequests.filter(req => req.status === 'disetujui').length;
  const permintaanDitolak = userRequests.filter(req => req.status === 'ditolak').length;

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
          <h1 className="text-3xl font-bold text-primary">Dashboard Pengguna</h1>
          <p className="text-muted-foreground mt-1">
            Selamat datang, {user?.nama}! Kelola permintaan barang Anda di sini.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary-light">
          <Plus className="w-4 h-4 mr-2" />
          Ajukan Permintaan
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Permintaan"
          value={totalPermintaan}
          icon={ClipboardList}
          variant="default"
        />
        <StatsCard
          title="Sedang Diproses"
          value={permintaanDiproses}
          icon={Clock}
          variant="warning"
        />
        <StatsCard
          title="Disetujui"
          value={permintaanDisetujui}
          icon={CheckCircle}
          variant="success"
        />
        <StatsCard
          title="Ditolak"
          value={permintaanDitolak}
          icon={XCircle}
          variant="secondary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Requests */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-primary">
              <ClipboardList className="w-5 h-5 inline mr-2" />
              Permintaan Terbaru
            </CardTitle>
            <Button variant="outline" size="sm" className="text-primary-accent">
              Lihat Semua →
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userRequests.slice(0, 5).map((request) => (
                <div key={request.permintaan_id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/20">
                      {getStatusIcon(request.status)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">Permintaan #{request.permintaan_id}</p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {request.jumlah_diminta} • {request.tanggal}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(request.status)}
                </div>
              ))}
              {userRequests.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <ClipboardList className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Belum ada permintaan barang</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Guide */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-primary">
              Panduan Cepat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <div>
                  <p className="font-medium text-sm">Ajukan Permintaan</p>
                  <p className="text-xs text-muted-foreground">
                    Pilih barang yang dibutuhkan dan isi formulir permintaan
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-warning/5 rounded-lg">
                <div className="w-6 h-6 bg-warning text-warning-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <div>
                  <p className="font-medium text-sm">Menunggu Persetujuan</p>
                  <p className="text-xs text-muted-foreground">
                    Admin akan meninjau dan memproses permintaan Anda
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-success/5 rounded-lg">
                <div className="w-6 h-6 bg-success text-success-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <div>
                  <p className="font-medium text-sm">Ambil Barang</p>
                  <p className="text-xs text-muted-foreground">
                    Ambil barang di laboratorium setelah disetujui
                  </p>
                </div>
              </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Plus className="w-6 h-6 text-primary" />
              <span>Ajukan Permintaan Baru</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Eye className="w-6 h-6 text-primary-accent" />
              <span>Lihat Status Permintaan</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <ClipboardList className="w-6 h-6 text-secondary" />
              <span>Riwayat Permintaan</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};