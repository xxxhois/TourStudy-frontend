import { useEffect, useRef,useState } from "react";
import { Select, message } from 'antd';
import { request } from "../../utils/request";
import GetMap from "../GetMap/GetMap";
import SelectPoint from "../GetMap/SelectPoint";
const GetCrowdedSortedPath = () => {
    const [pointArray, setPointArray] = useState([]);
    const [path, setPath] = useState([]); // 后端返回的路径点
    const [map, setMap] = useState([]); // 当前地图
    const [allPoints, setAllPoints] = useState([]); //维护所有点的状态
    const [newMap, setNewMap] = useState(true);
    const [adjacencyCrowdedList, setadjacencyCrowdedList] = useState(null);
    const crowdMode = true;

    useEffect(() => {
        request.post('/map/get_crowded_edges', {
            name: map
        }).then(response => {
            if (response.data.code === 200) {
                setadjacencyCrowdedList(response.data.data);
                console.log("邻接表拥挤度"+adjacencyCrowdedList);
            }
        }).catch(error => {
            console.error('Error occurs in requesting crowded edge', error);
        });
    }, [map]);

    

    
    return (
        <><div className='select_map'>
            <Select className='select_map_ant'
                onChange={(value) => {
                    setMap(value);
                    console.log(value);
                }}>
                <Select.Option value="BNU">北师大</Select.Option>
                <Select.Option value="scene">颐和园</Select.Option>
                <Select.Option value="graph">THU</Select.Option>
            </Select>
        </div>
            <div className='get_short_path'>

                <div className='select_point'>
                    <SelectPoint pointArray={pointArray}
                        setPointArray={setPointArray}
                        allPoints={allPoints}
                        setPath={setPath}
                        setNewMap={setNewMap}
                        newMap={newMap}
                        path={path}
                        map={map} />
                </div>
                <div className='get_map'>
                    <GetMap pointArray={pointArray}
                        setPointArray={setPointArray}
                        map={map}
                        setPath={setPath}
                        path={path}
                        setAllPoints={setAllPoints}
                        crowdMode={true}
                        setMap={setMap}
                        newMap={newMap}
                        setNewMap={setNewMap}
                        adjacencyCrowdedList={adjacencyCrowdedList}/>
                </div>
            </div>
        </>
    );
}

export default GetCrowdedSortedPath;