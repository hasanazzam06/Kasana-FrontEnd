import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { formatCurrency } from '../../../api/data/mockData';

const PieCard = ({ data, COLORS }) => (
  <div className="chart-container grid-item pie-chart-container">
    <h3 className="chart-title">Persentase Kategori</h3>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [formatCurrency(value), 'Total']} contentStyle={{ backgroundColor: 'var(--color-primary)', borderColor: 'var(--color-neutral-border)', borderRadius: '12px' }} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default PieCard;