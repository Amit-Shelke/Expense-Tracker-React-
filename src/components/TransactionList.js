import React, { useContext, useMemo, useRef, useState } from 'react';
import { Transaction } from './Transaction';

import { GlobalContext } from '../context/GlobalState';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export const TransactionList = () => {
  const { transactions } = useContext(GlobalContext);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1); // 1-12

  const filtered = useMemo(() => {
    return transactions.filter(t => {
      const d = t.date ? new Date(t.date) : null;
      if (!d) return false;
      return (d.getFullYear() === Number(year)) && (d.getMonth() + 1 === Number(month));
    });
  }, [transactions, year, month]);

  const monthLabel = useMemo(() => {
    const m = String(month).padStart(2, '0');
    return `${year}-${m}`;
  }, [year, month]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Monthly Transactions - ${monthLabel}`, 14, 18);
    const rows = filtered.map(t => [
      new Date(t.date).toLocaleDateString(),
      t.text,
      (t.amount < 0 ? '-' : '+') + Math.abs(Number(t.amount)).toFixed(2)
    ]);
    doc.autoTable({
      head: [['Date', 'Description', 'Amount']],
      body: rows,
      startY: 24
    });
    doc.save(`transactions_${monthLabel}.pdf`);
  };

  const downloadExcel = () => {
    const worksheetData = filtered.map(t => ({
      Date: new Date(t.date).toLocaleDateString(),
      Description: t.text,
      Amount: Number(t.amount)
    }));
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
    XLSX.writeFile(workbook, `transactions_${monthLabel}.xlsx`);
  };

  // Charts data
  const categoryData = useMemo(() => {
    const map = {};
    filtered.forEach(t => {
      const key = t.text || 'Uncategorized';
      map[key] = (map[key] || 0) + Number(t.amount);
    });
    // Split into income and expense positive/negative if needed
    const expensesOnly = Object.entries(map)
      .filter(([, v]) => v < 0)
      .map(([k, v]) => ({ name: k, value: Math.abs(v) }));
    return expensesOnly;
  }, [filtered]);

  const barData = useMemo(() => {
    // group by day of month
    const map = {};
    filtered.forEach(t => {
      const d = new Date(t.date).getDate();
      map[d] = (map[d] || 0) + Number(t.amount);
    });
    return Object.keys(map).sort((a,b)=>a-b).map(day => ({ day, total: map[day] }));
  }, [filtered]);

  const COLORS = ['#ff6b6b','#ffa94d','#ffd43b','#69db7c','#74c0fc','#b197fc','#fcc2d7','#63e6be'];

  // Undo toast / delete
  const { deleteTransaction, addTransaction } = useContext(GlobalContext);
  const [toast, setToast] = useState(null);
  const undoTimerRef = useRef(null);

  const handleDelete = (transaction) => {
    deleteTransaction(transaction.id);
    setToast({ message: 'Transaction deleted', payload: transaction });
    clearTimeout(undoTimerRef.current);
    undoTimerRef.current = setTimeout(() => setToast(null), 4000);
  };

  const undoDelete = () => {
    if (toast && toast.payload) {
      addTransaction(toast.payload);
      setToast(null);
    }
  };

  return (
    <>
      <h3>History</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <label>
          Month
          <select value={month} onChange={(e) => setMonth(Number(e.target.value))} style={{ marginLeft: '6px' }}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </label>
        <label>
          Year
          <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} style={{ width: '90px', marginLeft: '6px' }} />
        </label>
        <button className="btn" onClick={downloadPDF}>Download PDF</button>
        <button className="btn" onClick={downloadExcel}>Download Excel</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginBottom: '12px' }}>
        <div style={{ background: 'var(--card-bg)', padding: 12, boxShadow: 'var(--box-shadow)' }}>
          <h4 style={{ marginBottom: 8 }}>Expense by Category</h4>
          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={80}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div style={{ background: 'var(--card-bg)', padding: 12, boxShadow: 'var(--box-shadow)' }}>
          <h4 style={{ marginBottom: 8 }}>Daily Net Total</h4>
          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#74c0fc" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <ul className="list">
        {filtered.map(transaction => (<Transaction key={transaction.id} transaction={transaction} onDelete={handleDelete} />))}
      </ul>
      {toast && (
        <div style={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', background: 'var(--card-bg)', color: 'var(--text)', boxShadow: 'var(--box-shadow)', padding: '10px 12px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span>{toast.message}</span>
          <button className="btn" style={{ width: 'auto', margin: 0, padding: '6px 10px' }} onClick={undoDelete}>Undo</button>
        </div>
      )}
    </>
  )
}
