import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form (65%) */}
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
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
            <p className="text-gray-600">Sign in to access your legal assistance dashboard</p>
          </div>

          {/* Login Form */}
          <form className="space-y-4">
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
              <Input id="password" type="password" placeholder="Enter your password" className="w-full" required />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Login
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">or</span>
            </div>
          </div>

          {/* Continue as Guest Button */}
          <Link href="/">
            <Button variant="outline" className="w-full">
              Continue as guest
            </Button>
          </Link>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {"Don't have an account? "}
              <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up now
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
