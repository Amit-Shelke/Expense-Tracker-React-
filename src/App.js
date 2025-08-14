import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';
import { GlobalProvider } from './context/GlobalState';
import License from './components/License';
import Terms from './components/Terms';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={
            <div className="container">
              <Balance />
              <IncomeExpenses />
              <TransactionList />
              <AddTransaction />
            </div>
          } />
          <Route path="/license" element={<License />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        <Footer />
      </Router>
    </GlobalProvider>
  );
}

export default App;
