import GetMap from '../GetMap/GetMap';
import SelectPoint from '../GetMap/SelectPoint';
import { useState, useRef } from 'react';
import './GetShortPath.css'
import { Select } from 'antd';
const GetShortPath = () => {
    const [pointArray, setPointArray] = useState([]);
    const [path, setPath] = useState([]); // 后端返回的路径点
    const [map, setMap] = useState([]); // 当前地图
    const [allPoints, setAllPoints] = useState([]); //维护所有点的状态
    const [newMap, setNewMap] = useState(true);
    const crowdMode = false;
    const crowdedColor = null;
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
                <Select.Option value="inside">室内自定义地图</Select.Option>
            </Select>
        </div>
            <div className='get_short_path'>

                <div className='select_point'>
                    <SelectPoint pointArray={pointArray}
                        setPointArray={setPointArray}
                        allPoints={allPoints}
                        setPath={setPath}
                        path={path}
                        map={map}
                        setMap={setMap}
                        newMap={newMap}
                        setNewMap={setNewMap} />
                </div>
                <div className='get_map'>
                    <GetMap pointArray={pointArray}
                        setPointArray={setPointArray}
                        map={map}
                        setPath={setPath}
                        path={path}
                        setAllPoints={setAllPoints}
                        crowdMode={crowdMode} 
                        crowdedColor={crowdedColor}
                        setMap={setMap}
                        newMap={newMap}
                        setNewMap={setNewMap}/>
                </div>
            </div>
        </>
    );
};
export default GetShortPath;