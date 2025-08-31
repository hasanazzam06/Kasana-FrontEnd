class DashboardData {
  constructor(project, expenses){
    this._project = project;
    this._expenses = expenses;

    this.dataProcessing=this.dataProcessing.bind(this);
  }

  dataProcessing() {
    const totalExpenses = this._expenses.reduce((sum, item) => sum + item.amount, 0);
    const remainingBudget = this._project.budget - totalExpenses;
    const verifiedExpenses = this._expenses.filter(e => e.status === 'verified');
    const totalVerified = verifiedExpenses.reduce((sum, item) => sum + item.amount, 0);
    const totalPending = this._expenses.filter(e => e.status === 'pending').reduce((sum, item) => sum + item.amount, 0);
    const largestExpense = Math.max(0, ...this._expenses.map(e => e.amount));
    
    console.log(verifiedExpenses);

    // --- Data untuk Grafik ---
    const expensesByCategory = verifiedExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    const chartData = Object.keys(expensesByCategory).map(category => ({
      name: category,
      value: expensesByCategory[category],
    }));

    const dailyTrendData = verifiedExpenses.reduce((acc, expense) => {
      const date = new Date(expense.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += expense.amount;
      return acc;
    }, {});

    const trendChartData = Object.keys(dailyTrendData).map(date => ({
      date,
      Pengeluaran: dailyTrendData[date],
    })).sort((a, b) => new Date(a.date) - new Date(b.date)); // Pastikan data terurut

    return {
      totalExpenses,
      remainingBudget,
      totalVerified,
      totalPending,
      largestExpense,
      chartData,
      trendChartData
    }
  }
};

export default DashboardData;