import { 
  BarChart, Bar, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, XAxis, YAxis 
} from 'recharts';
import { LineChart, Line, CartesianGrid } from 'recharts'; // Impor komponen untuk LineChart
import { formatCurrency } from '../../../api/data/mockData';

const BarCard = ({ data }) => (
  <div className="grid-item chart-container trend-chart-dominant">
    <h3 className="chart-title">Tren Pengeluaran Harian</h3>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-neutral-border)" />
        <XAxis dataKey="date" stroke="var(--color-neutral-text)" fontSize={12} />
        <YAxis stroke="var(--color-neutral-text)" fontSize={12} tickFormatter={value => `${(value / 1000000)} jt`} />
        <Tooltip formatter={(value) => [formatCurrency(value), 'Pengeluaran']} contentStyle={{ backgroundColor: 'var(--color-primary)', borderColor: 'var(--color-neutral-border)', borderRadius: '12px' }} />
        <Legend />
        <Line type="monotone" dataKey="Pengeluaran" stroke="var(--color-secondary)" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default BarCard;