import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/DataTable';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, ArrowRightLeft, CheckCircle, XCircle, Clock } from 'lucide-react';
import { 
  dummyTransfer, 
  getLabById,
  getBarangById,
} from '@/data/dummy';
import { useAuth } from '@/contexts/AuthContext';

export const TransferBarang: React.FC = () => {
  const { getUserLab } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const userLabId = getUserLab();
  
  // Filter transfers by admin's lab
  const filteredTransfers = dummyTransfer.filter(transfer => 
    !userLabId || transfer.dari_lab === userLabId || transfer.ke_lab === userLabId
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'menunggu':
        return <Badge variant="secondary" className="bg-warning/20 text-warning border-warning/30">Menunggu</Badge>;
      case 'diterima':
        return <Badge variant="secondary" className="bg-success/20 text-success border-success/30">Diterima</Badge>;
      case 'ditolak':
        return <Badge variant="destructive">Ditolak</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const columns = [
    {
      key: 'transfer_id',
      header: 'ID Transfer',
      render: (item: any) => `#${item.transfer_id}`,
    },
    {
      key: 'barang_id',
      header: 'Barang',
      render: (item: any) => getBarangById(item.barang_id)?.nama_barang || 'Unknown',
    },
    {
      key: 'dari_lab',
      header: 'Dari Lab',
      render: (item: any) => getLabById(item.dari_lab)?.nama_lab || 'Unknown',
    },
    {
      key: 'ke_lab',
      header: 'Ke Lab',
      render: (item: any) => getLabById(item.ke_lab)?.nama_lab || 'Unknown',
    },
    {
      key: 'jumlah_transfer',
      header: 'Jumlah',
    },
    {
      key: 'tanggal',
      header: 'Tanggal',
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: any) => getStatusBadge(item.status),
    },
  ];

  const actions = (item: any) => (
    <div className="flex items-center gap-2">
      {item.status === 'menunggu' && (
        <>
          <Button variant="ghost" size="sm" className="text-success">
            <CheckCircle className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-destructive">
            <XCircle className="w-4 h-4" />
          </Button>
        </>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Transfer Barang</h1>
          <p className="text-muted-foreground mt-1">
            Kelola transfer barang antar laboratorium
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-light">
              <Plus className="w-4 h-4 mr-2" />
              Buat Transfer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Buat Transfer Barang</DialogTitle>
            </DialogHeader>
            <div className="py-4 text-center text-muted-foreground">
              Form transfer barang akan diimplementasikan di sini
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/20 rounded-lg">
                <ArrowRightLeft className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Transfer</p>
                <p className="text-2xl font-bold">{filteredTransfers.length}</p>
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
                <p className="text-sm text-muted-foreground">Menunggu</p>
                <p className="text-2xl font-bold">
                  {filteredTransfers.filter(t => t.status === 'menunggu').length}
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
                <p className="text-sm text-muted-foreground">Diterima</p>
                <p className="text-2xl font-bold">
                  {filteredTransfers.filter(t => t.status === 'diterima').length}
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
                  {filteredTransfers.filter(t => t.status === 'ditolak').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transfers Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Daftar Transfer Barang</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredTransfers}
            columns={columns}
            searchPlaceholder="Cari transfer barang..."
            onSearch={setSearchTerm}
            searchTerm={searchTerm}
            emptyMessage="Belum ada transfer barang"
            actions={actions}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TransferBarang;