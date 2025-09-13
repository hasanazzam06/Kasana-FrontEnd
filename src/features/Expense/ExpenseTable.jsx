import { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import { TableRow } from './components/TableRow';
import { fetchTable } from './api';
import './ExpenseTable.css'; // Impor file CSS baru

// Komponen utama ExpenseTable
const ExpenseTable = ({ userRole, onVerify, onDelete }) => {
  const [viewingReceipt, setViewingReceipt] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [expenses, setExpenses] = useState(null);

  const projectId = 'proj-2';

  useEffect(() => { fetchTable(projectId, setExpenses, setLoading) }, [])

  if (loading) {
    return <div>Memuat data dashboard...</div>;
  }

  const pendingExpenses = expenses.filter(e => e.status === 'pending');

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(expenses.map(exp => exp.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    onDelete(selectedIds); // Panggil fungsi dari parent
    setIsDeleteModalOpen(false);
    setSelectedIds([]);
  };

  return (
    <div className="table-layout">
      {userRole === 'admin' && pendingExpenses.length > 0 && (
        <div className="pending-alert-table">
          <p>Ada {pendingExpenses.length} pengeluaran yang menunggu verifikasi.</p>
        </div>
      )}
      
      <div className="table-container">
        <h2 className="table-title">Detail Pengeluaran</h2>
        {selectedIds.length > 0 && userRole === 'admin' && (
          <button className="delete-selected-button" onClick={() => setIsDeleteModalOpen(true)}>
            <Trash2 size={16} />
            Hapus {selectedIds.length} item
          </button>
        )}
        <div className="table-scroll-wrapper">
          <table className="expense-table">
            <thead>
              <tr className="table-header">
                {userRole === 'admin'? (
                  <th className="table-cell text-center checkbox-cell">
                    <input 
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedIds.length === expenses.length && expenses.length > 0}
                    />
                  </th>
                ):null}
                <th className="table-cell text-center">ID</th>
                <th className="table-cell">Tanggal</th>
                <th className="table-cell">Deskripsi</th>
                <th className="table-cell">Nominal</th>
                <th className="table-cell">Kategori</th>
                <th className="table-cell">Anggota</th>
                <th className="table-cell text-center">Status</th>
                <th className="table-cell text-center">Bukti</th>
                {userRole === 'admin' ? (
                  <th className="table-cell text-center">Aksi</th>
                ) : null}
              </tr>
            </thead>
            <tbody className="table-body">
              {expenses.map(expense => (
                <TableRow 
                  key={expense.id} 
                  expense={expense} 
                  userRole={userRole} 
                  onVerify={onVerify}
                  setViewingReceipt={setViewingReceipt}
                  selectedIds={selectedIds}
                  handleSelectOne={handleSelectOne} 
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {viewingReceipt && (
        <div className="modal-overlay" onClick={() => setViewingReceipt(null)}>
          <div className="modal-content receipt-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-button" onClick={() => setViewingReceipt(null)}>
              <X size={24} />
            </button>
            <img src={viewingReceipt} alt="Struk Pengeluaran" className="receipt-image" />
          </div>
        </div>
      )}
      {/* ... (Modal Struk) ... */}

      {/* MODAL KONFIRMASI HAPUS */}
      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content confirmation-modal">
            <h3 className="modal-title">Konfirmasi Hapus</h3>
            <p className="modal-text">
              Anda yakin ingin menghapus {selectedIds.length} data pengeluaran secara permanen? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="modal-actions">
              <button className="button-secondary" onClick={() => setIsDeleteModalOpen(false)}>Batal</button>
              <button className="button-danger" onClick={handleDelete}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseTable;
