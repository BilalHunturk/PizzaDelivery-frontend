import React from 'react'
import { Flex, Spin } from 'antd'


export default function SpinPage() {
  return (
    <Flex className='absolute w-full h-screen flex items-center justify-center z-[999]'gap='middle' vertical>
      <Spin tip="Loading" size='72'/>
    </Flex>
  )
}
