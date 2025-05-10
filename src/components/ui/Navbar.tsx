'use client'
import { useSidebarContext } from '@/contexts/SidebarContext'
import { useAppSelector } from '@/redux/hooks'
import { Button, cn } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { FaBars,FaRegPlusSquare } from 'react-icons/fa'
import ThemeToggle from './ThemeToggle'

type Props = {
  setActivemodal?:(a:boolean)=>void
} 

function Navbar(props:Props) {
  const pathname = usePathname()
  const { open, setOpen } = useSidebarContext()
  const {isAuthenticated,user} = useAppSelector(state => state.auth)
 
  
  return (
    <nav className='bg-card w-full h-[fit-content] py-2 fixed top-0 left-0 px-10 z-[100] shadow-sm'>
      <div className='flex items-center justify-between mx-auto'>
        <div className='flex items-center justify-center gap-4'>
          <div 
            onClick={()=>setOpen(!open)}
            className={cn('flex items-center hover:bg-opacity-10 hover:bg-primary p-2 text-[1.1rem] rounded-[100px] cursor-pointer', open ? 'bg-opacity-10 bg-primary' : '')}
          >
            <FaBars size={20}/>
          </div>

          <Link className='min-h-[60px]' href='/'>
            <Image width={60} height={60}
              src='/images/logonew.png'
              alt='logo'
              className='w-[60px] h-[60px] object-cover'
            />
          </Link>
        </div>
       
        <div className='flex items-center justify-center gap-3'>
          <ThemeToggle />
          
          {!isAuthenticated && (
            <>       
              <Link 
                href='/signin'
                className={cn('flex items-center justify-center w-[100px] text-center hover:bg-opacity-10 hover:bg-primary p-1 text-[1.1rem] rounded-[35px]')}
              >
                Log in
              </Link>
              
              <Link 
                className={cn('flex items-center justify-center w-[100px] text-center bg-primary text-white hover:bg-secondary p-1 text-[1.1rem] rounded-[35px]')}
                href='/signup'
              >
                Sign Up
              </Link>
            </>
          )}
          
          {isAuthenticated && (
            <>
              <Link 
                className={cn('flex items-center hover:bg-opacity-10 hover:bg-primary p-2 text-[1.1rem] rounded-[35px]', pathname === '/create' ? 'bg-sidebar' : '')}
                href='/create'
              >
                <FaRegPlusSquare size={20}/>
              </Link>
              <Link href="/posts" className="text-foreground hover:text-primary">
                My Posts
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar