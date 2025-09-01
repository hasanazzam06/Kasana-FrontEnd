import { useState } from 'react';

export const useChat = (setActiveProjectData) => {
  const [chatInput, setChatInput] = useState('');

  const handleChatSubmit = () => {
    if (chatInput.trim() !== '') {
      const newUserMessage = {
        id: Date.now(), // Gunakan timestamp untuk ID unik
        user: 'user',
        text: chatInput,
      };

      // Perbarui chat history dengan pesan pengguna
      setActiveProjectData(prevData => ({
        ...prevData,
        chatHistory: [...(prevData.chatHistory || []), newUserMessage],
      }));
      setChatInput('');

      // Simulasi balasan dari AI
      setTimeout(() => {
        const aiReply = {
          id: Date.now() + 1,
          user: 'ai',
          text: `Halo, saya menerima pesan Anda: "${chatInput}". Silakan tunggu verifikasi.`,
        };
        setActiveProjectData(prevData => ({
          ...prevData,
          chatHistory: [...prevData.chatHistory, aiReply],
        }));
      }, 1000); // Balas setelah 1 detik
    }
  };

  const handleFileUpload = (files) => {
    if (files.length > 0) {
      const fileName = files[0].name;
      const fileMessage = {
        id: Date.now(),
        user: 'user',
        text: `Mengunggah file: ${fileName}`,
      };
      
      setActiveProjectData(prevData => ({
        ...prevData,
        chatHistory: [...prevData.chatHistory, fileMessage],
      }));

      // Simulasi balasan dari AI setelah file diunggah
      setTimeout(() => {
        const aiReply = {
          id: Date.now() + 1,
          user: 'ai',
          text: `File "${fileName}" telah diterima. Terima kasih!`,
        };
        setActiveProjectData(prevData => ({
          ...prevData,
          chatHistory: [...prevData.chatHistory, aiReply],
        }));
      }, 1000);
    }
  };

  return { chatInput, setChatInput, handleChatSubmit, handleFileUpload };
};