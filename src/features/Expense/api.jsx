export const fetchTable = async (projectId, setExpenses, setLoading) => {
  try {
    const response = await fetch(`/api/expenses/table/${projectId}`);
    if (!response.ok) {
      throw new Error('Gagal mengambil data proyek');
    }
    const result = await response.json();
    setExpenses(result.data.expenses);
  } catch (error) {
    console.error("Error fetching projects: ", error);
  }  finally {
    setLoading(false); // Apapun hasilnya, loading selesai
  }
};