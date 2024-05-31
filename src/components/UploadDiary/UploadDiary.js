import 'braft-editor/dist/index.css';
import "./UploadDiary.css";
import React, { useEffect, useState } from 'react';
import BraftEditor from 'braft-editor';
import { Form, Input, Button, Select, message } from 'antd';
import { request } from '../../utils/request';
const { useForm, Item: FormItem } = Form;
const { Option } = Select;


const FormDemo = () => {
    const [form] = useForm();
    const [tags, settags] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            form.setFieldsValue({
                content: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>')
            })
        }, 1000);
    }, [form]);
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await request.post(
                '/tag/get_all_tags',{});
                if (response.data.code === 200) {
                    settags = response.data.data.map(tag => ({
                        name: tag.name
                    }));
                    console.log(tags);
                    form.setFieldsValue({ tags });
                } else {
                    message.error(response.data.msg);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchTags();
    }, []); 


    const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media' ]

    return (
        <div className="upload-container">
            <h1>上传你的游学日记</h1>
            <Form form={form} 
            // className='editor-form' 
            onFinish={(values) => {
                request.post('/diary/upload', {
                    username: localStorage.getItem('username'),
                    title: values.title,
                    content: values.content.toHTML(),
                    tags: values.tags
                })
                .then(function (response) {
                  if(response.data.msg==='success') {
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
                    <Input size="large" placeholder="Please enter the title"/>
                </FormItem>

                 <FormItem name="tags" rules={[{ required: true, message: 'Please select at least one tag' }]}>
                    <Select mode="multiple" placeholder="Please select tags">
                        {tags.map(tag => (
                            <Option key='tag' value={tag.name}>{tag.name}</Option>
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
            </Form>
        </div>
    )
}

export default FormDemo
