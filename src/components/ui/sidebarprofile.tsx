import { useSidebarContext } from "@/contexts/SidebarContext";
import { useAppSelector } from '@/redux/hooks';
import Image from "next/image";
import Link from "next/link";

const SidebarProfile = () => {
    const { open, setOpen } = useSidebarContext();
    const user = useAppSelector(state => state.auth.user);

    return (
        <>
            <Link onClick={() => { setOpen(!open) }} href='/profile'>
                <div className='flex flex-col w-full hover:bg-[rgba(255,255,255,0.1)] items-center p-4 my-1 gap-2 cursor-pointer rounded-lg justify-start'>
                    <img
                        alt="profile picture"
                        src={user?.profilePhotoUrl ||'/images/logo_whitebg.png'}
                        className='w-[50px] h-[50px] object-cover rounded-full'
                    />

                    <p>{user?.username || 'Username'}</p>
                    <p className="text-sm">{user?.nickname || 'Nickname'}</p>
                </div>
            </Link>
        </>
    );
}

export default SidebarProfile;