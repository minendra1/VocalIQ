import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png"
import { FiLogOut, FiMenu, FiX , FiMoon, FiSun } from "react-icons/fi";
import axios from 'axios';
import { ServerUrl } from '../App';
import toast from 'react-hot-toast';

function Navbar({user , setUser}) {
  const navigate = useNavigate()
  const [menuOpen,setMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)

  React.useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Toggle Function
  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = async () => {
    try {
      await axios.get(ServerUrl + "/api/auth/logout" , {withCredentials:true})
      setUser(null)
      toast.success("Logout Successfully")
      navigate("/login")
    } catch (error) {
      toast.error("logout failed")
      console.log(error)
    }
  }

  return (
    <div className='sticky top-0 z-50 bg-white/90 dark:bg-[#242736] border-b border-gray-100 dark:border-[#1a1c29] shadow-sm transition-colors duration-300'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between'>

        <div onClick={()=>navigate("/")} className='flex items-center gap-2.5 cursor-pointer'>
          <img src={logo} alt="logo" className='h-9 w-auto object-contain' />
          <h1 className='font-bold text-xl text-gray-700 dark:text-white leading-none'>
            Vocal<span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-emerald-500'>IQ</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        {user && (<div className='hidden md:flex items-center gap-4'>

          {/* Dark Mode Toggle Desktop */}
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 transition-colors cursor-pointer mr-1">
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          <button onClick={()=>navigate("/builder")} className='px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-emerald-500 text-white text-sm font-medium shadow-md hover:scale-[1.02] transition-all cursor-pointer'>Builder</button>

          <button onClick={()=>navigate("/billing")} className='px-5 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1c29] text-gray-700 dark:text-gray-200 text-sm font-medium hover:border-purple-300 dark:hover:border-purple-500 transition-all cursor-pointer'>Billing</button>

          <div className='flex items-center gap-3 px-4 py-2 rounded-2xl bg-white dark:bg-[#1a1c29] border border-gray-200 dark:border-white/10 shadow-sm'>
            <div className='w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-emerald-500 flex items-center justify-center flex-shrink-0'>
              <span className='text-white text-sm font-bold'>
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className='max-w-[140px]'>
              <p className='text-sm font-semibold text-gray-800 dark:text-white truncate'>{user.name}</p>
              <p className='text-xs text-gray-400 dark:text-gray-400 truncate'>{user.email}</p>
            </div>
             <button onClick={handleLogout} className='ml-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer'>
               <FiLogOut size={18}/>
             </button>
          </div>
          
        </div>)}

        {/* Mobile Menu Actions */}
        {user && (
          <div className='md:hidden flex items-center gap-4'>
            {/* Dark Mode Toggle Mobile */}
            <button onClick={toggleDarkMode} className="p-2 rounded-full text-gray-600 dark:text-gray-300 transition-colors cursor-pointer">
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            <button onClick={()=>setMenuOpen(!menuOpen)} className='text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors cursor-pointer'>
              {menuOpen ? <FiX size={22}/> : <FiMenu size={22}/>}
            </button>
          </div>
        )}

      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className='md:hidden px-4 pb-4'>
          <div className='bg-white dark:bg-[#1a1c29] rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg p-4'>
            <div className='flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-white/10'>
              <div className='w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-emerald-500 flex items-center justify-center flex-shrink-0'>
                <span className='text-white text-sm font-bold'>
                  {user?.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className='flex-1 overflow-hidden'>
                <p className='text-sm font-semibold text-gray-800 dark:text-white truncate'>{user.name}</p>
                <p className='text-xs text-gray-500 dark:text-gray-400 truncate'>{user.email}</p>  
              </div>
            </div>

            <div className='flex flex-col gap-3 mt-4'>
              <button className='w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-emerald-500 text-white text-sm font-medium' onClick={()=>{navigate("/builder");setMenuOpen(false)}}>Builder</button>
              <button className='w-full py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#242736] text-gray-700 dark:text-gray-200 text-sm font-medium' onClick={()=>{navigate("/billing");setMenuOpen(false)}}>Billing</button>
            </div>

            <button onClick={()=>{setMenuOpen(false);handleLogout()}} className='mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors text-sm font-medium cursor-pointer'>
              <FiLogOut size={16}/> LogOut
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar