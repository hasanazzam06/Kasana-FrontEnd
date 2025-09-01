export const fetchChat = async (chatHistory) => {
  try {
    const response = await fetch('/api/projects/user');
    if (!response.ok) {
      throw new Error('Gagal mengambil data proyek');
    }
    const result = await response.json();
    chatHistory(result.data.chatHistory); // Data awal disimpan di state
  } catch (error) {
    console.error("Error fetching projects: ", error);
  }
};