import React from 'react'
import { HiOutlineSparkles, HiOutlineMicrophone } from "react-icons/hi";
import { HiOutlineBolt, HiOutlineCodeBracket } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import logo from "../assets/logo.png"
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from "axios"
import { ServerUrl } from '../App';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Login({setUser}) {
    const navigate = useNavigate()
    
    const FEATURES = [
        {
            icon: <HiOutlineMicrophone />,
            title: "Voice AI",
            desc: "Natural real-time voice conversations.",
        },
        {
            icon: <HiOutlineSparkles />,
            title: "Smart Navigation",
            desc: "Navigate pages using voice commands.",
        },
        {
            icon: <HiOutlineCodeBracket />,
            title: "Easy Embed",
            desc: "Add assistant using one script tag.",
        },
        {
            icon: <HiOutlineBolt />,
            title: "Fast Responses",
            desc: "Optimized Gemini AI responses.",
        },
    ];

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth,provider)
           const {displayName , email} = result.user
           const res = await axios.post(ServerUrl + "/api/auth/google" , { name:displayName , email} , {withCredentials:true})
           setUser(res.data)
           toast.success("Login Successfully")
           navigate("/")
        } catch (error) {
            toast.error("Login Failed...")
            console.log(error)
        }
    }
    
    return (
        <div className='min-h-screen bg-[#050505] text-white overflow-hidden relative selection:bg-purple-500/30'>
            
            {/* Elegant Ambient Background Glows */}
            <div className='absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none' />
            <div className='absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-900/20 blur-[120px] pointer-events-none' />

            <div className='max-w-7xl mx-auto px-6 py-16 lg:py-24 relative z-10'>
                <div className='grid lg:grid-cols-2 gap-16 items-center'>
                    
                    {/* Left Content Area */}
                    <div>
                        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-gray-300 text-sm font-medium'>
                            <HiOutlineSparkles className="text-purple-400" />
                            Premium AI Voice Assistant
                        </div>

                        <h1 className='mt-8 text-5xl lg:text-7xl font-black leading-tight tracking-tight text-white'>
                            Build AI Assistants
                            <span className='block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400 drop-shadow-sm mt-2'>For Any Website</span>
                        </h1>

                        <p className='mt-8 text-lg text-gray-400 leading-relaxed max-w-2xl font-light'>
                            Create highly customizable AI voice assistants that talk, guide users, and integrate into any website seamlessly in minutes.
                        </p>

                        {/* Premium White Button */}
                        <button onClick={handleLogin} className='mt-10 h-16 w-full sm:w-auto px-10 rounded-2xl bg-white text-[#050505] text-lg font-semibold flex items-center justify-center gap-4 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] hover:scale-[1.02] transition-all duration-300 cursor-pointer'>
                            <FcGoogle className='text-3xl' />
                            Continue with Google
                        </button>

                        <div className='mt-8 flex items-center gap-4 text-sm text-gray-500'>
                            <span className="w-12 h-px bg-white/10"></span>
                            Free plan includes 200 AI responses
                        </div>
                    </div>

                    {/* Right Area: Glassmorphism Feature Panel */}
                    <div className='relative'>
                        {/* Inner glow specifically for the card */}
                        <div className='absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-emerald-500/10 blur-3xl' />

                        <div className='relative rounded-[40px] border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-2xl shadow-2xl p-8 lg:p-10 overflow-hidden'>
                            
                            <div className='flex items-center justify-between border-b border-white/10 pb-8'>
                                <div>
                                    <h2 className='text-3xl font-bold text-white tracking-tight'>Features</h2>
                                    <p className="text-gray-400 mt-2 text-sm">Everything you need to automate.</p>
                                </div>

                                <div className='w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg p-3 backdrop-blur-md'>
                                    <img src={logo} alt="logo" className='w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]' />
                                </div>
                            </div>

                            <div className='mt-8 space-y-4'>
                                {FEATURES.map(({icon , title , desc}, index) => (
                                    <div key={index} className='group flex gap-5 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] p-5 transition-all duration-300'>
                                        
                                        <div className='min-w-[56px] h-[56px] rounded-2xl bg-white/5 border border-white/10 text-white text-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:text-emerald-400'>
                                           {icon}
                                        </div>
                                        
                                        <div className="flex flex-col justify-center">
                                            <h3 className='text-white text-lg font-medium tracking-tight'>{title}</h3>
                                            <p className='mt-1 text-sm text-gray-400'>{desc}</p>
                                        </div>

                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login