import React from 'react'

type Props = {
    imageSrc:string,
    userName:string
}

function SidebarItem({imageSrc,userName}:Props) {
  return (
    <div className='flex w-full hover:bg-[rgba(255,255,255,0.1)] items-center p-1 my-1 gap-3 cursor-pointer rounded-lg justify-start'>
        <img
        src={imageSrc}
        alt={imageSrc}
        className='w-[40px] h-[40px] object-cover rounded-full'
        />
      <p>{userName}</p>
    </div>
  )
}

export default SidebarItem