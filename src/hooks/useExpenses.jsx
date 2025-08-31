// src/hooks/useExpenses.js
import { useState, useMemo } from 'react';

export const useExpenses = (initialExpenses, currentProject, user) => {
  const [allExpenses, setAllExpenses] = useState(initialExpenses);

  const projectExpenses = useMemo(
    () => allExpenses.filter((e) => e.projectId === currentProject.id),
    [allExpenses, currentProject.id]
  );

  const handleAddExpense = (description, amount) => {
    const newId = allExpenses.length + 1;
    const newExpense = {
      id: newId,
      projectId: currentProject.id,
      date: new Date().toISOString().split('T')[0],
      description,
      amount,
      category: 'Lain-lain',
      member: user.name,
      status: 'pending',
    };
    setAllExpenses((prev) => [...prev, newExpense]);
  };

  const handleVerifyExpense = (expenseToVerify) => {
    setAllExpenses((prev) =>
      prev.map((exp) =>
        exp.id === expenseToVerify.id ? { ...exp, status: 'verified' } : exp
      )
    );
    console.log(`Pengeluaran ID #${expenseToVerify.id} telah diverifikasi.`);
  };

  const handleDeleteExpenses = (idsToDelete) => {
    const updatedExpenses = allExpenses.filter(exp => !idsToDelete.includes(exp.id));
    setAllExpenses(updatedExpenses); // Pastikan useExpenses mengekspos setAllExpenses
    console.log(`Berhasil menghapus ${idsToDelete.length} item.`);
  };

  return {
    allExpenses,
    projectExpenses,
    handleAddExpense,
    handleVerifyExpense,
    handleDeleteExpenses
  };
};


// ---