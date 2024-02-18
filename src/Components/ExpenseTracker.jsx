import React, { useState, useEffect } from 'react';
import { CssBaseline, Typography } from '@mui/material';
import AddTransaction from './AddTransaction';
import { Link } from 'react-router-dom';
import Topbar from './Topbar';
import './Styles/ExpenseTracker.css';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';



const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [rtransactions, setRtransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [transaction, setTransaction] = useState({
    type: 'expense',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    account: 'cash',
  });
  const [open, setOpen] = useState(false);
  const [accountBalances, setAccountBalances] = useState({
    cash: 0,
    bank: 0,
  });

  const key = JSON.parse(localStorage.getItem('authenticatedUser')) || [];
  const transactionsKey = key ? `${key}_transactions` : 'transactions';

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem(transactionsKey)) || [];
    const sortedTransactions = storedTransactions.sort((a, b) => b.id - a.id);
    setTransactions(sortedTransactions);
    setRtransactions(sortedTransactions);

    const initialBalances = storedTransactions.reduce(
      (balances, t) => {
        if (t.type === 'income') {
          balances[t.account] += parseFloat(t.amount);
        } else {
          balances[t.account] -= parseFloat(t.amount);
        }
        return balances;
      },
      { cash: 0, bank: 0 }
    );

    setAccountBalances(initialBalances);
  }, [open, transactionsKey]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setTransaction({
      type: 'expense',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      account: 'cash',
    });
  };

  const handleChange = (e) => {
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value,
    });
  };

  const getMaxId = () => {
    if (transactions.length === 0) {
      return 0;
    } else {
      return Math.max(...transactions.map((item) => item.id));
    }
  };

  const handleAddTransaction = () => {
    const newId = getMaxId() + 1;

    const newTransaction = {
      id: newId,
      ...transaction,
    };

    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
    localStorage.setItem(transactionsKey, JSON.stringify([...transactions, newTransaction]));

    const updatedBalances = { ...accountBalances };
    if (newTransaction.type === 'income') {
      updatedBalances[newTransaction.account] += parseFloat(newTransaction.amount);
    } else {
      updatedBalances[newTransaction.account] -= parseFloat(newTransaction.amount);
    }
    setAccountBalances(updatedBalances);

    handleClose();
  };

  const calculateBalance = () => {
    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const totalExpense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    return totalIncome - totalExpense;
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);
  };

  const filteredTransactions = rtransactions.filter((t) => {
    const descriptionMatch = t.description.toLowerCase().includes(search.toLowerCase());
    const typeMatch = t.type.toLowerCase() === search.toLowerCase();
    const amountMatch = !isNaN(search) && t.amount.includes(search.trim());
    const accountMatch = t.account.toLowerCase() === search.toLowerCase();

    return descriptionMatch || typeMatch || amountMatch || accountMatch;
  });


  return (
    <div className="expense-container" style={{ marginTop: '0px', width: 'fullwidth', height: '729px' }}>
      <Topbar />
      <div className='sub-container' component="main" style={{maxWidth:'100%'}}>
        <CssBaseline />
        <div className='sub-expense'> <br />
          <Typography variant="h5" align="center">
            <br /> BALANCE <br /> ₹ {calculateBalance().toFixed(2)}
          </Typography>
        </div>
        <div className='sub-expense'>
          <Typography variant="h5" align="center" >
            <br /><br /> CASH  <br /> ₹ {accountBalances.cash.toFixed(2)}</Typography>
        </div>
        <div className='sub-expense'>
          <Typography variant="h5" align="center"><br /><br /> BANK <br /> ₹ {accountBalances.bank.toFixed(2)}
          </Typography>
        </div>
  
        <div className='sub-expense' style={{cursor:'pointer'}} onClick={handleOpen}>
          <Typography variant="h5" align="center"> <br /><br /> ADD NEW <br /> TRANSACTION
          </Typography>
        </div>
  
        
        <div className='sub-expense'>
          <Link to='ViewTransaction' className='custom-link'>
            <Typography variant="h5" align="center"> <br /> <br /> VIEW  ALL <br /> TRANSACTION
            </Typography>
        </Link>
        </div>
      </div>
  
      <div className='table-container'>
<Table>
  <TableHead>
    {rtransactions.length > 0 && (
      <TableRow style={{ height: '50px' }}>
        <TableCell style={{ color: 'white' }}>Recent Transactions</TableCell>
        <TableCell colSpan={3} align='left'>
          <Paper
            style={{ backgroundColor: '#2c3e50', border: '2px solid white', borderRadius: '15px', height: '35px' }}
            component="form"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              style={{ color: 'white' }}
              placeholder="Search"
              value={search}
              onChange={handleSearch}
            />
            <IconButton type="button" style={{ color: 'white' }} sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </TableCell>
        <TableCell align='right'><Link to='ViewTransaction' className='custom-link' >View All</Link></TableCell>
      </TableRow>
    )}
    {filteredTransactions.length > 0 && (
      <TableRow>
        <TableCell style={{ color: 'white', width: '200px' }} align='center'>Sl No</TableCell>
        <TableCell style={{ color: 'white' }} align='center'>Description</TableCell>
        <TableCell style={{ color: 'white' }} align='center'>Amount</TableCell>
        <TableCell style={{ color: 'white' }} align='center'>Date</TableCell>
        <TableCell style={{ color: 'white' }} align='center'>Account</TableCell>
      </TableRow>
    )}
  </TableHead>
  <TableBody>
    {filteredTransactions.length === 0 ? (
      <TableRow>
        <TableCell colSpan={5} style={{ textAlign: 'center', color: 'white' }}>
          No transactions found
        </TableCell>
      </TableRow>
    ) : (
      filteredTransactions.slice(0, 5).map((ft, index) => (
        <TableRow key={ft.id} style={{ borderBottom: 'none' }}>
          <TableCell style={{ color: 'white', width: '200px' }} align='center'>{index + 1}</TableCell>
          <TableCell style={{ color: 'white' }} align='center'>{ft.description}</TableCell>
          <TableCell style={{ color: 'white' }} align='center'>
            {ft.type === 'income' ? `+ ₹${ft.amount}` : `- ₹${ft.amount}`}
          </TableCell>
          <TableCell style={{ color: 'white' }} align='center'>{new Date(ft.date).toLocaleDateString()}</TableCell>
          <TableCell style={{ color: 'white', width: '200px' }} align='center'>{ft.account}</TableCell>
        </TableRow>
      ))
    )}
  </TableBody>
</Table>
      </div>
  
      <AddTransaction
        open={open}
        handleClose={handleClose}
        handleChange={handleChange}
        handleAddTransaction={handleAddTransaction}
        transaction={transaction}
      />
    </div>
  );  
};

export default ExpenseTracker;
