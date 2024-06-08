import React, { useEffect, useState } from 'react';
import { Card, Space, Modal, message, Col, Form, Button, Input } from 'antd';
import { request } from '../../utils/request';
import PostDetail from '../PostDetail/PostDetail';
import './GetDiary.css';


const GetDiary = () => {
    const [diaries, setDiaries] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [activeDiary, setActiveDiary] = useState(null);
    const [form] = Form.useForm();

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
        <div className='getdiary-container'>
            <div className='search'>
                <Form
                    form={form}
                    className='search-form'
                    name="sort_diary"
                    initialValues={{ remember: true }}
                    onFinish={(values) => {
                        request.post('/diary/get_diary', {
                            username: localStorage.getItem('username'),
                            title: values.title
                        })
                            .then(function (response) {
                                if (response.data.code === 200) {
                                    message.success('Search successful!');
                                    const { data } = response.data;
                                    setDiaries(data);
                                } else {
                                    message.error(response.data.msg);
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }}
                >
                    <Col span={20}>
                        <Form.Item name='title' label="输入标题（前缀）">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            搜索
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className='diary-container'>
                <Space className='card-container' direction="vertical" size={16}>
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
                    open={showDetail}
                    onCancel={handleModalClose}
                    footer={null}
                    className='modal'
                >
                    {activeDiary && <PostDetail diary={activeDiary} />}
                </Modal>
            </div>
        </div>
    );
};


export default GetDiary;