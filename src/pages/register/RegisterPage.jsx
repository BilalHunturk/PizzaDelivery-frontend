import React from 'react';
import { Button, Form, Input, Select , message} from 'antd';
import PhoneNumberFormItem from './PhoneNumberFormItem';

const {Option} = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const consoleLog = () => {
  console.log("Clicked.")
}


const onFinish = (values) => {
  console.log(values);
};

export default function RegisterPage() {
  const [form] = Form.useForm();
const handleSubmit = () => {
  // Validate all form fields
  form
    .validateFields()
    .then((values) => {
      // If validation passes, do something with the form data
      console.log('Form Values:', values);
      message.success('Form submitted successfully!');
    })
    .catch((errorInfo) => {
      // Handle validation failure
      console.log('Validation Failed:', errorInfo);
      message.error('Please correct the errors in the form.');
    });
};
  return (
    <div className='w-screen h-screen bg-[#f6f6f6] flex items-center justify-center'>
      <div className='w-[500px] h-[600px] bg-[#e8e8e8] z-10 rounded-[70px] flex flex-col gap-7 items-center justify-center shadow-md' >
        <div className='text-5xl font-serif'>Sign In</div>
        <Form
        form={form}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
          validateMessages={validateMessages}
        >
          <Form.Item hasFeedback name="Username" label={<span className='login-title'>UserName</span>} rules={[{ required: true, type: 'username' },
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

          <PhoneNumberFormItem/>
          
          <Form.Item hasFeedback name="email" label={<span className='login-title'>Email</span>} rules={[
              {
                required:true,
                type: 'email',
              },
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item hasFeedback name='password' label={<span className='login-title'>Password</span>}
          rules={[
            {
              required: true,
              message: 'Please enter your password',
            },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/,
              message:
                'Password must be 8-16 characters long\n contain at least one uppercase letter, one lowercase letter, and one number',
            },
          ]}>
            <Input.Password />
          </Form.Item>
          
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Button size={'large'}type="primary" htmlType="submit" onClick={handleSubmit} >
              Register
            </Button>
          </Form.Item>

          
        </Form>
        <a href="/">HOME</a>
      </div>
    </div>
  )
}
