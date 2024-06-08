import { Form, Select, Button, Input, message, Col } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { request } from '../../utils/request';
import './GetNearestPoints.css'

const { Option } = Select;
const GetNearestPoints = () => {
    const [form] = Form.useForm();
    const [allPoints, setAllPoints] = useState([]);
    const [map, setMap] = useState([]);
    const [newMap, setNewMap] = useState(true);
    const [nearestPoints, setNearestPoints] = useState([]);
    const canvasRef = useRef(null);
    const options = [];
    const showNearestPoints = () => {
        console.log('Nearest Points:', nearestPoints);
        // Render the nearest points on the map
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        nearestPoints.forEach(point => {
            const { x, y, name } = point;
            // Draw a circle at the point's coordinates
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, 2 * Math.PI);
            ctx.fillStyle = 'blue';
            ctx.fill();
            // Draw the point's name next to the circle
            ctx.fillStyle = 'black';
            ctx.font = '12px Arial';
            ctx.fillText(name, x + 10, y);
        });
    };
    const drawZone = (coordinates) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const [x, y] = coordinates;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'green';
        ctx.fill();
    }

    const handleClear = () => {
        setNewMap(!newMap);
        form.resetFields();
    };

    useEffect(() => {
        console.log("我在渲染地图！")
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let points = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //渲染地图
        request.post('/map/get_map', { name: map })
            .then(response => response.data.data)
            .then(data => {
                console.log('Map data:', data);
                points = data.points;
                setAllPoints(points);
                const { picture } = data;
                // Load the map image
                const image = new Image();

                image.onload = () => {
                    console.log('Image has been loaded.');
                    // Draw the map image on the canvas
                    ctx.drawImage(image, 0, 0);
                    // Render the points on the map
                    points.forEach(point => {
                        const { x, y, name } = point;
                        // Draw a circle at the point's coordinates
                        ctx.beginPath();
                        ctx.arc(x, y, 5, 0, 2 * Math.PI);
                        ctx.fillStyle = 'red';
                        ctx.fill();
                        // Draw the point's name next to the circle
                        ctx.fillStyle = 'black';
                        ctx.font = '12px Arial';
                        ctx.fillText(name, x + 10, y);
                    });
                };
                image.onerror = () => {
                    console.error('Error loading image.');
                };
                image.src = `${picture}`;
            })
            .catch(error => {
                console.error('Error fetching map data:', error);
            });

    }, [map, newMap]);

    const handleFinish = (value) => {
        request.post('/map/get_nearest_points', {
            name: map,
            index: value.zone,
            keywords: value.places,
            length: parseInt(value.radius)
        }).then(response => {
            if (response.data.code === 200) {
                message.success('查询成功');
                setNearestPoints(response.data.data);
                showNearestPoints(parseInt(value.radius),);
            }
            else {
                message.error('查询失败');
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <><div className='near_container'>
            <div className='near_search_container'>

                <Form
                    form={form}
                    onFinish={(values) => handleFinish(values)}>
                    <Form.Item>
                        <Select className='select_map_ant'
                            placeholder="请选择地图"
                            onChange={(value) => {
                                setMap(value);
                                console.log(value);
                            }}>
                            <Select.Option value="BNU">北师大</Select.Option>
                            <Select.Option value="scene">颐和园</Select.Option>
                            <Select.Option value="graph">THU</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name='zone'>
                        <Select className='select_zone'
                            onChange={(value) => {
                                const selectedPoint = allPoints.find(p => p.index === value);
                                const { x, y } = selectedPoint;
                                // Store the x and y coordinates in an array
                                const coordinates = [x, y];
                                console.log('Coordinates:', coordinates);
                                drawZone(coordinates);
                            }}
                            placeholder="请选择当前地点">
                            {allPoints.map((p) => (
                                <Option value={p.index}>{p.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name='places'>
                        <Select
                            placeholder="请输入要查询的设施"
                            mode="tags"
                            style={{
                                width: '100%',
                            }}
                            // onChange={handleChange}
                            tokenSeparators={[',']}
                            options={options}
                        />
                    </Form.Item>
                    <Form.Item name='radius'>
                        <Input placeholder="请输入搜索半径" />
                    </Form.Item>
                    <Form.Item name='search'>
                        <Button htmlType="submit" type="primary">
                            查询附近设施
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={() => handleClear()}>
                            清空
                        </Button>
                    </Form.Item>
                </Form>

            </div>
            <div className='near_map_container'>
                <canvas className='map-graph' ref={canvasRef} width={1000} height={800} />
            </div>
        </div></>
    )
};
export default GetNearestPoints;