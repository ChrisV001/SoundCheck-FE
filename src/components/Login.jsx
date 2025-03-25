import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:8080/user/login', {email , password});

            if (response.data.statusCode === 200) {
                onLoginSuccess(response.data);
            } else {
                setError(response.data.message || 'Login failed');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error logging in');
        }
    };

    return (
        <div class='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
            <div class='sm:mx-auto sm:w-full sm:max-w-sm'>
                <h2 class='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>Sign in to your account</h2>
                {error && <div className="mb-4 text-red-500">{error}</div>}
            </div>

            <div class='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label for='email' class="block text-sm/6 font-medium text-gray-900">Email address</label>
                        <div class='mt-2'>
                            <input type='email' />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}