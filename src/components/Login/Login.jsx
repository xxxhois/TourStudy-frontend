import './Login.css'
import { Form, Input, Button, message } from 'antd'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import picture from '../../assets/LoginImg.jpg'
//API参考
// {
//   "username": "ymj",
//   "password": "123"
// }

const Login = () => {
  const navigate = useNavigate();
  return(
  <div>
    <Form
      name="login"
      initialValues={{ remember: true }}
      onFinish={(values) => {
        axios.post('http://10.29.73.74:8080/tour/login', {
          username: values.username,
          password: values.password
        })
        .then(function (response) {
          if(response.data.msg==='success') {
            message.success('Login successful!');
            navigate('/dashboard');
          } else {
            message.error(response.data.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }}
    >
      <div className="login-container">
        <div className="illustration-container">
          <img src={picture} alt="Illustration" />
        </div>
        <div className="form-login-container">
           <Form.Item><h2>TourStudy in BUPT</h2></Form.Item>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
            <Input  placeholder="Username" />
            </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
    
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
            <br/>
            <br/>
            <Button 
              onClick={()=>navigate('/register')}
              type="default"
            >
                Don't have an account?
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  </div>
  );
}

export default Login