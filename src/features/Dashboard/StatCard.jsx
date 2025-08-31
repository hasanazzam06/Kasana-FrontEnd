import { formatCurrency } from '../../api/data/mockData';

const StatCard = ({ title, amount, icon, iconBg, iconColor }) => (
  <div className="card-container grid-item">
    <div className="card-header">
      <div className="card-icon" style={{ backgroundColor: iconBg, color: iconColor }}>
        {icon}
      </div>
      <h3 className="card-title">{title}</h3>
    </div>
    <p className="card-amount">{formatCurrency(amount)}</p>
  </div>
);

export default StatCard;