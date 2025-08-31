// src/data/mockData.js

export const MOCK_USERS = [
  { id: 'user-1', name: 'Ani', projects: ['proj-1', 'proj-2'] },
  { id: 'user-2', name: 'Budi', projects: ['proj-1'] },
  { id: 'user-3', name: 'Sinta', projects: ['proj-2'] },
];

export const MOCK_PROJECTS = [
  {
    id: 'proj-1',
    name: "Proyek 'Karya Baru'",
    accessCode: 'KARYABARU2025',
    members: [
      { id: 'user-1', name: 'Ani', role: 'admin' },
      { id: 'user-2', name: 'Budi', role: 'member' },
    ],
    budget: 50000000,
  },
  {
    id: 'proj-2',
    name: "Proyek 'Media Digital'",
    accessCode: 'MEDIADIGITAL01',
    members: [
      { id: 'user-1', name: 'Ani', role: 'member' },
      { id: 'user-3', name: 'Sinta', role: 'admin' },
    ],
    budget: 75000000,
  },
];

export const MOCK_EXPENSES = [
  { id: 1, projectId: 'proj-1', date: '2025-08-01', description: 'Pembelian bahan seni', amount: 5000000, category: 'Material', member: 'Budi', status: 'verified', receiptUrl: 'https://placehold.co/600x800/EAE6CC/280A3E?text=Struk+Semen' },
  { id: 2, projectId: 'proj-1', date: '2025-08-05', description: 'Biaya sewa studio', amount: 8000000, category: 'Operasional', member: 'Ani', status: 'verified', receiptUrl: 'https://placehold.co/600x800/EAE6CC/280A3E?text=Struk+Upah' },
  { id: 3, projectId: 'proj-1', date: '2025-08-10', description: 'Makan siang tim', amount: 500000, category: 'Konsumsi', member: 'Budi', status: 'pending', receiptUrl: 'https://placehold.co/600x800/EAE6CC/280A3E?text=Struk+Sewa' },
  { id: 4, projectId: 'proj-2', date: '2025-08-15', description: 'Promosi media sosial', amount: 3500000, category: 'Pemasaran', member: 'Sinta', status: 'verified', receiptUrl: 'https://placehold.co/600x800/EAE6CC/280A3E?text=Struk+Sewa' },
  { id: 5, projectId: 'proj-2', date: '2025-08-20', description: 'Upah pekerja lepas', amount: 7000000, category: 'SDM', member: 'Ani', status: 'pending', receiptUrl: null },
];

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const getRole = (projectId, userId, projects) => {
  const project = projects.find(p => p.id === projectId);
  if (!project) return null;
  const member = project.members.find(m => m.id === userId);
  return member ? member.role : null;
};
