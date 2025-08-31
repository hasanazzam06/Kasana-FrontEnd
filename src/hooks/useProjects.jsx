// src/hooks/useProjects.js
import { useState, useMemo } from 'react';
import { getRole } from '../api/data/mockData';

export const useProjects = (user, setUser, initialProjects, setActiveView, setIsModalOpen) => {
  const [allProjects, setAllProjects] = useState(initialProjects);
  const [currentProject, setCurrentProject] = useState(
    initialProjects.find(p => user.projects.includes(p.id)) || initialProjects[0]
  );

  const userRole = useMemo(
    () => getRole(currentProject.id, user.id, allProjects),
    [currentProject, user.id, allProjects]
  );

  const handleSelectProject = (projectId) => {
    const project = allProjects.find((p) => p.id === projectId);
    setCurrentProject(project);
    setActiveView('dashboard');
  };

  const handleJoinProject = (accessCode) => {
    const projectToJoin = allProjects.find((p) => p.accessCode === accessCode);
    if (projectToJoin && !user.projects.includes(projectToJoin.id)) {
      setUser((prev) => ({ ...prev, projects: [...prev.projects, projectToJoin.id] }));
      const updatedProjects = allProjects.map((p) =>
        p.id === projectToJoin.id
          ? { ...p, members: [...p.members, { id: user.id, name: user.name, role: 'member' }] }
          : p
      );
      setAllProjects(updatedProjects);
      handleSelectProject(projectToJoin.id);
      setIsModalOpen(false);
      console.log('Berhasil bergabung ke proyek!');
    } else {
      console.log('Kode akses tidak valid atau Anda sudah menjadi anggota.');
    }
  };

  const handleCreateProject = (projectData) => {
    const { name, description, budget, accessCode } = projectData;

    const newProjectId = `proj-${allProjects.length + 1}`;
    
    // Buat kode akses otomatis jika kosong, atau gunakan input pengguna
    const finalAccessCode = accessCode || name.toUpperCase().replace(/\s/g, '').substring(0, 6) + Math.floor(Math.random() * 1000);

    const newProject = {
      id: newProjectId,
      name,
      description: description || 'Tidak ada deskripsi.', // Deskripsi default
      accessCode: finalAccessCode,
      members: [{ id: user.id, name: user.name, role: 'admin' }],
      budget: Number(budget), // Pastikan budget adalah angka
    };

    setAllProjects((prev) => [...prev, newProject]);
    setUser((prev) => ({ ...prev, projects: [...prev.projects, newProjectId] }));
    handleSelectProject(newProjectId);
    setIsModalOpen(false);
    console.log(`Proyek "${name}" berhasil dibuat! Kode akses: ${finalAccessCode}`);
  };

  const handlePromoteUser = (userIdToPromote) => {
    const updatedProjects = allProjects.map(project => {
      // Cari proyek yang sedang aktif
      if (project.id === currentProject.id) {
        // Ubah peran anggota yang dituju
        const updatedMembers = project.members.map(member => {
          if (member.id === userIdToPromote) {
            return { ...member, role: 'admin' };
          }
          return member;
        });
        return { ...project, members: updatedMembers };
      }
      return project;
    });

    setAllProjects(updatedProjects);
    console.log(`Pengguna dengan ID ${userIdToPromote} telah diangkat menjadi admin.`);
  };

  return {
    allProjects,
    currentProject,
    userRole,
    handleSelectProject,
    handleJoinProject,
    handleCreateProject,
    handlePromoteUser,
  };
};