import React, { useEffect, useState } from 'react';
import { Card, Space } from 'antd';
import { request } from '../../utils/request';


const GetDiary = () => {
    const [diaries, setDiaries] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await request.post('/diary/get_diary', {
                    username: localStorage.getItem('username'),
                    title: ''
                });
                const { data } = response.data;
                setDiaries(data);
            } catch (error) {
                console.error('Error fetching diaries:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Space direction="vertical" size={16}>
            {diaries.map(diary => (
                <Card
                    key={diary.title}
                    title={diary.title}
                    extra={<a href="#">More</a>}
                    style={{
                        width: 300,
                    }}
                >
                    <div dangerouslySetInnerHTML={{ __html: diary.content }}></div>
                    <p>Created by: {diary.username}</p>
                    <p>Created time: {diary.createdTime}</p>
                </Card>
            ))}
        </Space>
    );
}


export default GetDiary;