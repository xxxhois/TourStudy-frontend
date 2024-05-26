import GetMap from '../GetMap/GetMap';
import MySelect from '../Select';

import GetMap from '../GetMap/GetMap';
import MySelect from '../Select';

const GetShortPath = () => {
    //点击加入Index提交列表
    const handlePointClick = (point) => {
        // Add the point's name to the list
        const list = document.getElementById('pointList');
        const listItem = document.createElement('li');
        listItem.textContent = point.name;
        list.appendChild(listItem);
    };

    const handleCanvas = (canvas, points) => {
        canvas.addEventListener('click', function(event) {
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
    };

    return(
        <div>
            <MySelect />
            <GetMap onReady={handleCanvas} />
        </div>
    );
};
export default GetShortPath;