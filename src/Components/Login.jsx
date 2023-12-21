import React, { useState , useEffect} from 'react';
import { TextField, Button, Typography, Container} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Styles/Login.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    localStorage.setItem('authenticatedUser',JSON.stringify('') );
  },[])

  const handleLogin = () => {
    // Simple validation
    if (username === '' || password === '') {
      setError('Please enter both username and password.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const authenticatedUser = users.find((user) => user.username === username);

    if (authenticatedUser && authenticatedUser.password === password) {
      localStorage.setItem('authenticatedUser',JSON.stringify(username) );
      navigate('/ExpenseTracker');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
  <div id='login-container' style={{height:'729px'}}>
    <div id='login-form'>
      <br /><br /><br /><br /><br />
    <Container  maxWidth="xs">
    <Typography variant="h4" align="center" gutterBottom>
        Expense Tracker
      </Typography> <br /> 
      <Typography variant="h4" align="center" gutterBottom>
        Login
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
      /> <br /> <br />
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
        Login
      </Button>
      <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
        Don't have an account?{' '}
        <Link to="/Register" className='link-custom'>
          Register
        </Link>
      </Typography>
    </Container>
    </div>
    </div>
  );
};

export default Login;
