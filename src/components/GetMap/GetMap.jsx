import React, { useEffect, useRef } from 'react';
import { request } from '../../utils/request';
import './GetMap.css';
import { message } from 'antd';
const GetMap = ({pointArray, setPointArray, map, setAllPoints, path, crowdMode, newMap, adjacencyCrowdedList}) => {
    const canvasRef = useRef(null);
    const crowdedColor = (index, Nindex) => {
        console.log("index"+index+"Nindex"+Nindex)
        let crowdedness = 0;
        // console.log("crowdedness"+ adjacencyCrowdedList)
        adjacencyCrowdedList[index].forEach((item) => {
            if (item.destination === Nindex) {
                crowdedness = item.crowdedness;
            }
        });
        switch (crowdedness) {
            case 0.0:
                return 'green';
            case 0.33:
                return 'yellow';
            case 0.66:
                return 'orange';
            case 1.0:
                return 'red';
            default:
                return 'green';
        }
    }
    
    //点击加入Index提交列表
    const handlePointClick = (point, ctx) => {
        console.log('Point clicked:', point);
        setPointArray(prevArray => [...prevArray, point]);
    };

    useEffect(() => {
        drawPath(path);
        console.log("当前路线"+path);
    },[path,newMap]);


    const drawPath = (data) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.lineWidth = 2;
        let prevPoint = data[0];
        data.forEach((point, index) => {
            const { x, y } = point;
            if (index !== 0) {
                ctx.beginPath();
                ctx.strokeStyle = crowdMode ? crowdedColor(prevPoint.index, point.index) : 'black';
                ctx.moveTo(prevPoint.x, prevPoint.y);
                ctx.lineTo(x, y);
                ctx.stroke();
            }
            prevPoint = point;
        });
        console.log('Path has been drawn.');
    }

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
                        if (pointArray.includes(point)) {
                            ctx.fillStyle = 'blue';
                        } else {
                            ctx.fillStyle = 'red';
                        }
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
                const ctx = canvas.getContext('2d');
                // Get the click position
                const rect = canvas.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                // Check if the click is within the radius of any point
                points.forEach(point => {
                    const distance = Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2));
                    if (distance < 5) {
                        handlePointClick(point, ctx);
                    }
                });
            });
    }, [newMap,map]);

        

    return (
        <div>
            {/* <ul id="pointList"></ul> */}
            <div className='map-container'>
            <canvas className='map-graph' ref={canvasRef} width={1000} height={800}/>
            {/* <button className='search-short-path' onClick={sendRequest}>查询最短路径</button> */}
            </div>
        </div>
    );
};

export default GetMap;