// src/hooks/useChat.js
import { useState } from 'react';
import { mockProjects as initialProjects } from '../api/mockData';

export const useProject = () => {
  const [activeProjectData, setActiveProjectData] = useState(initialProjects);

  return { 
    activeProjectData, 
    setActiveProjectData,
  };
};
