import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignupPage() {
    return (
        <div className="min-h-screen flex">
            {/* Left side - Sign Up Form (65%) */}
            <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white">
                <div className="w-full max-w-md space-y-6">
                    {/* Logo */}
                    <div className="flex justify-center">
                        <div className="flex justify-center">
                            <Image src="/justgo_logo.png" alt="JustGo Logo" width={300} height={40} className="object-contain" />
                        </div>
                    </div>

                    {/* Welcome Text */}
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900">Get Started Now!</h1>
                        <p className="text-gray-600">Enter your credentials to access your account</p>
                    </div>

                    {/* Google Login Button */}
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                            <path d="M1 1h22v22H1z" fill="none" />
                        </svg>
                        Log In with Google
                    </Button>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">or</span>
                        </div>
                    </div>

                    {/* Sign Up Form */}
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                Name
                            </Label>
                            <Input id="name" type="text" placeholder="Enter your name" className="w-full" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email
                            </Label>
                            <Input id="email" type="email" placeholder="Enter your email" className="w-full" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Password
                            </Label>
                            <Input id="password" type="password" placeholder="Create a password" className="w-full" required />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <Label htmlFor="terms" className="text-sm text-gray-600">
                                I agree to the terms and conditions
                            </Label>
                        </div>

                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            Sign Up
                        </Button>
                    </form>

                    {/* Login Link */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                                Log In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side - Image (35%) */}
            <div className="w-[35%] relative bg-gray-100">
                <Image
                    src="/login_pic_1.png?height=800&width=600"
                    alt="Legal assistance illustration"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
        </div>
    )
}
