import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import React from 'react'


export default function ProfileButton() {
  console.log('PROFILEBUTTON')
  return (
    <Avatar className='px-2 py-2 w-[100%] h-full font-sans text-[16px] hover:bg-[#2C2C2C] hover:text-white 
    transition-all rounded-[50%] cursor-pointer active:scale-150 active:bg-[#333333] hover:scale-125 flex flex-row'
      icon={<UserOutlined />}
    />
  )
}
