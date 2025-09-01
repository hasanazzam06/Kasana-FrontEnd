export const fetchDashboard = async (setDashboardData, setLoading) => {
  try {
    const response = await fetch('/api/expenses/dashboard');
    if (!response.ok) {
      throw new Error('Gagal mengambil data proyek');
    }
    const result = await response.json();
    setDashboardData(result.data.dashboardData);
  } catch (error) {
    console.error("Error fetching projects: ", error);
  }  finally {
    setLoading(false); // Apapun hasilnya, loading selesai
  }
};