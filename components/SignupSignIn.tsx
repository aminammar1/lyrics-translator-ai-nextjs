'use client'

import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useAuth } from '@/context/AuthContext'

interface SignupSignInProps {
    toggleOpenSignIn: () => void
}

export default function SignupSignIn({ toggleOpenSignIn }: SignupSignInProps) {
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [loading, setLoading] = useState(false)

    const { signUp, signIn } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (isSignup) {
                const { error } = await signUp(formData.email, formData.password)
                if (!error) toggleOpenSignIn()
            } else {
                const { error } = await signIn(formData.email, formData.password)
                if (!error) toggleOpenSignIn()
            }
        } catch (err) {
            console.error('Authentication error:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <div className="min-h-screen w-full fixed flex items-center justify-center bg-[#0000005d] backdrop-blur-sm z-[1000]">
            <div className="relative bg-background/95 p-8 rounded-3xl shadow-2xl shadow-foreground/20 max-w-sm w-full overflow-hidden border border-foreground/30 backdrop-blur-xl">
                <div className="absolute w-[150px] h-[150px] blur-[100px] z-[-10] bottom-[-50px] right-[-20px] rounded-full bg-gradient-to-br from-foreground/20 to-foreground/30" />

                <button
                    className="absolute right-[15px] top-[15px] p-2 rounded-full bg-background/60 hover:bg-background/80 border border-foreground/30 transition-all duration-300 text-foreground hover:text-foreground/80 button"
                    onClick={toggleOpenSignIn}
                >
                    <IoMdClose size={15} />
                </button>

                <h2 className="text-3xl font-light text-center text-foreground mb-8 tracking-wide">
                    Welcome to Sing Lang
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-light text-foreground/80 tracking-wide"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-6 py-3 border border-foreground/30 bg-background/50 placeholder:text-foreground/50 placeholder:font-light rounded-2xl shadow-sm focus:ring-2 focus:ring-foreground/50 focus:border-foreground/70 text-foreground backdrop-blur-sm transition-all duration-300"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-light text-foreground/80 tracking-wide"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-6 py-3 border border-foreground/30 bg-background/50 placeholder:text-foreground/50 placeholder:font-light rounded-2xl shadow-sm focus:ring-2 focus:ring-foreground/50 focus:border-foreground/70 text-foreground backdrop-blur-sm transition-all duration-300"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:transform-none tracking-wide button"
                    >
                        {loading
                            ? 'Please wait...'
                            : isSignup
                                ? 'Sign Up'
                                : 'Sign In'}
                    </button>
                </form>

                <p className="mt-6 text-sm text-foreground/60 text-center font-light">
                    {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button
                        type="button"
                        onClick={() => setIsSignup(prev => !prev)}
                        className="text-orange-400 hover:text-orange-300 font-medium transition-colors duration-200 button"
                    >
                        {isSignup ? 'Sign In' : 'Sign Up'}
                    </button>
                </p>
            </div>
        </div>
    )
}
