export const mockProjects = [
  {
    id: 'project-abc',
    name: 'Proyek ABC',
    summary: {
      totalExpenses: 12500,
      remainingBudget: 7500,
    },
    expenses: [
      { id: 1, description: 'Pembelian Laptop', amount: 5000, status: 'verified' },
      { id: 2, description: 'Biaya Iklan', amount: 2500, status: 'pending' },
      { id: 3, description: 'Sewa Ruangan', amount: 5000, status: 'verified' },
    ],
    chatHistory: [
      { id: 1, user: 'ai', text: 'Halo, ada yang bisa saya bantu?' },
      { id: 2, user: 'user', text: 'Saya ingin melapor biaya iklan.' },
      { id: 3, user: 'ai', text: 'Baik, silakan ketikkan detailnya.' },
    ],
  },
  {
    id: 'project-xyz',
    name: 'Proyek XYZ',
    summary: {
      totalExpenses: 8000,
      remainingBudget: 12000,
    },
    expenses: [
      { id: 4, description: 'Pengadaan Server', amount: 8000, status: 'verified' },
    ],
    chatHistory: [
      { id: 4, user: 'ai', text: 'Selamat datang di Proyek XYZ. Ada laporan baru?' },
      { id: 5, user: 'user', text: 'Belum ada.' },
    ],
  },
];

// Fungsi untuk mendapatkan data proyek berdasarkan ID
export const getProjectData = (projectId) => {
  // return mockProjects.find(project => project.id === projectId);
  return mockProjects.find(projectId[0]);
};