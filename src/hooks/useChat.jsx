import { fecthChatSubmit, fetchFileSubmit } from '../features/Chat/api';

export const useChat = () => {
  const handleChatSubmit = async (chatInput, setChatInput, setChatHistory) => {
    if (chatInput.trim() !== '') {
      const newChat = {
        id: Date.now(), // Gunakan timestamp untuk ID unik
        userId: 'user-1',
        projectId: 'proj-2',
        user: 'user',
        text: chatInput,
      };
      setChatHistory((prev) => [...(prev|| []), newChat]);
      const responseAI = await fecthChatSubmit(newChat);
      setChatInput('');
      setChatHistory((prev) => [...(prev|| []), responseAI]);
    }
  };

  const handleFileUpload = async (files, setChatHistory) => {
    if (files.length > 0) {
      const fileName = files[0].name;
      const fileMessage = {
        id: Date.now(),
        userId: 'user-1',
        projectId: 'proj-2',
        user: 'user',
        text: `Mengunggah file: ${fileName}`,
      };
      
      setChatHistory((prev) => [...(prev|| []), fileMessage]);

      const { responseAI } = await fetchFileSubmit(files, fileMessage);

      setChatHistory((prev) => [...(prev|| []), responseAI]);
    }
  };

  return { handleChatSubmit, handleFileUpload };
};