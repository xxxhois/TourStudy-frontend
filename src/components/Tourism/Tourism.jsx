import { Button, Card, Checkbox, Form, Modal, Space, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { request } from '../../utils/request';
import TourismDetail from '../PostDetail/TourismDetail';
import Search from '../GetDiary/Search';
import './Tourism.css';


const Tourism = () => {
    const [tourisms, setTourisms] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [activetourism, setActivetourism] = useState(null);
    // const [form] = Form.useForm();
    const add_page_views = async (tourism) => {
        try {
            await request.post('/map/add_page_views', {
                name: tourism.name
            });
            message.info('Page views added successfully');
            const updatedTourisms = tourisms.map(t =>
                t.name === tourism.name ? { ...t, pageViews: t.pageViews + 1 } : t
            );
            setTourisms(updatedTourisms);
        } catch (error) {
            console.error('Error adding page views:', error);
        }
    };
    const handleDetailClick = (tourism) => {
        add_page_views(tourism);
        setActivetourism(tourism);
        setShowDetail(true);
    };

    const handleModalClose = () => {
        setShowDetail(false);
    };


    return (
        <div className='sortedtourism-container'>
            <div className='search'>
                <Search setPosts = {setTourisms}
                        api = '/map/get_sorted_tourism' />
            </div>
            <div className='short-container'>
                <Space className='card-container' direction="vertical" size={20}>
                    {tourisms.map(tourism => (
                        <Card
                            key={tourism.name}
                            name={tourism.name}
                            style={{
                                width: 300,
                            }}
                            onClick={() => handleDetailClick(tourism)}>
                            <label>总浏览量：{tourism.views}</label>
                            <div dangerouslySetInnerHTML={{ __html: tourism.description }}></div>
                            <label>rating:{tourism.ratings}</label>
                        </Card>
                    ))}
                </Space>
                <Modal
                    open={showDetail}
                    onCancel={handleModalClose}
                    footer={null}
                >
                    {activetourism && <TourismDetail tourism={activetourism} />}
                </Modal>
            </div>
        </div>
    );
};


export default Tourism;