import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { Plus, Edit, Trash2 } from 'lucide-react';
import { dummyKategori, Kategori } from '@/data/dummy';
import { useToast } from '@/hooks/use-toast';

const MasterKategori = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingKategori, setEditingKategori] = useState<Kategori | null>(null);
  const [formData, setFormData] = useState({
    nama_kategori: '',
    deskripsi: ''
  });
  const { toast } = useToast();

  const filteredKategori = dummyKategori.filter(kategori =>
    kategori.nama_kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (kategori.deskripsi && kategori.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingKategori) {
      toast({
        title: "Kategori diperbarui",
        description: `Kategori ${formData.nama_kategori} berhasil diperbarui.`,
      });
    } else {
      toast({
        title: "Kategori ditambahkan",
        description: `Kategori ${formData.nama_kategori} berhasil ditambahkan.`,
      });
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({ nama_kategori: '', deskripsi: '' });
    setEditingKategori(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (kategori: Kategori) => {
    setEditingKategori(kategori);
    setFormData({
      nama_kategori: kategori.nama_kategori,
      deskripsi: kategori.deskripsi || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (kategori: Kategori) => {
    toast({
      title: "Kategori dihapus",
      description: `Kategori ${kategori.nama_kategori} berhasil dihapus.`,
      variant: "destructive",
    });
  };

  const getStatusBadge = (kategoriId: number) => {
    const itemCount = Math.floor(Math.random() * 20) + 1; // Simulate item count
    return (
      <Badge variant={itemCount > 10 ? "default" : "secondary"}>
        {itemCount} items
      </Badge>
    );
  };

  const columns = [
    {
      key: 'kategori_id',
      header: 'ID',
      className: 'w-20'
    },
    {
      key: 'nama_kategori',
      header: 'Nama Kategori',
      className: 'font-semibold'
    },
    {
      key: 'deskripsi',
      header: 'Deskripsi',
      render: (kategori: Kategori) => (
        <span className="text-muted-foreground">
          {kategori.deskripsi || '-'}
        </span>
      )
    },
    {
      key: 'jumlah_barang',
      header: 'Jumlah Barang',
      render: (kategori: Kategori) => getStatusBadge(kategori.kategori_id)
    }
  ];

  const actions = (kategori: Kategori) => (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleEdit(kategori)}
        className="text-primary hover:text-primary-foreground hover:bg-primary"
      >
        <Edit className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleDelete(kategori)}
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
          <h1 className="text-3xl font-bold text-primary">Master Kategori</h1>
          <p className="text-muted-foreground">Kelola kategori barang laboratorium</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Kategori
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingKategori ? 'Edit Kategori' : 'Tambah Kategori Baru'}
              </DialogTitle>
              <DialogDescription>
                {editingKategori 
                  ? 'Perbarui informasi kategori barang.'
                  : 'Tambahkan kategori barang baru ke sistem.'
                }
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nama_kategori">Nama Kategori</Label>
                <Input
                  id="nama_kategori"
                  value={formData.nama_kategori}
                  onChange={(e) => setFormData(prev => ({ ...prev, nama_kategori: e.target.value }))}
                  placeholder="Masukkan nama kategori"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deskripsi">Deskripsi</Label>
                <Textarea
                  id="deskripsi"
                  value={formData.deskripsi}
                  onChange={(e) => setFormData(prev => ({ ...prev, deskripsi: e.target.value }))}
                  placeholder="Masukkan deskripsi kategori (opsional)"
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Batal
                </Button>
                <Button type="submit">
                  {editingKategori ? 'Perbarui' : 'Tambah'} Kategori
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredKategori}
        columns={columns}
        searchPlaceholder="Cari kategori..."
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
        emptyMessage="Tidak ada kategori ditemukan"
        actions={actions}
      />
    </div>
  );
};

export default MasterKategori;