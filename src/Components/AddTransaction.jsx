import React from 'react';
import { MenuItem, Select, Button} from '@mui/material';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';


const AddTransaction = ({ open, handleClose, handleChange, handleAddTransaction, transaction, editing }) => {
    
  return (

<Modal open={open} onClose={handleClose}>
<ModalDialog sx={{backgroundColor:'#2c3e50',color:'white'}}>
  <DialogTitle sx={{justifyContent:'center'}}>{editing ? 'Edit Transaction' : 'Add Transaction'}</DialogTitle>
  <form >
    <Stack spacing={2}>
      <FormControl>
        <FormLabel sx={{color:'white'}}>Type</FormLabel>
        <Select name="type" sx={{color:'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }} value={transaction.type} onChange={handleChange}>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel sx={{color:'white'}}>ACCOUNT</FormLabel>
        <Select name="account" sx={{color:'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' } }} value={transaction.account} onChange={handleChange}>
            <MenuItem value="cash">Cash</MenuItem>
            <MenuItem value="bank">Bank</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel sx={{color:'white'}}>Amount</FormLabel>
        <Input
            color="primary"
            placeholder="Amount Rs"
            size="lg"
            type="number"
            name="amount"
            value={transaction.amount}
            onChange={handleChange}
            sx={{color:'white',backgroundColor:'rgba(0,0,0,0)'}}
        />
      </FormControl>

      <FormControl>
        <FormLabel sx={{color:'white'}}>Description</FormLabel>
        <Input
            color="primary"
            placeholder="Details"
            size="lg"
            onChange={handleChange}
            name="description"
            value={transaction.description}
            sx={{color:'white',backgroundColor:'rgba(0,0,0,0)'}}
        />
      </FormControl>

      <FormControl>
        <FormLabel sx={{color:'white'}}>Date</FormLabel>
        <Input 
           type="date"
           name="date"
           size="lg"
           value={transaction.date}
           sx={{color:'white',backgroundColor:'rgba(0,0,0,0)'}}
           onChange={handleChange} />
      </FormControl>

      <Button variant="outlined" sx={{color:'white',backgroundColor:'green'}} fullWidth onClick={handleAddTransaction}>
          {editing ? 'Save' : 'Add'}
        </Button>
    </Stack>
  </form>
</ModalDialog>
</Modal>
  );
};

export default AddTransaction;
