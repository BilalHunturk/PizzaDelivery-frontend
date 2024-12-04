import React from 'react';
import { Form, Input, Select } from 'antd';
import InputMask from 'react-input-mask';

const { Option } = Select;
const prefixSelector = (
    <Form.Item hasFeedback name="prefix" noStyle rules={[
        { required: true, message: 'Please select a prefix' },
      ]}>
      <Select style={{ width: 70 }} placeholder="">
        <Option value="90">+90</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

export default function PhoneNumberFormItem() {
  return (
      <Form.Item
      hasFeedback
        name="phone"
        label={<span className="login-title">Phone Number</span>}
        rules={[
          {
            required: true,
            message: 'Please enter your phone number',
          },
          {
            pattern: /^[0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}$/,
            message: 'Phone number must be 10 digits long',
          },
        ]}
      >
        <InputMask mask="999 999 99 99" maskChar={null}>
          {(inputProps) => (
            <Input
              {...inputProps}
              addonBefore={prefixSelector}
              style={{ width: '100%' }}
            />
          )}
        </InputMask>
      </Form.Item>
  )
}
