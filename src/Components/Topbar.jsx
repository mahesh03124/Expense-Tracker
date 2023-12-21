import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import './Styles/ExpenseTracker.css'

export default function Topbar() {
  return (
    <div className='top-bar' style={{width:'fullwidth',height:'75px',display:'flex'}}>
        <div style={{marginLeft:'1%',marginTop:'25px'}}><Link to='/ExpenseTracker'><CurrencyRupeeIcon style={{color:'white'}}/></Link></div>
        <div style={{marginLeft:'1%',marginTop:'0.1px'}}><h2 style={{marginLeft:'5px'}}>Expense Tracker</h2></div>
        <div style={{marginLeft:'80%',marginTop:'25px'}}><Link to='/'><LogoutIcon style={{color:'white'}}/></Link></div>
    </div>
  )
}
