import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Building } from 'lucide-react';
import { dummyLaboratorium, dummyBarang, Laboratorium } from '@/data/dummy';
import { useToast } from '@/hooks/use-toast';

const MasterLab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLab, setEditingLab] = useState<Laboratorium | null>(null);
  const [formData, setFormData] = useState({
    nama_lab: '',
    lokasi: '',
    kapasitas: ''
  });
  const { toast } = useToast();

  const filteredLab = dummyLaboratorium.filter(lab =>
    lab.nama_lab.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lab.lokasi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingLab) {
      toast({
        title: "Laboratorium diperbarui",
        description: `Laboratorium ${formData.nama_lab} berhasil diperbarui.`,
      });
    } else {
      toast({
        title: "Laboratorium ditambahkan",
        description: `Laboratorium ${formData.nama_lab} berhasil ditambahkan.`,
      });
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({ nama_lab: '', lokasi: '', kapasitas: '' });
    setEditingLab(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (lab: Laboratorium) => {
    setEditingLab(lab);
    setFormData({
      nama_lab: lab.nama_lab,
      lokasi: lab.lokasi,
      kapasitas: lab.kapasitas?.toString() || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (lab: Laboratorium) => {
    toast({
      title: "Laboratorium dihapus",
      description: `Laboratorium ${lab.nama_lab} berhasil dihapus.`,
      variant: "destructive",
    });
  };

  const getItemCount = (labId: number) => {
    return dummyBarang.filter(barang => barang.lab_id === labId).length;
  };

  const getCapacityBadge = (kapasitas?: number) => {
    if (!kapasitas) return <span className="text-muted-foreground">-</span>;
    
    const variant = kapasitas >= 25 ? "default" : kapasitas >= 20 ? "secondary" : "outline";
    return (
      <Badge variant={variant}>
        {kapasitas} orang
      </Badge>
    );
  };

  const columns = [
    {
      key: 'lab_id',
      header: 'ID',
      className: 'w-20'
    },
    {
      key: 'nama_lab',
      header: 'Nama Laboratorium',
      className: 'font-semibold',
      render: (lab: Laboratorium) => (
        <div className="flex items-center gap-2">
          <Building className="w-4 h-4 text-primary" />
          <span>{lab.nama_lab}</span>
        </div>
      )
    },
    {
      key: 'lokasi',
      header: 'Lokasi',
      className: 'text-muted-foreground'
    },
    {
      key: 'kapasitas',
      header: 'Kapasitas',
      render: (lab: Laboratorium) => getCapacityBadge(lab.kapasitas)
    },
    {
      key: 'jumlah_barang',
      header: 'Jumlah Barang',
      render: (lab: Laboratorium) => (
        <Badge variant="outline">
          {getItemCount(lab.lab_id)} items
        </Badge>
      )
    }
  ];

  const actions = (lab: Laboratorium) => (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleEdit(lab)}
        className="text-primary hover:text-primary-foreground hover:bg-primary"
      >
        <Edit className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleDelete(lab)}
        className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Master Laboratorium</h1>
          <p className="text-muted-foreground">Kelola data laboratorium</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Laboratorium
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingLab ? 'Edit Laboratorium' : 'Tambah Laboratorium Baru'}
              </DialogTitle>
              <DialogDescription>
                {editingLab 
                  ? 'Perbarui informasi laboratorium.'
                  : 'Tambahkan laboratorium baru ke sistem.'
                }
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nama_lab">Nama Laboratorium</Label>
                <Input
                  id="nama_lab"
                  value={formData.nama_lab}
                  onChange={(e) => setFormData(prev => ({ ...prev, nama_lab: e.target.value }))}
                  placeholder="Masukkan nama laboratorium"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lokasi">Lokasi</Label>
                <Input
                  id="lokasi"
                  value={formData.lokasi}
                  onChange={(e) => setFormData(prev => ({ ...prev, lokasi: e.target.value }))}
                  placeholder="Masukkan lokasi laboratorium"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="kapasitas">Kapasitas (orang)</Label>
                <Input
                  id="kapasitas"
                  type="number"
                  value={formData.kapasitas}
                  onChange={(e) => setFormData(prev => ({ ...prev, kapasitas: e.target.value }))}
                  placeholder="Masukkan kapasitas laboratorium"
                  min="1"
                />
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Batal
                </Button>
                <Button type="submit">
                  {editingLab ? 'Perbarui' : 'Tambah'} Laboratorium
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredLab}
        columns={columns}
        searchPlaceholder="Cari laboratorium..."
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
        emptyMessage="Tidak ada laboratorium ditemukan"
        actions={actions}
      />
    </div>
  );
};

export default MasterLab;