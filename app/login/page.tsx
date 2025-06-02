import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Scale } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Scale className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">LegalAI PH</span>
          </div>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Sign in to access your legal assistance dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Link href="/chat">
            <Button className="w-full">Sign In</Button>
          </Link>
          <div className="text-center">
            <Link href="/signup" className="text-sm text-blue-600 hover:underline">
              Don't have an account? Sign up
            </Link>
          </div>
          <div className="text-center">
            <Link href="/chat" className="text-sm text-gray-600 hover:underline">
              Continue as Guest
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
