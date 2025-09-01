import { useEffect, useState } from 'react';
import { fetchDashboard } from './api';

import {
  Wallet, ArrowDownCircle, ShieldCheck, Clock, TrendingUp
} from 'lucide-react';

import './Dashboard.css';
import StatCard from './StatCard';
import BarCard from './BarCard';
import PieCard from './PieCard';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard(setDashboardData, setLoading);
  }, []);

  if (loading) {
    return <div>Memuat data dashboard...</div>;
  }

  if (!dashboardData) {
    return <div>Gagal memuat data.</div>;
  }

  const {       
    budget, totalExpenses, remainingBudget, totalVerified, totalPending, largestExpense, chartData, trendChartData 
  } = dashboardData;

  const COLORS = ['var(--color-secondary)', 'var(--color-tertiary)', '#a7c957', '#e76f51', '#83c5be'];

  return (
      <div className="grid-container">
        {/* Kartu Statistik */}
        <StatCard title="Total Anggaran" amount={budget} icon={<Wallet size={24} />} iconBg="var(--color-secondary)" iconColor="var(--color-text-on-accent)" />
        <StatCard title="Total Pengeluaran" amount={totalExpenses} icon={<ArrowDownCircle size={24} />} iconBg="var(--color-tertiary)" iconColor="var(--color-neutral-text)" />
        <StatCard title="Sisa Anggaran" amount={remainingBudget} icon={<Wallet size={24} />} iconBg="var(--color-secondary)" iconColor="var(--color-text-on-accent)" />
        <StatCard title="Terverifikasi" amount={totalVerified} icon={<ShieldCheck size={24} />} iconBg="var(--color-secondary)" iconColor="var(--color-text-on-accent)" />
        <StatCard title="Menunggu Verifikasi" amount={totalPending} icon={<Clock size={24} />} iconBg="var(--color-tertiary)" iconColor="var(--color-neutral-text)" />
        <StatCard title="Pengeluaran Terbesar" amount={largestExpense} icon={<TrendingUp size={24} />} iconBg="var(--color-neutral-bg)" iconColor="var(--color-neutral-text)" />
        
        <BarCard data={trendChartData}/>
        <PieCard data={chartData} COLORS={COLORS} />
        
      </div>
  );
};

export default Dashboard;
