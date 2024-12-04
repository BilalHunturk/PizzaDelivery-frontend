import React from 'react'
import { Button, Form, Input, message } from 'antd'
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const validateMessages = {
    required: '${label} is required!',
    types: {
        Email: '${label} is not a valid username!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const sendLogin = async (values) => {
    try {
        // API'ye istek atılıyor
        const response = await axios.post('http://127.0.0.1:3000/login', {
            username: values.username,
            password: values.password
        });

        console.log(response);
        if (response.status !== 200) {
            message.error('Your username or password is incorrect.');
            return;
        }

        const token = response.data.token; // API'den gelen token'ı alıyoruz.
        localStorage.setItem('token', token); // Token'ı localStorage'a kaydediyoruz.
        message.success('Login successful!'); // Başarılı mesajı gösteriyoruz.
        window.location.href='/';
                
    } catch (error) {
        console.log(error.response?.data?.error || 'Something went wrong');
        message.error(error.response?.data?.error || 'Something went wrong');
    }
};

export default function LoginPage() {

    


    return (
        <div className='w-full h-screen flex items-center justify-center bg-black'>
            <div className='w-[30%] h-[50%] bg-white flex items-center justify-center'>
                <div className='flex justify-center items-center mr-[35px]'>
                    <Form name='basic' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} initialValues={{ remember: true }} onFinish={sendLogin} validateMessages={validateMessages}>
                        <div className='flex justify-center items-center'>
                            <div className='login-title text-[24px] pb-7'>
                                Login
                            </div>
                        </div>
                        <Form.Item hasFeedback name="username" label={<span className='login-title'>Username</span>} rules={[{ required: true, type: 'username' },
                        {
                            validator: (_, value) => {
                                if (!value) {
                                    return Promise.reject('Username is required');
                                }
                                if (value.length < 6 || value.length > 16) {
                                    return Promise.reject('Username must be between 6 and 16 characters');
                                }
                                if (!/\d/.test(value)) {
                                    return Promise.reject('Username must contain at least one number');
                                }
                                return Promise.resolve();
                            }
                        }
                        ]}>
                            <Input placeholder='username123' />
                        </Form.Item>
                        <Form.Item hasFeedback name="password" label={<span className='login-title'>Password</span>} rules={[{ required: true, message: 'Please input your password!', }]}>
                            <Input.Password placeholder='*******' />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button className='w-[140px]' type="primary" htmlType="submit">
                                <span className='login-title text-[#F5F5F5]'>Sign in</span>
                            </Button>
                            <p onClick={() => window.location.href = '/'}>HOME</p>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}
