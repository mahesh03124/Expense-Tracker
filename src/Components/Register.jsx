import React, { useState } from 'react';
import { TextField, Button, Typography, Container} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Styles/ExpenseTracker.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    
    if (username === '' || password === '' || confirmPassword === '') {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.some((user) => user.username === username);

    if (userExists) {
      setError('Username already exists. Please choose another.');
      return;
    }

    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    navigate('/');
  };

  return (
    <div id='login-container'>
      <div id='title-form'>
      <div style={{marginLeft:'15px',marginTop:'50px',marginRight:'25px'}}>
    <h1 style={{fontSize:'400px',marginTop:'0.05px'}}>₹</h1>
    </div>
    <div style={{fontSize:'50px',marginTop:'100px'}}>
    <h1>Expense</h1>
    <h1>Tracker</h1>
    </div>
    </div>
    <div id='login-form'>
      <br /><br /><br /><br /><br />
    <Container  maxWidth="xs">
    <Typography variant="h4" align="center" gutterBottom>
        User
      </Typography> <br /> 
      <Typography variant="h4" align="center" gutterBottom>
        Sign-Up
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="custom-textfield"
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="custom-textfield"
      />
      <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="custom-textfield"
      /> <br /> <br />
      <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
        Register
      </Button>
      <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
        Already have an account?{' '}
        <Link to='/' className='link-custom'>
          Login
        </Link>
      </Typography>
    </Container>
    </div>
    </div>
  );
};

export default Register;
