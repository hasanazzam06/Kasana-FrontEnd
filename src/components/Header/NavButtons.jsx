import React from 'react';
import { PieChart, Table, MessageSquare, Users } from 'lucide-react'; // Tambahkan ikon Users

// Terima prop 'userRole' untuk menentukan peran pengguna
const NavButtons = ({ activeView, onNavClick, userRole }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dasbor', icon: PieChart, adminOnly: false },
    { id: 'expenses', label: 'Pengeluaran', icon: Table, adminOnly: false },
    // Tambahkan item baru untuk manajemen pengguna
    { id: 'settings', label: 'Pengaturan', icon: Users, adminOnly: true },
  ];

  return (
    <>
      {navItems.map((item) => {
        // Logika untuk render kondisional:
        // Jika item ini hanya untuk admin, TAPI peran pengguna bukan admin, jangan render (return null).
        if (item.adminOnly && userRole !== 'admin') {
          return null;
        }

        // Jika lolos, render tombolnya.
        return (
          <button
            key={item.id}
            onClick={() => onNavClick(item.id)}
            className={`nav-button ${activeView === item.id ? 'nav-button-active' : 'nav-button-default'}`}
          >
            <item.icon size={20} className="nav-button-icon" />
            <span className="nav-button-text">{item.label}</span>
          </button>
        );
      })}
    </>
  );
};

export default NavButtons;
