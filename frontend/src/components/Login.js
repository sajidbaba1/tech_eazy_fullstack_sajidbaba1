import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username,
                password
            });
            const { token, role } = response.data;
            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);
                console.log('JWT stored:', token, 'Role:', role);
                navigate(role === 'SUPERVISOR' || role === 'ADMIN' ? '/supervisor-dashboard' : '/parcels');
            } else {
                console.error('No token received from server');
                setError('No token received from server');
            }
        } catch (err) {
            console.error('Login error:', err.response?.data || err.message);
            setError(err.response?.data || 'Login failed: Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading && <p>Loading...</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>Login</button>
            </form>
        </div>
    );
};

export default Login;