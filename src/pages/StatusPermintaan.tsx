import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/DataTable';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Eye, Clock, CheckCircle, XCircle, FileText } from 'lucide-react';
import { 
  dummyPermintaan, 
  getBarangById,
} from '@/data/dummy';
import { useAuth } from '@/contexts/AuthContext';

export const StatusPermintaan: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  // Filter requests for current user
  const userRequests = dummyPermintaan.filter(req => req.user_id === user?.user_id);
  
  // Filter based on search term
  const filteredRequests = searchTerm 
    ? userRequests.filter(req => {
        const barang = getBarangById(req.barang_id);
        return barang?.nama_barang.toLowerCase().includes(searchTerm.toLowerCase()) ||
               req.alasan.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : userRequests;

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

  const columns = [
    {
      key: 'permintaan_id',
      header: 'ID Permintaan',
      render: (item: any) => `#${item.permintaan_id}`,
      className: 'font-medium',
    },
    {
      key: 'barang_id',
      header: 'Barang',
      render: (item: any) => getBarangById(item.barang_id)?.nama_barang || 'Unknown',
    },
    {
      key: 'jumlah_diminta',
      header: 'Jumlah',
      render: (item: any) => (
        <Badge variant="outline">{item.jumlah_diminta}</Badge>
      ),
    },
    {
      key: 'tanggal',
      header: 'Tanggal Permintaan',
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: any) => (
        <div className="flex items-center gap-2">
          {getStatusIcon(item.status)}
          {getStatusBadge(item.status)}
        </div>
      ),
    },
    {
      key: 'alasan',
      header: 'Alasan',
      render: (item: any) => (
        <span className="max-w-xs truncate block" title={item.alasan}>
          {item.alasan}
        </span>
      ),
    },
  ];

  const actions = (item: any) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setSelectedRequest(item)}
        >
          <Eye className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Detail Permintaan #{item.permintaan_id}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Barang</p>
            <p className="font-medium">{getBarangById(item.barang_id)?.nama_barang}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Jumlah</p>
            <p className="font-medium">{item.jumlah_diminta}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Tanggal</p>
            <p className="font-medium">{item.tanggal}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Status</p>
            <div className="flex items-center gap-2">
              {getStatusIcon(item.status)}
              {getStatusBadge(item.status)}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Alasan Permintaan</p>
            <p className="text-sm">{item.alasan}</p>
          </div>
          {item.catatan_admin && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Catatan Admin</p>
              <p className="text-sm">{item.catatan_admin}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );

  // Stats calculations
  const totalRequests = userRequests.length;
  const pendingRequests = userRequests.filter(req => req.status === 'diproses').length;
  const approvedRequests = userRequests.filter(req => req.status === 'disetujui').length;
  const rejectedRequests = userRequests.filter(req => req.status === 'ditolak').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Status Permintaan</h1>
        <p className="text-muted-foreground mt-1">
          Pantau status permintaan barang Anda
        </p>
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
                <p className="text-2xl font-bold">{totalRequests}</p>
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
                <p className="text-2xl font-bold">{pendingRequests}</p>
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
                <p className="text-2xl font-bold">{approvedRequests}</p>
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
                <p className="text-2xl font-bold">{rejectedRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requests Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Riwayat Permintaan Anda</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredRequests}
            columns={columns}
            searchPlaceholder="Cari permintaan..."
            onSearch={setSearchTerm}
            searchTerm={searchTerm}
            emptyMessage={
              userRequests.length === 0 
                ? "Anda belum pernah mengajukan permintaan barang"
                : "Tidak ada permintaan yang ditemukan"
            }
            actions={actions}
          />
        </CardContent>
      </Card>
    </div>
  );
};