import React from 'react';
import { FileOutlined, PushpinOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
  {
    key: 'sub1',
    label: '地图导航',
    icon: <PushpinOutlined />,
    children: [
      {
        key: 'getMap',
        label: '多点最短路径导航',
      },
      {
        key: 'g2',
        label: '拥挤度最短路径导航',
      },
    ],
  },
  {
    key: 'sub2',
    label: '游学日记',
    icon: <FileOutlined />,
    children: [
      {
        key: 'getDiary',
        label: '浏览日记',
      },
      {
        key: 'uploadDiary',
        label: '上传日记',
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'sub4',
    label: '旅游景点推荐',
    icon: <AppstoreOutlined />,
    children: [
      {
        key: '9',
        label: 'Option 9',
      },
      {
        key: '10',
        label: 'Option 10',
      },
      {
        key: '11',
        label: 'Option 11',
      },
      {
        key: '12',
        label: 'Option 12',
      },
    ],
  },
];
const Sidebar = ({ onClick }) => {
  const handleClick = ({ key }) => {
    onClick(key);
  };
  return (
    <Menu
      onClick={handleClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};
export default Sidebar;