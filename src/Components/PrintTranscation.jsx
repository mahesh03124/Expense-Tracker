import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Checkbox } from '@mui/material';
import './Styles/ExpenseTracker.css';
import Topbar from './Topbar';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from 'react-router-dom';

const PrintTranscation = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filter, setFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterCash, setFilterCash] = useState(false); // Set both checkboxes to false initially
  const [filterBank, setFilterBank] = useState(false); // Set both checkboxes to false initially

  const key = JSON.parse(localStorage.getItem('authenticatedUser')) || [];
  const transactionsKey = key ? `${key}_transactions` : 'transactions';

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem(transactionsKey)) || [];
    const sortedTransactions = storedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    setTransactions(sortedTransactions);
    applyFilters();
  }, [transactionsKey, startDate, endDate, filterCash, filterBank]);

  const applyFilters = () => {
    let filteredData = [...transactions];
    const currentDate = new Date();
    if (startDate && endDate && new Date(startDate) <= new Date(endDate)) {
      filteredData = filteredData.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate);
      });
    }
    if (filterCash && !filterBank) {
      filteredData = filteredData.filter((transaction) => transaction.account === 'cash');
    } else if (!filterCash && filterBank) {
      filteredData = filteredData.filter((transaction) => transaction.account === 'bank');
    }
    setFilteredTransactions(filteredData);
  };

  const handleFilterLast7Days = () => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    setStartDate(sevenDaysAgo.toISOString().split('T')[0]);
    setEndDate(today.toISOString().split('T')[0]);
    setFilter('last7days');
  };

  const handleFilterLast1Month = () => {
    const today = new Date();
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);
    setStartDate(oneMonthAgo.toISOString().split('T')[0]);
    setEndDate(today.toISOString().split('T')[0]);
    setFilter('1month');
  };

  const handleFilterLast3Months = () => {
    const today = new Date();
    const threeMonthsAgo = new Date(today);
    threeMonthsAgo.setMonth(today.getMonth() - 3);
    setStartDate(threeMonthsAgo.toISOString().split('T')[0]);
    setEndDate(today.toISOString().split('T')[0]);
    setFilter('3months');
  };

  const handlePrintPDF = () => {
    applyFilters();
    const doc = new jsPDF('');
    doc.autoTable({
      html: '#transaction-table',
      startY: 15,
      endY: 15,
      styles: { cellPadding: 3, fontSize: 10, valign: 'middle', halign: 'center' },
      headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0], lineWidth: 0.1, fontStyle: 'bold' },
      theme: 'grid',
    });
    doc.save('transactions.pdf');
  };

  return (
    <div className='main-container'>
      <Topbar />
      <div className='filter-buttons'>
        <Button variant="contained" onClick={handleFilterLast7Days}>Last 7 Days</Button>
        <Button variant="contained" onClick={handleFilterLast1Month}>Last 1 Month</Button>
        <Button variant="contained" onClick={handleFilterLast3Months}>Last 3 Months</Button>
        <TextField
  id="start-date"
  label="From"
  type="date"
  InputLabelProps={{
    shrink: true,
    style: { color: 'white' }
  }}
  InputProps={{
    style: { color: 'white' } 
  }}
  value={startDate}
  onChange={(e) => setStartDate(e.target.value)}
  max={new Date().toISOString().split('T')[0]}
/>

<TextField
  id="end-date"
  label="To"
  type="date"
  InputLabelProps={{
    shrink: true,
    style: { color: 'white' } 
  }}
  InputProps={{
    style: { color: 'white' } 
  }}
  value={endDate}
  onChange={(e) => setEndDate(e.target.value)}
  max={new Date().toISOString().split('T')[0]}
/>

        <div>
        <Checkbox
          checked={filterCash}
          onChange={(e) => setFilterCash(e.target.checked)}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        <label>Cash</label>
        </div>
        <div>
        <Checkbox
          checked={filterBank}
          onChange={(e) => setFilterBank(e.target.checked)}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        <label>Bank</label>
        </div>
        <Button variant="contained" color="success" onClick={handlePrintPDF}>Print</Button>
        <Link to='/ExpenseTracker/ViewTransaction' className='custom-link'><Button variant="contained" color="error">Cancel</Button></Link>
      </div>

      <div className='table-container1'>
        <TableContainer>
          <Table id="transaction-table">
            <TableHead>
              <TableRow><TableCell style={{ color: 'white' }} colSpan={5} align='center'>Expense Tracker Report</TableCell></TableRow>
              <TableRow>
                <TableCell style={{ color: 'white' }} align='center'>Sl No</TableCell>
                <TableCell style={{ color: 'white' }} align='center'>Description</TableCell>
                <TableCell style={{ color: 'white' }} align='center'>Amount</TableCell>
                <TableCell style={{ color: 'white' }} align='center'>Date</TableCell>
                <TableCell style={{ color: 'white' }} align='center'>Account</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.map((t, index) => (
                <TableRow key={t.id}>
                  <TableCell style={{ color: 'white' }} align='center'>{index + 1}</TableCell>
                  <TableCell style={{ color: 'white' }} align='center'>{t.description}</TableCell>
                  <TableCell style={{ color: 'white' }} align='center' color={t.type === 'income' ? 'success' : 'error'}>
                    {t.type === 'income' ? `+ ${t.amount}` : `- ${t.amount}`}
                  </TableCell>
                  <TableCell style={{ color: 'white' }} align='center'>{new Date(t.date).toLocaleDateString()}</TableCell>
                  <TableCell style={{ color: 'white' }} align='center'>{t.account}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default PrintTranscation;
