import { Form, Checkbox, Button, Select, message, Row, Col } from 'antd';
import { request } from '../../utils/request';
import { useEffect, useState } from 'react';
const Search = ({ setPosts,api }) => {
    const [form] = Form.useForm();
    const options = [];
    const { Option } = Select;
    const [tags, setTags] = useState([]);
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    useEffect(() => {
        request.post('/tag/get_all_tags', {})
            .then(response => {
                if (response.data.code === 200) {
                    const tagNames = response.data.data.map(tag => tag.name);
                    setTags(tagNames);
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);
    return (
        <Form
            form={form}
            name="sort_post"
            initialValues={{ remember: true }}
            onFinish={(values) => {
                request.post(api, {
                    views: form.getFieldValue('views') ? true : false,
                    score: form.getFieldValue('score') ? true : false,
                    length: 10,
                    keywords: values.keywords,
                    tags: values.tags
                })
                    .then(function (response) {
                        if (response.data.code === 200) {
                            message.success('Search successful!');
                            const { data } = response.data;
                            setPosts(data);
                        } else {
                            message.error(response.data.msg);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }}
        >
            <Row gutter={16}>
                <Col span={6}>
                    <Form.Item name='views'>
                        <Checkbox>根据浏览量排序</Checkbox>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name='score'>
                        <Checkbox>根据分数排序</Checkbox>
                    </Form.Item>
                </Col>
            </Row>
            <Col span={20}>
                <Col>
                    <Form.Item name='keywords' label="输入关键词">
                        <Select
                            mode="tags"
                            style={{
                                width: '100%',
                            }}
                            onChange={handleChange}
                            tokenSeparators={[',']}
                            options={options}
                        />
                    </Form.Item>
                </Col>
                <Form.Item name='tags' label="选择标签">
                    <Select mode='tags'>
                        {tags.map(tag => (
                            <Option key={tag}>{tag}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </Col>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    搜索
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Search;