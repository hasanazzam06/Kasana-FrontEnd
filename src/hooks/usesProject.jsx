// src/hooks/useChat.js
import { useState } from 'react';
import { mockProjects as initialProjects } from '../api/mockData';

export const useProject = () => {
  const [activeProjectId, setActiveProjectId] = useState(initialProjects[0].id);
  const [activeProjectData, setActiveProjectData] = useState(initialProjects);

  return { 
    activeProjectId, 
    setActiveProjectId,
    activeProjectData, 
    setActiveProjectData,
  };
};
