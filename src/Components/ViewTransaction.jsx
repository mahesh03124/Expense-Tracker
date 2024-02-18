import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import AddTransaction from './AddTransaction';
import UpdateRemoveModal from './UpdateRemoveModal';
import Topbar from './Topbar';
import './Styles/ExpenseTracker.css';



const ViewTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [transaction, setTransaction] = useState({
    type: 'expense',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    account: 'cash',
  });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [accountBalances, setAccountBalances] = useState({
    cash: 0,
    bank: 0,
  });
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const key = JSON.parse(localStorage.getItem('authenticatedUser')) || [];
  const transactionsKey = key ? `${key}_transactions` : 'transactions';

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem(transactionsKey)) || [];
    const sortedTransactions = storedTransactions.sort((a, b) => b.id - a.id);
    setTransactions(sortedTransactions);
  }, [transactionsKey, confirmationOpen, open]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditing(false);
    setEditingTransaction(null);
    setTransaction({
      type: 'expense',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      account: 'cash',
    });
  };

  const handleConfirmationOpen = (transaction) => {
    setTransactionToDelete(transaction);
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setTransactionToDelete(null);
    setConfirmationOpen(false);
  };

  const handleChange = (e) => {
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTransaction = () => {
    const updatedTransactions = transactions.map((t) =>
      t.id === editingTransaction.id ? { ...t, ...transaction } : t
    );

    setTransactions(updatedTransactions);
    localStorage.setItem(transactionsKey, JSON.stringify(updatedTransactions));
    setEditingTransaction(null);
    handleClose();
  };

  const handleEditTransaction = (selectedTransaction) => {
    setEditingTransaction(selectedTransaction);
    setTransaction(selectedTransaction);
    setEditing(true);
    handleOpen();
  };


  const handleDeleteTransaction = () => {
    if (transactionToDelete) {
      const deletedTransaction = transactions.find((t) => t.id === transactionToDelete.id);

      const updatedBalances = { ...accountBalances };
      if (deletedTransaction.type === 'income') {
        updatedBalances[deletedTransaction.account] -= parseFloat(deletedTransaction.amount);
      } else {
        updatedBalances[deletedTransaction.account] += parseFloat(deletedTransaction.amount);
      }
      setAccountBalances(updatedBalances);

      const updatedTransactions = transactions.filter((t) => t.id !== transactionToDelete.id);
      setTransactions(updatedTransactions);
      localStorage.setItem(transactionsKey, JSON.stringify(updatedTransactions));

      handleConfirmationClose();
    }
  };

  

  return (
    <div>
      <div className='main-container'>
        <Topbar />
        <div className='table-container1'>
          <TableContainer>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell colSpan={5} style={{ color: 'white' }}>All Transactions</TableCell>
                  <TableCell colSpan={2} align='right'><Link to='/ExpenseTracker' className='custom-link' >Dashboard</Link></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ color: 'white' }} align='center'>Sl No</TableCell>
                  <TableCell style={{ color: 'white' }} align='center'>Description</TableCell>
                  <TableCell style={{ color: 'white' }} align='center'>Amount</TableCell>
                  <TableCell style={{ color: 'white' }} align='center'>Date</TableCell>
                  <TableCell style={{ color: 'white' }} align='center'>Account</TableCell>
                  <TableCell style={{ color: 'white' }} colSpan={2} align='center'>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((t, index) => (
                  <TableRow key={t.id}>
                    <TableCell style={{ color: 'white' }} align='center'>{index + 1}</TableCell>
                    <TableCell style={{ color: 'white' }} align='center'>{t.description}</TableCell>
                    <TableCell style={{ color: 'white' }} align='center' color={t.type === 'income' ? 'success' : 'error'}>
                      {t.type === 'income' ? `+ ₹${t.amount}` : `- ₹${t.amount}`}
                    </TableCell>
                    <TableCell style={{ color: 'white' }} align='center'>{new Date(t.date).toLocaleDateString()}</TableCell>
                    <TableCell style={{ color: 'white' }} align='center'>{t.account}</TableCell>
                    <TableCell align='center'>
                      <Button color="success" onClick={() => handleEditTransaction(t)}>
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell align='center'>
                      <Button color="error" onClick={() => handleConfirmationOpen(t)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <UpdateRemoveModal
          open={confirmationOpen}
          handleClose={handleConfirmationClose}
          handleDeleteTransaction={handleDeleteTransaction}
        />

        <AddTransaction
          open={open}
          handleClose={handleClose}
          handleChange={handleChange}
          handleAddTransaction={handleAddTransaction}
          transaction={transaction}
          editing={editing}
        />

        <Link to='/ExpenseTracker'>
          <Button variant="contained" color="primary" className='b1'>
            BACK
          </Button>
        </Link>
        <Link to='PrintTransaction'>
          <Button variant="contained" color="primary" style={{ marginLeft: '5%' }}>Print</Button>
        </Link>
      </div>
    </div>

  );
};

export default ViewTransaction;
