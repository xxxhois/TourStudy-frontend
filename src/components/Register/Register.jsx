import "./Register.css";
import {useNavigate} from 'react-router-dom';
import {request} from '../../utils/request'
import picture from '../../assets/LoginImg.jpg';
import {
  Button,
  Form,
  Input,
  message,
} from 'antd';

const Register = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    //获取验证码
    return (
        <div>
            <Form
                form={form}
                name="register"
                initialValues={{ remember: true }}
                onFinish={(values) => {
                    request.post('/register/code', {
                        username: values.username,
                        password: values.password,
                        email: values.email,
                        jwt:values.captcha
                    })
                    .then(function (response) {
                        if(response.data.msg==='success') {
                            message.success('Signup successful!');
                            navigate('/login');
                        } else {
                            message.error(response.data.msg);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }}
            >
                <div className="signup-container">
                <div className="illustration-container">
                    <img src={picture} alt="Illustration" />
                </div>
                    <div className="form-container">
                    <Form.Item><h2>TourStudy in BUPT</h2></Form.Item>
                        <Form.Item
                            name="username"
                            tooltip="What do you want others to call you?"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your nickname!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input placeholder="Username"/>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="Password"/>
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Confirm password"/>
                        </Form.Item>

                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input placeholder="E-mail"/>
                        </Form.Item>

                        <Form.Item extra="We must make sure that your are a human." className="captcha-container">
                            <Form.Item
                                name="captcha"
                                noStyle
                                className="captcha"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the captcha you got!',
                                    },
                                ]}
                            >
                                <Input placeholder="Captcha"/>
                            </Form.Item>
                            <Form.Item>
                                <Button onClick={() => {
                                    const values = form.getFieldsValue(['username', 'email']);
                                    request.post('/register/valid', {
                                    username: values.username,
                                    email: values.email
                                    })
                                    .then(function (response) {
                                    if(response.data.msg==='success') {
                                        message.success('Get captcha successful!');
                                    } else {
                                        message.error(response.data.msg);
                                    }
                                    })
                                    .catch(function (error) {
                                    console.log(error);
                                    });
                                }
                                }>Get captcha</Button>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                            <Button
                                onClick={()=>navigate('/login')}
                                type="link"
                            >
                                Already have an account?
                            </Button>
                        </Form.Item>
                        
                    </div>
                </div>
            </Form>
        </div>
    );
};
export default Register;