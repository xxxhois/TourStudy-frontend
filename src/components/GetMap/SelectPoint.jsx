import { Button, Col, Form, Select, message } from 'antd';
import { useEffect, useState } from 'react';
import { request } from '../../utils/request';
const { Option } = Select;
const SelectPoint = ({ pointArray, setPointArray, setPath, map, setMap, allPoints,setNewMap, newMap }) => {
    const [selectedValues, setSelectedValues] = useState(
        pointArray.map(point => point.index) // 初始化为每个点的索引
    );

    const handleNew = () => {
        setPath([]);
        setPointArray([]);
        setNewMap(!newMap);
        console.log('New:', newMap);
    };

    useEffect(() => {
        setSelectedValues(pointArray.map(point => point.index));
    }, [pointArray]);

    const handleSelectChange = (value, pointIndex) => {
        console.log('PreValues:', selectedValues);
        console.log('SelectChange:', value, pointIndex);
        setSelectedValues(prevValues => {
            const newValues = [...prevValues];
            newValues[pointIndex] = value;
            return newValues;
        });
        console.log('SelectedValues:', selectedValues);
    };

    const sendRequest = async (selectedValues) => {
        console.log('SendRequest:', selectedValues);
        const requestBody = {
            name: map,
            indexes: selectedValues
        };
        try {
            const response = await request.post('map/get_shortest_path', requestBody);
            console.log('Response:', response.data.data);
            //console.log("返回的路径" + path[0]["index"]);
            if (response.data.code === 200) {
                message.success('查询成功');
                setPath(response.data.data);
            }
            else {
                message.error('查询失败');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='select_point'>
            <Form onFinish={() => sendRequest(selectedValues)}>
                <Col span={30}>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">
                            提交查询最短路径
                        </Button>
                    </Form.Item>
                    
                    {pointArray.map((point, index) => (
                        <Form.Item key={point.index}>
                            <Select defaultValue={point.index}
                                onChange={(value) => handleSelectChange(value, index)}>
                                {point.name}
                                {allPoints.map((p) => (
                                    <Option value={p.index}>{p.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    ))}
                    <Form.Item>
                        <Button onClick={() => handleNew()}>清空</Button>
                    </Form.Item>
                </Col>
            </Form>
        </div>
    );
};
export default SelectPoint;
