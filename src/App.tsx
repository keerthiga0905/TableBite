import { useState, useEffect } from 'react';
import { RoleBar } from './components/common/RoleBar';
import { LandingPage } from './components/landing/LandingPage';
import { CustomerApp } from './components/customer/CustomerApp';
import { KitchenDashboard } from './components/kitchen/KitchenDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { tableBiteStore } from './store/tableBiteStore';

export function App() {
  const [currentRole, setCurrentRole] = useState<'landing' | 'customer' | 'kitchen' | 'admin'>('landing');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tableParam = params.get('table');
    const roleParam = params.get('role');

    if (tableParam) {
      tableBiteStore.setCurrentTable(tableParam);
      setCurrentRole('customer');
    } else if (roleParam && ['customer', 'kitchen', 'admin', 'landing'].includes(roleParam)) {
      setCurrentRole(roleParam as any);
    }
  }, []);

  const handleLaunchCustomer = (tableNum: string = '04') => {
    tableBiteStore.setCurrentTable(tableNum);
    setCurrentRole('customer');
    window.history.pushState({}, '', `/?table=${tableNum}`);
  };

  const handleLaunchKitchen = () => {
    setCurrentRole('kitchen');
    window.history.pushState({}, '', `/?role=kitchen`);
  };

  const handleLaunchAdmin = () => {
    setCurrentRole('admin');
    window.history.pushState({}, '', `/?role=admin`);
  };

  const handleNavigate = (role: 'landing' | 'customer' | 'kitchen' | 'admin') => {
    setCurrentRole(role);
    if (role === 'customer') {
      window.history.pushState({}, '', `/?table=${tableBiteStore.getState().currentTableNumber}`);
    } else if (role === 'landing') {
      window.history.pushState({}, '', `/`);
    } else {
      window.history.pushState({}, '', `/?role=${role}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FAF7F2] text-slate-900">
      <RoleBar currentRole={currentRole} onNavigate={handleNavigate} />

      <div className="flex-1">
        {currentRole === 'landing' && (
          <LandingPage
            onLaunchCustomer={handleLaunchCustomer}
            onLaunchKitchen={handleLaunchKitchen}
            onLaunchAdmin={handleLaunchAdmin}
          />
        )}

        {currentRole === 'customer' && <CustomerApp />}

        {currentRole === 'kitchen' && <KitchenDashboard />}

        {currentRole === 'admin' && <AdminDashboard />}
      </div>
    </div>
  );
}

export default App;
