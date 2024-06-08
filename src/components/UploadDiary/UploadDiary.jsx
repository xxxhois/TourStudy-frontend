import 'braft-editor/dist/index.css';
import "./UploadDiary.css";
import React, { useEffect, useState } from 'react';
import BraftEditor from 'braft-editor';
import { Form, Input, Button, Select, message, Modal } from 'antd';
import { request } from '../../utils/request';
import { generateDiary } from '../../utils/chatgpt';
import Slides from '../Slides/Slides';
const { useForm, Item: FormItem } = Form;
const { Option } = Select;

const options = [];
const FormDemo = () => {
    const [form] = useForm();
    const [tags, setTags] = useState([]);
    const [showSlides, setShowSlides] = useState(false);
    const { Option } = Select;
    const [prompt, setPrompt] = useState('');
    const [input , setInput] = useState('');
    const handleGenerate = async () => {
        setPrompt('please use English to write a diary about travel within 100words,describe the scenes with elegant language(translate the title into English)and this is the title:');
        try {
            const diary = await generateDiary(prompt, form.getFieldValue('title'));
            form.setFieldsValue({
                content:  BraftEditor.createEditorState(diary)
            });
            message.success('Generate successful!');
        } catch (error) {
            console.error('There was an error!', error);
        }
    };
    const handleGenerateIMG = (content) => {
        setShowSlides(true);
        setPrompt('请帮我生成stable diffusion的prompt，我会给你一段旅游日记的内容，请帮我按照日记内容里的场景介绍生成对应的prompt，回答中不需要给出标题，你只需要给出逗号分隔的英文的简短的prompt即可,日记如下：');
        setInput(content.toText());
    };  
    useEffect(() => {
        setTimeout(() => {
            form.setFieldsValue({
                content: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>')
            })
        }, 1000);
    }, [form]);
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

    const handleModalClose = () => {
        setShowSlides(false);
    };
    const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media']

    return (
        <div className="upload-container">
            <h1>上传你的游学日记</h1>
            <Form form={form}
                onFinish={(values) => {
                    request.post('/diary/upload', {
                        username: localStorage.getItem('username'),
                        title: values.title,
                        content: values.content.toHTML(),
                        tags: values.tags
                    })
                        .then(function (response) {
                            if (response.data.msg === 'success') {
                                message.success('Upload successful!');
                                // navigate('/dashboard');
                            } else {
                                message.error(response.data.msg);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }}>
                <FormItem name="title" rules={[{ required: true, message: 'Please enter the title' }]}>
                    <Input size="large" placeholder="Please enter the title" />
                </FormItem>

                <FormItem name="tags" rules={[{ required: true, message: 'Please select at least one tag' }]}>
                    <Select mode='tags'>
                        {tags.map(tag => (
                            <Option key={tag}>{tag}</Option>
                        ))}
                    </Select>
                </FormItem>

                <FormItem name="content" rules={[{
                    required: true,
                    validateTrigger: 'onBlur',
                    validator: (_, value) => {
                        if (value.isEmpty()) {
                            return Promise.reject('Please type something here...');
                        } else {
                            return Promise.resolve();
                        }
                    }
                }]}>
                    <BraftEditor
                        className="my-editor"
                        controls={controls}
                        placeholder="Please type something here..."
                    />
                </FormItem>

                <FormItem>
                    <Button size="large" type="primary" htmlType="submit">Submit</Button>
                </FormItem>
                <Form.Item>
                    <Button onClick={() => handleGenerate(prompt)}>生成日记</Button>
                    <Button onClick={()=>handleGenerateIMG(form.getFieldValue('content'))}>生成动画</Button>
                </Form.Item>

            </Form>
            <Modal
                    open={showSlides}
                    onCancel={handleModalClose}
                    footer={null}
                    className='modal'
                >
                    {showSlides && <Slides prompt={prompt}
                                            input={input}/>}
                </Modal>
        </div>
    )
}

export default FormDemo
