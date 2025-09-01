import { useState } from 'react';
import { User, ShieldCheck, ArrowUpCircle, Clipboard, ClipboardCheck } from 'lucide-react';
import './ProjectSettings.css'; // Kita akan buat file CSS baru

const ProjectSettings = ({ project, currentUser, onPromoteUser }) => {
  const [userToPromote, setUserToPromote] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  if (!project) {
    return <div className="settings-layout"><p>Data proyek tidak ditemukan.</p></div>;
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(project.accessCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset status "copied" setelah 2 detik
  };

  const handlePromoteClick = () => {
    if (userToPromote) {
      onPromoteUser(userToPromote.id);
      setUserToPromote(null);
    }
  };

  return (
    <div className="settings-layout">
      {/* BAGIAN 1: INFORMASI PROYEK */}
      <div className="settings-container info-card">
        <h2 className="settings-title">{project.name}</h2>
        <p className="settings-description">
          Ini adalah halaman pengaturan untuk proyek Anda. Di sini Anda dapat melihat detail proyek dan mengelola anggota tim.
        </p>
        <div className="join-code-wrapper">
          <span className="join-code-label">Kode Gabung Proyek:</span>
          <div className="join-code-box">
            <span className="join-code">{project.accessCode}</span>
            <button onClick={handleCopyCode} className="copy-button" title="Salin Kode">
              {isCopied ? <ClipboardCheck size={20} /> : <Clipboard size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* BAGIAN 2: MANAJEMEN PENGGUNA */}
      <div className="settings-container">
        <h3 className="settings-subtitle">Anggota Tim</h3>
        <ul className="user-list">
          {project.members.map((member) => (
            <li key={member.id} className="user-list-item">
              <div className="user-info">
                <div className="user-avatar"><User size={20} /></div>
                <span className="user-name">{member.name}</span>
              </div>
              <div className="role-and-action">
                <div className={`user-role ${member.role === 'admin' ? 'role-admin' : ''}`}>
                  <ShieldCheck size={16} />
                  <span>{member.role}</span>
                </div>
                {currentUser.role === 'admin' && member.role !== 'admin' && currentUser.id !== member.id && (
                  <button 
                    className="promote-button" 
                    title={`Angkat ${member.name} menjadi admin`}
                    onClick={() => setUserToPromote(member)}
                  >
                    <ArrowUpCircle size={20} />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* MODAL KONFIRMASI (tetap sama) */}
      {userToPromote && (
        <div className="modal-overlay">
          <div className="modal-content confirmation-modal">
            <h3 className="modal-title">Konfirmasi Tindakan</h3>
            <p className="modal-text">
              Anda yakin ingin mengangkat <strong>{userToPromote.name}</strong> menjadi admin?
            </p>
            <div className="modal-actions">
              <button className="button-secondary" onClick={() => setUserToPromote(null)}>Batal</button>
              <button className="button-primary" onClick={handlePromoteClick}>Ya, Angkat</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectSettings;
