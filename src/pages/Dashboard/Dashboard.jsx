import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard=()=> {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('username');

    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <button class='upload-button' onClick={()=>{navigate('/uploadDiary')}}>uploaddiary</button>
      <button class='map-button'>map</button>
      <button class='logout-button' onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;