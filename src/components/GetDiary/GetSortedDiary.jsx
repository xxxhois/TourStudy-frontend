import { Button, Card, Checkbox, Form, Modal, Space, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { request } from '../../utils/request';
import PostDetail from '../PostDetail/PostDetail';
import Search from './Search';
import './GetSortedDiary.css';


const GetSortedDiary = () => {
    const [diaries, setDiaries] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [activeDiary, setActiveDiary] = useState(null);
    // const [form] = Form.useForm();
    const add_page_views = async (diary) => {
        try {
            await request.post('/diary/add_page_views', {
                username: diary.username,
                title: diary.title
            });
            message.info('Page views added successfully');
            const updatedDiaries = diaries.map(d =>
                d.title === diary.title ? { ...d, pageViews: d.pageViews + 1 } : d
            );
            setDiaries(updatedDiaries);
        } catch (error) {
            console.error('Error adding page views:', error);
        }
    };
    const handleDetailClick = (diary) => {
        add_page_views(diary);
        setActiveDiary(diary);
        setShowDetail(true);
    };

    const handleModalClose = () => {
        setShowDetail(false);
    };


    return (
        <div className='sorteddiary-container'>
            <div className='search'>
                <Search setPosts = {setDiaries}
                        api = '/diary/get_sorted_diary' />
            </div>
            <div className='short-container'>
                <Space className='card-container' direction="vertical" size={20}>
                    {diaries.map(diary => (
                        <Card
                            key={diary.title}
                            title={diary.title}
                            style={{
                                width: 300,
                            }}
                            onClick={() => handleDetailClick(diary)}>
                            <label>总浏览量：{diary.pageViews}</label>
                            <label>rating:{diary.ratings}</label>

                            <div dangerouslySetInnerHTML={{ __html: diary.content }}></div>
                            <p>Created by: {diary.username}</p>
                            <p>Created time: {diary.createdTime}</p>
                        </Card>
                    ))}
                </Space>
                <Modal
                    // title=""
                    open={showDetail}
                    onCancel={handleModalClose}
                    footer={null}
                >
                    {activeDiary && <PostDetail diary={activeDiary}
                                                diaries={diaries}
                                                setDiaries={setDiaries} />}
                </Modal>
            </div>
        </div>
    );
};


export default GetSortedDiary;