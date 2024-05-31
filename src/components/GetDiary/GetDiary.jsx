import React, { useEffect, useState } from 'react';
import { Card, Space, Modal, message, Select, Form, Button, Checkbox } from 'antd';
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
                    title: 't'
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
                        request.post('/map/get_sorted_diary', {
                            views: true,
                            score: true,
                            length: 10,
                            keywords: values.keywords,
                            tags: values.tags
                        })
                            .then(function (response) {
                                if (response.data.msg === 'success') {
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
                    <Form.Item name='views' label="Views">
                        <Checkbox>根据浏览量排序</Checkbox>
                    </Form.Item>
                    <Form.Item name='score' label="Views">
                        <Checkbox>根据分数排序</Checkbox>
                    </Form.Item>
                    <Form.Item name='keywords' label="Select">
                        <Select mode='tags'>
                            <Select.Option value="demo1">Demo1</Select.Option>
                            <Select.Option value="demo2">Demo2</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name='tags' label="Select">
                        <Select mode='tags'>
                            <Select.Option value="demo1">Demo1</Select.Option>
                            <Select.Option value="demo2">Demo2</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            搜索
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className='diary-container'>
                <Space className='card-container' direction="horizontal" size={16}>
                    {diaries.map(diary => (
                        <Card
                            key={diary.title}
                            title={diary.title}
                            style={{
                                width: 300,
                            }}
                            onClick={handleDetailClick}>
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
                    {activeDiary && <PostDetail diary={activeDiary} />}
                </Modal>
            </div>
        </div>
    );
};


export default GetDiary;