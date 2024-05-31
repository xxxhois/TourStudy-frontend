import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import UploadDiary from '../../components/UploadDiary/UploadDiary';
import GetDiary from '../../components/GetDiary/GetDiary';
import GetShortPath from '../../components/GetShortPath/GetShortPath';
import GetMap from '../../components/GetMap/GetMap';
import GetSortedDiary from '../../components/GetDiary/GetSortedDiary';

// 假设你有两个组件
const applyUploadDiary = () => <UploadDiary />
const applyGetDiary = () => <GetSortedDiary />
const applyMap = () => <GetMap />;

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('uploadDiary');

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSidebarClick = (key) => {
    console.log(key);
    setActiveComponent(key);
  };

  let ActiveComponent;
  switch (activeComponent) {
    case 'uploadDiary':
      ActiveComponent = applyUploadDiary;
      break;
    case 'getDiary':
      ActiveComponent = applyGetDiary;
      break;
    case 'getMap':
      ActiveComponent = applyMap;
      break;
    default:
      ActiveComponent = null;
  }

  return (
    <div className='dash-container'>
      <div className='sidebar-container'>
        <Sidebar onClick={handleSidebarClick} />
      </div>
      {/* <button className='upload-button' onClick={()=>{navigate('/uploadDiary')}}>uploaddiary</button>
      <button className='map-button'>map</button>
      <button className='logout-button' onClick={logout}>Logout</button> */}
      <div className='active-component'>{ActiveComponent && <ActiveComponent />}</div>
    </div>
  );
}

export default Dashboard;