export const fetchProjects = async (setProjects) => {
  try {
    const response = await fetch('/api/projects/user');
    if (!response.ok) {
      throw new Error('Gagal mengambil data proyek');
    }
    const result = await response.json();
    setProjects(result.data.projects); // Data awal disimpan di state
  } catch (error) {
    console.error("Error fetching projects: ", error);
  }
};