import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    backgournd-color: #f0f0f0;
`;

const Button = styled.button`
    width: 200px;
    padding: 10px 20px;
    margin: 10px 0;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background-color: #007BFF;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

const LandingPage : React.FC = () => {
    const navigate = useNavigate();

    const handleNavigate = (userType: 'volunteer' | 'teacher') => {
        navigate(`/login?type=${userType}`);
    };

    return (
        <Container>
            <Button onClick={() => handleNavigate('volunteer')}>Sou voluntario</Button>
            <Button onClick={() => handleNavigate('teacher')}>Sou professor</Button>
        </Container>
    );
};

export default LandingPage;