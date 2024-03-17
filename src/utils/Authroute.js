import { Navigate } from 'react-router-dom';
import { message } from "antd";

export function Authroute({children}){
    const token = localStorage.getItem('token');

    if (!token) {
        message.error('Please login first!');
        return <Navigate to="/login" replace/>;
    }

    return <>{children}</>;
}