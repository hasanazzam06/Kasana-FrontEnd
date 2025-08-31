import React, { useState, useEffect } from 'react';

import NewProjectForm from '../Form/Form'
import './Sidebar.css';

const Sidebar = ({ activeProjectId, handleProjectSelect, onMenuSelect, activeMenu }) => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isAddProject, setIsAddProject] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects/user');
        if (!response.ok) {
          throw new Error('Gagal mengambil data proyek');
        }
        const result = await response.json();
        setProjects(result.data.projects); // Data awal disimpan di state
      } catch (error) {
        console.error("Error fetching projects: ", error);
      }
    };
    fetchProjects();
  }, []); // Array dependensi kosong: efek hanya berjalan sekali

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleProjectDropdown = () => {
    setIsProjectDropdownOpen(!isProjectDropdownOpen);
  };

  const toggleAddProject = () => {
    setIsAddProject(!isAddProject);
  }

  const updateProject = (data) => {
    setProjects(prevProjects => [...prevProjects, data]);
    // console.log(projects);
  }
  

return (
  <div className={`sidebar ${isMinimized ? 'minimized' : ''}`}>
    <div className="sidebar-header">
      {!isMinimized && <div className="menu-header">Menu</div>}
      <button className="toggle-button" onClick={toggleSidebar}>
         {isMinimized ? '→' : '←'} {/* rotate */}
      </button>
    </div>

    <div className="add-project-button-wrapper">
      <button className="add-project-button" onClick={toggleAddProject}>
        <i className="add-icon">+</i>
        {!isMinimized && <span>Tambahkan Proyek</span>}
      </button>
    </div>

    <div className="menu-list">
      <div
        className={`menu-item dropdown-toggle ${activeMenu === 'dashboard' && (isMinimized || !isProjectDropdownOpen) ? 'active' : ''}`}
        onClick={() => {
          toggleProjectDropdown();
          onMenuSelect('dashboard');
        }}
      >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-folder-open"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 19l2.757 -7.351a1 1 0 0 1 .936 -.649h12.307a1 1 0 0 1 .986 1.164l-.996 5.211a2 2 0 0 1 -1.964 1.625h-14.026a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v2" /></svg>
        {!isMinimized && (
          <>
            <span>Daftar Proyek</span>
            <span className={`dropdown-arrow ${!isProjectDropdownOpen ? 'rotate' : ''}`}>▲</span>
          </>
        )}
      </div>
      
      {isProjectDropdownOpen && !isMinimized && (
        <ul className="project-dropdown-list">
          {projects.map(project => (
            <li
              key={project.id}
              className={`project-dropdown-item ${project.id === activeProjectId ? 'active-project' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                handleProjectSelect(project.id);
                onMenuSelect('dashboard');
              }}
            >
              {project.name}
            </li>
          ))}
        </ul>
      )}
      
      <div
        className={`menu-item ${activeMenu === 'list' ? 'active' : ''}`}
        onClick={() => onMenuSelect('list')}
      >
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-list"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l11 0" /><path d="M9 12l11 0" /><path d="M9 18l11 0" /><path d="M5 6l0 .01" /><path d="M5 12l0 .01" /><path d="M5 18l0 .01" /></svg>
        {!isMinimized && <span>List</span>}
      </div>
      <div
        className={`menu-item ${activeMenu === 'settings' ? 'active' : ''}`}
        onClick={() => onMenuSelect('settings')}
      >
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-settings"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
        {!isMinimized && <span>Pengaturan</span>}
      </div>
      <div
        className={`menu-item ${activeMenu === 'logout' ? 'active' : ''}`}
        onClick={() => onMenuSelect('Logout')}
      >
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-logout"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>        
        {!isMinimized && <span>logout</span>}
      </div>
    </div>
    
    {isAddProject && (<NewProjectForm onClose={toggleAddProject} onCreate={updateProject}/>)}
  </div>
  );
};

export default Sidebar;