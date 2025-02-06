import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function Signout(): JSX.Element {
    const navigate = useNavigate();
    useEffect(() => {
        const token = Cookies.get('authToken');
        console.log(token);
        if (token) {
            Cookies.remove('authToken');
        }
        navigate('/login');
    });
    return <></>;
};
