import React, { useEffect, useState } from 'react';
import { Card, Space, Modal, message, Select, Form } from 'antd';
import { request } from '../../utils/request';
import PostDetail from '../PostDetail/PostDetail';
import GetDiary from './GetDiary';

const GetSortedDiary = () => {
    return (
        <>
            <GetDiary />
            <GetDiary />
        </>
    );
};

export default GetSortedDiary;