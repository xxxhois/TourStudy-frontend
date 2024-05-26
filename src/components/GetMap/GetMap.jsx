import React, { useEffect, useRef } from 'react';
import { request } from '../../utils/request';
const GetMap = () => {
    const canvasRef = useRef(null);

    const onChange = (value) => {
        console.log(`selected ${value}`);
      };
      const onSearch = (value) => {
        console.log('search:', value);
      };
    
    const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let points = [];

        // Fetch the map data from the backend
        request.post('/map/get_map', { name: 'graph' })
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
                    onReady(canvas, points);
                };
                image.onerror = () => {
                    console.error('Error loading image.');
                };
                image.src = `data:image/jpeg;base64,${picture}`;
            })
            .catch(error => {
                console.error('Error fetching map data:', error);
            });
    }, []);
    return (
        <div>
            <ul id="pointList"></ul>
            <canvas className='map-graph' ref={canvasRef} width={800} height={600} />
        </div>
    );
};

export default GetMap;