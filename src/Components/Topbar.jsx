import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import './Styles/ExpenseTracker.css';

export default function Topbar() {
  return (
    <div className='top-bar' >
        <div ><Link to='/ExpenseTracker'><CurrencyRupeeIcon style={{color:'white'}}/></Link><h2 >Expense Tracker</h2></div>
        <div ><Link to='/'><LogoutIcon style={{color:'white'}}/></Link></div>
    </div>
  )
}
