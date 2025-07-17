'use client'
import React, { useState } from 'react'
import logo from '../public/logo.png'
import Image from 'next/image'
import { italiana } from '@/app/layout'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import SignupSignIn from './SignupSignIn'

export default function Header() {
    const router = useRouter()
    const pathname = usePathname()
    const { user, userId, signOut } = useAuth()
    const [openAuth, setOpenAuth] = useState(false)

    const toggleOpenAuth = () => setOpenAuth((prev) => !prev)

    const handleAuthAction = async () => {
        if (userId) {
            await signOut()
        } else {
            toggleOpenAuth()
        }
    }

    return (
        <>
            <header
                className="fixed w-full backdrop-blur-2xl bg-gradient-to-br from-custom-pink/10 via-background/95 to-custom-blue/10 border-b border-custom-pink/10 shadow-soft z-[120]"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between px-6 py-5">
                        <button
                            className="flex items-center gap-3 button group transition-all duration-300 hover:scale-105"
                            onClick={() => router.push('/')}
                        >
                            <div className="relative">
                                <Image
                                    src={logo}
                                    alt="Sing Lang Logo"
                                    width={45}
                                    height={45}
                                    className="transition-transform duration-300 group-hover:rotate-3 drop-shadow-soft"
                                />
                                <div className="absolute inset-0 rounded-full bg-custom-pink/5 blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                            </div>
                            {pathname !== '/' && (
                                <h3
                                    className={`${italiana.className} text-2xl lg:text-3xl tracking-wide font-light text-custom-pink/60 group-hover:text-custom-pink/80 transition-colors duration-300 drop-shadow-soft`}
                                >
                                    Sing Lang
                                </h3>
                            )}
                        </button>

                        <div className="flex items-center gap-6">
                            {userId && (
                                <div className="flex items-center gap-3">
                                    <p className="text-sm font-medium text-foreground/90 tracking-wide">
                                        {user?.email}
                                    </p>
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-foreground to-foreground/80 flex items-center justify-center text-background text-sm font-semibold tracking-wide shadow-md">
                                        {user?.email?.charAt(0).toUpperCase()}
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-3">
                                {userId && (
                                    <button
                                        onClick={() => router.push('/translations')}
                                        className="px-5 py-2 rounded-full border border-custom-pink/20 text-custom-pink/60 font-medium text-sm tracking-wide button transition-all duration-300 hover:border-custom-pink/40 hover:text-background hover:bg-custom-pink/10 shadow-soft"
                                    >
                                        Translations
                                    </button>
                                )}
                                <button
                                    onClick={handleAuthAction}
                                    className="px-5 py-2 rounded-full bg-transparent border border-custom-pink/20 text-custom-pink/60 font-medium text-sm tracking-wide button transition-all duration-300 hover:bg-custom-pink/10 hover:text-background hover:border-custom-pink/40 shadow-soft"
                                >
                                    {userId == null ? 'Sign In' : 'Sign Out'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="h-px bg-gradient-to-r from-transparent via-custom-pink/10 to-transparent" />
                    <div className="absolute left-1/2 top-0 w-32 h-px bg-gradient-to-r from-custom-pink/20 to-custom-pink/5 transform -translate-x-1/2 blur-[4px]" />
                </div>
            </header>
            {openAuth && !userId && (
                <SignupSignIn toggleOpenSignIn={toggleOpenAuth} />
            )}
        </>
    )
}
