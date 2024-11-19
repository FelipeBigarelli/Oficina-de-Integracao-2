import React from 'react';
import { useLocation } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userType = params.get('type');

    return (
        <div>
            <h1>Login</h1>
            <p>Voce esta tentando logar como: {userType === 'volunteer' ? 'Voluntario' : 'Professor'}</p>
        </div>
    );
};

export default LoginPage;