import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import { dummyUsers, dummyLaboratorium, User, getLabById } from '@/data/dummy';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const MasterUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    role: 'pengguna' as 'admin' | 'pengguna',
    lab_id: '',
    status: 'aktif' as 'aktif' | 'nonaktif'
  });
  const { isAdmin, getUserLab } = useAuth();
  const { toast } = useToast();

  // Filter users based on admin's lab if admin, otherwise show all
  const baseUsers = isAdmin() && getUserLab() ? 
    dummyUsers.filter(user => user.lab_id === getUserLab()) : 
    dummyUsers;

  const filteredUsers = baseUsers.filter(user =>
    user.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingUser) {
      toast({
        title: "User diperbarui",
        description: `User ${formData.nama} berhasil diperbarui.`,
      });
    } else {
      toast({
        title: "User ditambahkan",
        description: `User ${formData.nama} berhasil ditambahkan.`,
      });
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      nama: '',
      email: '',
      role: 'pengguna',
      lab_id: '',
      status: 'aktif'
    });
    setEditingUser(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      nama: user.nama,
      email: user.email,
      role: user.role,
      lab_id: user.lab_id?.toString() || '',
      status: user.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (user: User) => {
    toast({
      title: "User dihapus",
      description: `User ${user.nama} berhasil dihapus.`,
      variant: "destructive",
    });
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === 'aktif' ? "default" : "secondary"}>
        {status === 'aktif' ? 'Aktif' : 'Nonaktif'}
      </Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    return (
      <Badge variant={role === 'admin' ? "destructive" : "outline"}>
        {role === 'admin' ? 'Admin' : 'Pengguna'}
      </Badge>
    );
  };

  const columns = [
    {
      key: 'user_id',
      header: 'ID',
      className: 'w-20'
    },
    {
      key: 'nama',
      header: 'Nama',
      className: 'font-semibold'
    },
    {
      key: 'email',
      header: 'Email',
      className: 'text-muted-foreground'
    },
    {
      key: 'role',
      header: 'Role',
      render: (user: User) => getRoleBadge(user.role)
    },
    {
      key: 'lab_id',
      header: 'Laboratorium',
      render: (user: User) => {
        if (!user.lab_id) return <span className="text-muted-foreground">-</span>;
        const lab = getLabById(user.lab_id);
        return lab ? lab.nama_lab : '-';
      }
    },
    {
      key: 'status',
      header: 'Status',
      render: (user: User) => getStatusBadge(user.status)
    }
  ];

  const actions = (user: User) => (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleEdit(user)}
        className="text-primary hover:text-primary-foreground hover:bg-primary"
      >
        <Edit className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleDelete(user)}
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
          <h1 className="text-3xl font-bold text-primary">Master User</h1>
          <p className="text-muted-foreground">Kelola data pengguna sistem</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingUser ? 'Edit User' : 'Tambah User Baru'}
              </DialogTitle>
              <DialogDescription>
                {editingUser 
                  ? 'Perbarui informasi pengguna.'
                  : 'Tambahkan pengguna baru ke sistem.'
                }
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Lengkap</Label>
                <Input
                  id="nama"
                  value={formData.nama}
                  onChange={(e) => setFormData(prev => ({ ...prev, nama: e.target.value }))}
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Masukkan alamat email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value as 'admin' | 'pengguna' }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pengguna">Pengguna</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.role === 'admin' && (
                <div className="space-y-2">
                  <Label htmlFor="lab_id">Laboratorium</Label>
                  <Select value={formData.lab_id} onValueChange={(value) => setFormData(prev => ({ ...prev, lab_id: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih laboratorium" />
                    </SelectTrigger>
                    <SelectContent>
                      {dummyLaboratorium.map((lab) => (
                        <SelectItem key={lab.lab_id} value={lab.lab_id.toString()}>
                          {lab.nama_lab}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as 'aktif' | 'nonaktif' }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aktif">Aktif</SelectItem>
                    <SelectItem value="nonaktif">Nonaktif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Batal
                </Button>
                <Button type="submit">
                  {editingUser ? 'Perbarui' : 'Tambah'} User
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredUsers}
        columns={columns}
        searchPlaceholder="Cari user..."
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
        emptyMessage="Tidak ada user ditemukan"
        actions={actions}
      />
    </div>
  );
};

export default MasterUsers;