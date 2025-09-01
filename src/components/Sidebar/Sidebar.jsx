import React, { useState, useEffect } from 'react';
import { fetchProjects } from './api';


import Icon from '../Icon/Icon';
import NewProjectForm from '../Form/Form'
import './Sidebar.css';

const Sidebar = ({ activeProjectId, handleProjectSelect, onMenuSelect, activeMenu }) => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isAddProject, setIsAddProject] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects(setProjects);
  }, []);
  
return (
  <div className={`sidebar ${isMinimized ? 'minimized' : ''}`}>
    <div className="sidebar-header">
      {!isMinimized && <div className="menu-header">Menu</div>}
      <button className="toggle-button" onClick={() => setIsMinimized(!isMinimized)}>
         {isMinimized ? '→' : '←'}
      </button>
    </div>

    <div className="add-project-button-wrapper">
      <button className="add-project-button" onClick={() => setIsAddProject(!isAddProject)}>
        <i className="add-icon">+</i>
        {!isMinimized && <span>Tambahkan Proyek</span>}
      </button>
    </div>

    <div className="menu-list">
      <div
        className={`menu-item dropdown-toggle ${activeMenu === 'dashboard' && (isMinimized || !isProjectDropdownOpen) ? 'active' : ''}`}
        onClick={() => {
          setIsProjectDropdownOpen(!isProjectDropdownOpen);
          onMenuSelect('dashboard');
        }}
      >
        <Icon name='folder' className="icon"/>
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
        <Icon name='list' className="icon"/>
        {!isMinimized && <span>List</span>}
      </div>
      <div
        className={`menu-item ${activeMenu === 'settings' ? 'active' : ''}`}
        onClick={() => onMenuSelect('settings')}
      >
        <Icon name='settings' className="icon"/>
        {!isMinimized && <span>Pengaturan</span>}
      </div>
      <div
        className={`menu-item ${activeMenu === 'logout' ? 'active' : ''}`}
        onClick={() => onMenuSelect('Logout')}
      >
        <Icon name='logout' className="icon"/>
        {!isMinimized && <span>logout</span>}
      </div>
    </div>
    
    {isAddProject && (<NewProjectForm onClose={() => setIsAddProject(!isAddProject)} onCreate={(data) => setProjects(prevProjects => [...prevProjects, data])}/>)}
  </div>
  );
};

export default Sidebar;