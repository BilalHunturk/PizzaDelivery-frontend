import React, { useContext } from 'react';
import './loginform.css';
import { Button, Form, Input, InputNumber, message } from 'antd';
import { X } from 'lucide-react';
import axios from 'axios';

import { AuthContext } from '../../Context/AuthContext';



const validateMessages = {
  required: '${label} is required!',
  types: {
    Email: '${label} is not a valid username!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const onFinish = (values) => {
  console.log(values);
};



export default function LoginForm({ closeLoginForm, loggedIn} ) {

  const { authenticated , setAuthenticated} = useContext(AuthContext);
  
  console.log('LOGINFORM')

  const handleClick = () => {
    closeLoginForm(false);
  };
  
  const handleToken = () => {
    loggedIn(true)
  }

  const sendLogin = async (values) => {
    // await form.validateFields(); // `await` ile `validateFields` sonucunu bekliyoruz.
    try {
      const response = await axios.post('http://127.0.0.1:3000/login', {
        username: values.username,
        password: values.password
      });

      console.log(response);
      if (response.status != 200) {
        return message.error('Your username or password is incorrect.');
      }

      const token = response.data.token; // API'den gelen token'ı alıyoruz.
      localStorage.setItem('token', token); // Token'ı localStorage'a kaydediyoruz.
      console.log('token is', token);
      message.success('Login successful!'); // Başarılı mesajı gösteriyoruz.
      handleClick();
      handleToken();
      
    } catch (error) {
      console.log(error.response.data.error);
      return message.error(error.response.data.error);
    }
  };

  return (
    <>
      <div className='flex flex-col h-[300px] w-[400px] bg-[#F5F5F5] rounded-[16px] absolute z-[999]'>
        <div className='flex justify-end mt-4 mr-4'>
          <button onClick={handleClick}><X /></button>
        </div>
        <div className='flex justify-center items-center mr-[35px]'>
          <Form name='basic' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} initialValues={{ remember: true }} onFinish={sendLogin} validateMessages={validateMessages}>
            <div className='flex justify-center items-center'>
              <div className='login-title text-[24px] pb-7'>
                Sign in
              </div>
            </div>
            <Form.Item hasFeedback name="username" label={<span className='login-title'>Username</span>} rules={[{ required: true, type: 'username' },]}>
              <Input placeholder='username123' />
            </Form.Item>
            <Form.Item hasFeedback name="password" label={<span className='login-title'>Password</span>} rules={[{ required: true, message: 'Please input your password!', }]}>
              <Input.Password placeholder='*******' />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button className='w-[140px]' type="primary" htmlType="submit">
                <span className='login-title text-[#F5F5F5]'>Sign in</span>
              </Button>
            </Form.Item>
          </Form>
        </div>

      </div>
    </>
  )
}
