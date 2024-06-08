import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import UploadDiary from '../../components/UploadDiary/UploadDiary';
// import GetDiary from '../../components/GetDiary/GetDiary';
import GetShortPath from '../../components/GetShortPath/GetShortPath';
import GetMap from '../../components/GetMap/GetMap';
import Diary from '../../components/GetDiary/Diary';
import Tourism from '../../components/Tourism/Tourism';
import GetCrowdedSortedPath from '../../components/GetCrowdedSortedPath/GetCrowdedSortedPath';
import GetNearestPoints from '../../components/GetNearestPoint/GetNearestPoints';
import Slides from '../../components/Slides/Slides';

// 假设你有两个组件
const applyUploadDiary = () => <UploadDiary />
const applyGetDiary = () => <Diary />
const applyMap = () => <GetShortPath />;
const applyTourism = () => <Tourism />
const applyGetCrowdedSortedPath = () => <GetCrowdedSortedPath />
const applyGetNearestPoints = () => <GetNearestPoints />
const applySlides = () => <Slides />


const Dashboard = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('getMap');
  const [generateIMG, setGenerateIMG] = useState(false);

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
    case 'getTourism':
      ActiveComponent = applyTourism;
      break;
    case 'getCrowdedSortedPath':
      ActiveComponent = applyGetCrowdedSortedPath;
      break;
    case 'getNearestPoints':
      ActiveComponent = applyGetNearestPoints;
      break;
    case 'slides':
      ActiveComponent = applySlides;
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
      <div className='active-component'>
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
}

export default Dashboard;