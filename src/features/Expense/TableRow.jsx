import { formatCurrency } from '../../api/data/mockData';
import { CheckCircle, User, ImageIcon, X, Trash2 } from 'lucide-react';


// const onVerify= (id) => {

// }
// Komponen kecil untuk setiap baris tabel
export const TableRow = ({ expense, userRole, onVerify, setViewingReceipt, selectedIds, handleSelectOne }) => (
  <tr className="table-row">
    {userRole === 'admin' && (
      <td className="table-cell text-center checkbox-cell">
        <input 
          type="checkbox"
          checked={selectedIds.includes(expense.id)}
          onChange={() => handleSelectOne(expense.id)}
        />
      </td>
    )}
    <td className="table-cell text-center font-semibold">{expense.id}</td>
    <td className="table-cell">{expense.date}</td>
    <td className="table-cell">{expense.description}</td>
    <td className="table-cell font-medium">{formatCurrency(expense.amount)}</td>
    <td className="table-cell">{expense.category}</td>
    <td className="table-cell member-cell">
      <User size={16} className="member-icon" />
      <span>{expense.member}</span>
    </td>
    <td className="table-cell text-center">
      <span className={`status-badge ${expense.status === 'verified' ? 'status-verified' : 'status-pending'}`}>
        {expense.status === 'verified' ? 'Terverifikasi' : 'Menunggu'}
      </span>
    </td>
    <td className="table-cell text-center">
      {expense.receiptUrl && (
        <button 
          onClick={() => setViewingReceipt(expense.receiptUrl)} 
          className="action-button icon-button"
          title="Lihat Bukti"
        >
          <ImageIcon size={20} />
        </button>
      )}
    </td>
    {userRole === 'admin' ? (
      <td className="table-cell text-center">
        {expense.status === 'pending' ? (
          <button onClick={() => onVerify(expense)} className="action-button">
            <CheckCircle size={20} />
          </button>
        ) : (
          <CheckCircle size={20} className="action-icon-disabled" />
        )}
      </td>
    ) : null}
  </tr>
);