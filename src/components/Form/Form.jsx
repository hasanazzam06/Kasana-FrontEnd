import React, { useState } from 'react';
import './Form.css'; // Kita akan buat file CSS ini

const NewProjectForm = ({ onClose, onCreate }) => {
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    budget: '',
    accessCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects/user',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectData),
        });
        if (!response.ok) {
          throw new Error('Gagal mengambil data proyek');
        }
        const data = await response.json();
        console.log(data);
        console.log(data.data) // Data awal disimpan di state
        onCreate(data.data);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      }
    };
    fetchProjects();
  };

  return (
    <>
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content receipt-modal" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="new-project-form">
          <div className="form-group">
            <label htmlFor="name">Nama Proyek</label>
            <input
              type="text"
              id="name"
              name="name"
              value={projectData.name}
              onChange={handleChange}
              placeholder="Contoh: Renovasi Rumah Impian"
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Deskripsi Singkat (Opsional)</label>
            <textarea
              id="description"
              name="description"
              value={projectData.description}
              onChange={handleChange}
              placeholder="Jelaskan tujuan singkat dari proyek ini"
              rows="3"
            />
          </div>
          <div className="form-group">
            <label htmlFor="budget">Anggaran Awal (Rp)</label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={projectData.budget}
              onChange={handleChange}
              placeholder="Contoh: 50000000"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="accessCode">Kode Gabung (Opsional)</label>
            <input
              type="text"
              id="accessCode"
              name="accessCode"
              value={projectData.accessCode}
              onChange={handleChange}
              placeholder="Kosongkan untuk kode otomatis"
            />
            <small>Gunakan kode unik agar mudah diingat oleh tim Anda.</small>
          </div>
          <div className="form-actions">
            <button type="button" onClick={onClose} className="button-secondary">Batal</button>
            <button type="submit" className="button-primary">Buat Proyek</button>
          </div>
        </form>
      </div>
    </div>
    </>
);
};

export default NewProjectForm;
