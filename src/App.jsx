import React, { useState } from 'react';

import { MOCK_USERS, MOCK_PROJECTS, MOCK_EXPENSES } from './api/data/mockData';

import { useProjects } from './hooks/useProjects';
import { useExpenses } from './hooks/useExpenses';
import { useProject } from './hooks/usesProject'

import Header from './components/Header/Header';
import Sidebar  from './components/Sidebar/Sidebar';
import Chat from './features/Chat/Chat';
// Main Content
import Dashboard from './features/Dashboard/Dashboard';
import ExpenseTable from './features/Expense/ExpenseTable';
import ProjectSettings from './features/ProjectSettings/ProjectSettings';

import './App.css';

const App = () => {
  // State untuk pengguna saat ini dan tampilan aktif
  const [user, setUser] = useState(MOCK_USERS[0]);

  const [activeView, setActiveView] = useState('dashboard');
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const [isChatVisible, setIsChatVisible] = useState(false);

    // Custom hook untuk mengelola semua logika terkait proyek
  const {
    allProjects,
    currentProject,
    userRole,
    handleSelectProject,
    handlePromoteUser,
  } = useProjects(user, setUser, MOCK_PROJECTS, setActiveView);

  // Custom hook untuk mengelola semua logika terkait pengeluaran
  const { projectExpenses, handleVerifyExpense, handleDeleteExpenses } =
    useExpenses(MOCK_EXPENSES, currentProject, user);

  const { activeProjectId, setActiveProjectId } = 
    useProject();

  const handleProjectSelect = (projectId) => {
    setActiveProjectId(projectId);
  };

  const handleMenuSelect = (menu) => {
    setActiveMenu(menu);
  };

  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
  };

  const renderContent = () => { 
    switch (activeView) {
      case 'dashboard':
        return <Dashboard/>;
      case 'expenses':
        return <ExpenseTable
        expenses={projectExpenses}
        userRole={userRole}
        onVerify={handleVerifyExpense}
        onDelete={handleDeleteExpenses}
      />;
      case 'settings': 
        // Dapatkan data pengguna saat ini (termasuk perannya) untuk diteruskan
        { const currentUserWithRole = { ...user, role: userRole };
        return <ProjectSettings 
        project={currentProject}
        currentUser={currentUserWithRole}
        onPromoteUser={handlePromoteUser} />; }
      default:
        return null;
    }
  };

  // const [containerRef, width] = useContainerWidth();

  return (
    <div className="App">
      <Sidebar
        activeProjectId={activeProjectId}
        handleProjectSelect={handleProjectSelect}
        onMenuSelect={handleMenuSelect} // Teruskan fungsi menu
        activeMenu={activeMenu} // Teruskan state menu
      />
      <div className="content-container">
        {/* <div className="content-main full-width" ref={containerRef}> */}
        <div className="content-main full-width" >
          {/* <main className="main-content-data"> */}
          {/* <h2>Lebar Kontainer Saat Ini: {width.toFixed(2)}px</h2> */}
          <Header
            currentProject={currentProject}
            allProjects={allProjects}
            user={user}
            activeView={activeView}
            onSelectProject={handleSelectProject}
            onNavClick={setActiveView}
            userRole={userRole}
          />
          {renderContent()}
          {/* </main> */}
        </div>
        {isChatVisible && (
          <Chat
            onCloseChat={toggleChatVisibility}
          />
        )}
      </div>
      {!isChatVisible && (
          <button className="floating-chat-button" onClick={toggleChatVisibility}>
            Chat
          </button>
      )}
      
    </div>
  );
};

export default App;
