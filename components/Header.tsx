'use client'
import React from 'react'
import logo from '../public/logo.png'
import Image from 'next/image'
import { bagelFatOne } from '@/app/layout'
import { useRouter, usePathname } from 'next/navigation'

export default function Header() {
    const router = useRouter()
    const pathname = usePathname()

    return (
        <>
            <header className="fixed w-full backdrop-blur-3xl z-[120]">
                <div className="flex items-center justify-between gap-4 p-4">
                    <button
                        className="flex items-center gap-4 button flex-wrap"
                        onClick={() => router.push("/")}
                    >
                        <Image src={logo} alt="Sing Lang Logo" width={50} height={50} />
                        {pathname !== "/" && (
                            <h3 className={bagelFatOne.className + " text-2xl lg:text-3xl"}>
                                Sing Lang
                            </h3>
                        )}
                    </button>

                    <div className="flex flex-col justify-center items-end gap-2">
                        {/*userId && (
                            <div className="flex items-center gap-2">
                                <p className="text-sm sm:text-base">{user?.email}</p>
                                <Image
                                    src={user?.photoURL || "/default-profile-icon.png"}
                                    alt="User Profile"
                                    width={30}
                                    height={30}
                                    className="rounded-full"
                                />
                            </div>
                        )*/}
                        <div className="flex gap-2 text-xs sm:text-base flex-wrap">
                            {/*userId && (
                                <button
                                    onClick={() => router.push("/translations")}
                                    className="rounded-full bg-transparent button font-bold border border-foreground px-4 p-2"
                                >
                                    Translations
                                </button>
                            )*/}
                            {/*<button
                                onClick={toggleOpenAuth}
                                className="border-foreground border rounded-full bg-transparent font-bold button px-4 p-2"
                            >
                                {userId == null ? "Sign In" : "Sign Out"}
                            </button>*/}
                        </div>
                    </div>
                </div>
                <div className="bg-foreground h-[1px] w-[30%] min-w-[200px]"></div>
            </header>
            {/*openAuth && !userId && (
                <SignInSignUp toggleOpenSignIn={toggleOpenAuth} />
            )*/}
        </>
    )
}
