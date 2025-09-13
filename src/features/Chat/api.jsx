export const fetchChat = async (setChatHistory) => {
  try {
    const response = await fetch('/api/chat/history/proj-2/user-1');
    if (!response.ok) {
      throw new Error('Gagal mengambil data proyek');
    }
    const result = await response.json();
    setChatHistory([ ...result.data.historyChat]); // Data awal disimpan di state
  } catch (error) {
    console.error("Error fetching projects: ", error);
  }
};

export const fecthChatSubmit = async (newChat) => {
  try {
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newChat }), // Kirim chatInput ke backend
    });
    if (!response.ok) {
      throw new Error('Gagal mendapatkan balasan dari AI.');
    }
    const result = await response.json();
    const { responseAI } = result.data;
    return responseAI;
  } catch (error) {
    console.error('Error fetching chat', error);
  }
}

export const fetchFileSubmit = async (files, fileMessage) => {
  try {
    const formData = new FormData();
    for (const file of files) {
      formData.append('file', file); // 'file' adalah nama field yang akan diterima di backend
    }

    const jsonBlob = new Blob([JSON.stringify(fileMessage)], {
      type: 'application/json'
    })

    formData.append('data', jsonBlob);

    const response = await fetch('/api/chat/file', {
      method: 'POST',
      body: formData,
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;

  } catch (error) {
    console.error('Error saat mengirim file:', error);
    throw error;
  }
}