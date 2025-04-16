import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0'>
      <h1 className='md:text-4xl text-xl text-gray-800 font-semibold'>Học bất cứ điều gì, bất cứ lúc nào, bất cứ nơi đâu</h1>
      <p className='text-gray-500 sm:text-sm'>Biến tri thức thành sức mạnh trong tầm tay bạn, mở ra cánh cửa đến những cơ hội mới và tương lai mà bạn lựa chọn.</p>
      <div className='flex items-center font-medium gap-6 mt-4'>
        <button className='px-10 py-3 rounded-md text-white bg-blue-600'>Bắt đầu ngay</button>
        <button className='flex items-center gap-2'>
          Tìm hiểu thêm
          <img src={assets.arrow_icon} alt="arrow_icon" />
        </button>
      </div>
    </div>
  )
}

export default CallToAction