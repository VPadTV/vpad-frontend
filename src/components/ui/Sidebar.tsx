'use client'
import Link from "next/link";
import { FaSignOutAlt, FaUser, FaCog, FaTimes, FaSignInAlt, FaUserPlus, FaPlusCircle, FaLayerGroup, FaPlus, FaBookOpen } from "react-icons/fa";
import SidebarProfile from "./sidebarprofile";
import { useSidebarContext } from "@/contexts/SidebarContext";
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { logout } from '@/redux/features/authSlice'
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const { open, setOpen } = useSidebarContext();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const r = useRouter();

  const handleLinkClick = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    r.push("/")
    setOpen(false);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <div className={`fixed w-[250px] h-screen top-0 left-0 bg-sidebar z-[110] pt-[80px] px-4 shadow-md transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="flex flex-col h-full">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-opacity-20 hover:bg-gray-300 transition-colors"
            aria-label="Close sidebar"
          >
            <FaTimes size={20} />
          </button>

          {isAuthenticated ? (
            <>
              <SidebarProfile />
              <div className="flex-grow">
                <Link href="/profile" onClick={handleLinkClick}>
                  <div className="flex items-center gap-3 p-3 my-2 rounded-lg hover:bg-primary/15 transition-all duration-200 ease-in-out cursor-pointer">
                    <FaUser className="text-primary" />
                    <span className="text-foreground">Profile</span>
                  </div>
                </Link>

                <Link href="/create" onClick={handleLinkClick}>
                  <div className="flex items-center gap-3 p-3 my-2 rounded-lg hover:bg-primary/15 transition-all duration-200 ease-in-out cursor-pointer">
                    <FaPlusCircle className="text-primary" />
                    <span className="text-foreground">Create Post</span>
                  </div>
                </Link>

                {/* Series section */}
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-subtext ml-4 mb-2">Series</h4>
                  <ul>
                    <li>
                      <Link href="/series/manage" onClick={handleLinkClick}>
                        <div className="flex items-center gap-3 p-3 my-2 rounded-lg hover:bg-primary/15 transition-all duration-200 ease-in-out cursor-pointer">
                          <FaBookOpen className="text-primary" />
                          <span className="text-foreground">Manage Series</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/series/create" onClick={handleLinkClick}>
                        <div className="flex items-center gap-3 p-3 my-2 rounded-lg hover:bg-primary/15 transition-all duration-200 ease-in-out cursor-pointer">
                          <FaPlus className="text-primary" />
                          <span className="text-foreground">Create Series</span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-subtext ml-4 mb-2">Subscription Tiers</h4>
                  <ul>
                    <li>
                      <Link href="/tier/manage" onClick={handleLinkClick}>
                        <div className="flex items-center gap-3 p-3 my-2 rounded-lg hover:bg-primary/15 transition-all duration-200 ease-in-out cursor-pointer">
                          <FaLayerGroup className="text-primary" />
                          <span className="text-foreground">Manage Tiers</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/tier/create" onClick={handleLinkClick}>
                        <div className="flex items-center gap-3 p-3 my-2 rounded-lg hover:bg-primary/15 transition-all duration-200 ease-in-out cursor-pointer">
                          <FaPlus className="text-primary" />
                          <span className="text-foreground">Create New Tier</span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                onClick={handleLogout}
                className="flex items-center gap-3 p-3 my-2 rounded-lg hover:bg-danger/15 transition-all duration-200 ease-in-out cursor-pointer"
              >
                <FaSignOutAlt className="text-danger" />
                <span className="text-foreground">Log Out</span>
              </div>
            </>
          ) : (
            <div className="flex-grow mt-4">
              <Link href="/signin" onClick={handleLinkClick}>
                <div className="flex items-center gap-3 p-3 my-2 rounded-lg hover:bg-primary/15 transition-all duration-200 ease-in-out cursor-pointer">
                  <FaSignInAlt className="text-primary" />
                  <span className="text-foreground">Log In</span>
                </div>
              </Link>

              <Link href="/signup" onClick={handleLinkClick}>
                <div className="flex items-center gap-3 p-3 my-2 rounded-lg hover:bg-primary/15 transition-all duration-200 ease-in-out cursor-pointer">
                  <FaUserPlus className="text-primary" />
                  <span className="text-foreground">Sign Up</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Sidebar;