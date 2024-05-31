import React, { useEffect, useRef } from 'react';
import { request } from '../../utils/request';
import { useState } from 'react';
import './GetMap.css';
const GetMap = () => {
    const canvasRef = useRef(null);

    const [indexArray, setIndexArray] = useState([]);
    //点击加入Index提交列表
    const handlePointClick = (point) => {
        // Add the point's name to the list
        const list = document.getElementById('pointList');
        const listItem = document.createElement('li');
        listItem.textContent = point.name;
        list.appendChild(listItem);
        // Add the point's index to the array
        indexArray.push(point.index);
        console.log(indexArray);
    };

    const sendRequest = async () => {
        const requestBody = {
            name: "scene",
            indexes: indexArray
        };
        try {
            const response = await request.post('map/get_shortest_path', requestBody);
            console.log('Response:', response);
            drawPath(response.data.data);
            if (response.status !== 200) {
                throw new Error('Request failed!');
            }
            setIndexArray([]); // 清空数组
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const drawPath = (data) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.beginPath();
        data.forEach((point, index) => {
            const { x, y } = point;
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
        console.log('Path has been drawn.');
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let points = [];
        //渲染地图
        request.post('/map/get_map', { name: 'scene' })
            .then(response => response.data.data)
            .then(data => {
                console.log('Map data:', data);
                points = data.points;
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

        canvas.addEventListener('click', function (event) {
            // Get the click position
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            // Check if the click is within the radius of any point
            points.forEach(point => {
                const distance = Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2));
                if (distance < 5) {
                    handlePointClick(point);
                }
            });
        });
        console.log(canvas);
    }, []);
    return (
        <div>
            <ul id="pointList"></ul>
            <div className='map-container'>         
            <canvas className='map-graph' ref={canvasRef} width={800} height={600} />
            <button className='search-short-path' onClick={sendRequest}>查询最短路径</button>
            </div>
        </div>
    );
};

export default GetMap;