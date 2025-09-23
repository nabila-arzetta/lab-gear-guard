import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Calendar,
  Package,
  ArrowUpCircle,
  ArrowDownCircle,
  TrendingUp,
  Building
} from 'lucide-react';
import { 
  dummyBarang, 
  dummyLaboratorium,
  getBarangByLab,
  getLowStockItems,
  getLabById
} from '@/data/dummy';
import { useAuth } from '@/contexts/AuthContext';

export const Laporan: React.FC = () => {
  const { getUserLab } = useAuth();
  const [selectedLab, setSelectedLab] = useState<string>('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportType, setReportType] = useState<string>('stok');

  const userLabId = getUserLab();
  
  // Filter labs based on admin's access
  const availableLabs = userLabId 
    ? dummyLaboratorium.filter(lab => lab.lab_id === userLabId)
    : dummyLaboratorium;

  // Get report data based on filters
  const getReportData = () => {
    const labId = selectedLab ? parseInt(selectedLab) : userLabId;
    const barangData = labId ? getBarangByLab(labId) : dummyBarang;
    
    switch (reportType) {
      case 'stok':
        return {
          title: 'Laporan Stok Barang',
          data: barangData,
          stats: {
            total: barangData.length,
            aktif: barangData.filter(b => b.status === 'aktif').length,
            rendah: barangData.filter(b => b.stok <= 5).length,
          }
        };
      case 'penggunaan':
        return {
          title: 'Laporan Penggunaan Barang',
          data: barangData.slice(0, 5), // Simulate usage data
          stats: {
            keluar: 189,
            masuk: 200,
            net: 11,
          }
        };
      case 'nilai':
        return {
          title: 'Laporan Nilai Inventaris',
          data: barangData.filter(b => b.harga_satuan),
          stats: {
            totalNilai: barangData.reduce((acc, b) => acc + (b.harga_satuan || 0) * b.stok, 0),
            rataHarga: barangData.filter(b => b.harga_satuan).reduce((acc, b) => acc + (b.harga_satuan || 0), 0) / barangData.filter(b => b.harga_satuan).length || 0,
            itemTermahal: Math.max(...barangData.map(b => b.harga_satuan || 0)),
          }
        };
      default:
        return { title: '', data: [], stats: {} };
    }
  };

  const reportData = getReportData();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Laporan</h1>
          <p className="text-muted-foreground mt-1">
            Generate laporan stok dan penggunaan barang laboratorium
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Filter Laporan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reportType">Jenis Laporan</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis laporan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stok">Laporan Stok</SelectItem>
                  <SelectItem value="penggunaan">Laporan Penggunaan</SelectItem>
                  <SelectItem value="nilai">Laporan Nilai Inventaris</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {!userLabId && (
              <div className="space-y-2">
                <Label htmlFor="lab">Laboratorium</Label>
                <Select value={selectedLab} onValueChange={setSelectedLab}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semua lab" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Semua Laboratorium</SelectItem>
                    {availableLabs.map((lab) => (
                      <SelectItem key={lab.lab_id} value={lab.lab_id.toString()}>
                        {lab.nama_lab}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="startDate">Tanggal Mulai</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">Tanggal Akhir</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="flex items-end">
              <Button className="w-full bg-primary hover:bg-primary-light">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Stats */}
      {reportType === 'stok' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Barang</p>
                  <p className="text-2xl font-bold">{reportData.stats.total}</p>
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
                  <p className="text-2xl font-bold">{reportData.stats.aktif}</p>
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
                  <p className="text-2xl font-bold">{reportData.stats.rendah}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {reportType === 'penggunaan' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary-accent/20 rounded-lg">
                  <ArrowDownCircle className="w-6 h-6 text-primary-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Barang Keluar</p>
                  <p className="text-2xl font-bold">{reportData.stats.keluar}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-success/20 rounded-lg">
                  <ArrowUpCircle className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Barang Masuk</p>
                  <p className="text-2xl font-bold">{reportData.stats.masuk}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Net Change</p>
                  <p className="text-2xl font-bold">+{reportData.stats.net}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {reportType === 'nilai' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Nilai</p>
                  <p className="text-lg font-bold">{formatCurrency(reportData.stats.totalNilai || 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary-accent/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-primary-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rata-rata Harga</p>
                  <p className="text-lg font-bold">{formatCurrency(reportData.stats.rataHarga || 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-warning/20 rounded-lg">
                  <Package className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Item Termahal</p>
                  <p className="text-lg font-bold">{formatCurrency(reportData.stats.itemTermahal || 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Report Preview */}
      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {reportData.title}
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Preview Laporan</h3>
            <p className="text-sm">
              Laporan akan ditampilkan di sini berdasarkan filter yang dipilih.
            </p>
            <div className="mt-4 text-xs">
              <p>Periode: {startDate || 'Tidak ditentukan'} - {endDate || 'Tidak ditentukan'}</p>
              <p>Laboratorium: {selectedLab ? getLabById(parseInt(selectedLab))?.nama_lab : 'Semua'}</p>
              <p>Total Data: {reportData.data?.length || 0} item</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};