import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Package,
  FileText,
  ArrowRightLeft,
  ClipboardList,
  Database,
  Users,
  Building,
  Tag,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const adminMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Data Barang", url: "/master/barang", icon: Package },
  { title: "Data Kategori", url: "/master/kategori", icon: Tag },
  { title: "Data User", url: "/master/users", icon: Users },
  { title: "Data Lab", url: "/master/lab", icon: Building },
  { title: "Laporan", url: "/laporan", icon: FileText },
  { title: "Permintaan Barang", url: "/permintaan", icon: ClipboardList },
  { title: "Transfer Barang", url: "/transfer", icon: ArrowRightLeft },
];

const userMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Permintaan Barang", url: "/permintaan", icon: ClipboardList },
  { title: "Status Permintaan", url: "/status-permintaan", icon: FileText },
  { title: "Data Inventaris", url: "/inventaris", icon: Database },
];

export const AppSidebar: React.FC = () => {
  const { state } = useSidebar();
  const { isAdmin } = useAuth();
  const location = useLocation();
  
  const menuItems = isAdmin() ? adminMenuItems : userMenuItems;
  const currentPath = location.pathname;
  
  const isCollapsed = state === "collapsed";
  
  return (
    <Sidebar 
      collapsible="icon"
    >
      <SidebarContent className="bg-sidebar text-sidebar-foreground">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-primary font-semibold mb-4">
            {!isCollapsed && (isAdmin() ? "Menu Admin" : "Menu Pengguna")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};