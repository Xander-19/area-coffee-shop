import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import ManageOrders from './pages/ManageOrders';
import ManageMenu from './pages/ManageMenu';
import ManageCategories from './pages/ManageCategories';
import ManageGallery from './pages/ManageGallery';

const ROUTE_TITLES = {
  '/': 'Dashboard',
  '/orders': 'Orders',
  '/menu': 'Menu',
  '/categories': 'Categories',
  '/gallery': 'Gallery',
};

function PageTitle() {
  const location = useLocation();
  const path = location.pathname;
  const title = ROUTE_TITLES[path] ?? 'Admin';
  return <Header title={title} />;
}

function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-page-bg)]">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((c) => !c)} />
      <main
        className="flex flex-col min-h-screen transition-all duration-300 ease-in-out"
        style={{ marginLeft: sidebarCollapsed ? 80 : 256 }}
      >
        <PageTitle />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<ManageOrders />} />
            <Route path="/menu" element={<ManageMenu />} />
            <Route path="/categories" element={<ManageCategories />} />
            <Route path="/gallery" element={<ManageGallery />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppLayout />
        <Toaster position="top-center" />
      </BrowserRouter>
    </ThemeProvider>
  );
}
