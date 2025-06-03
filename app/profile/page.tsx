import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Scale, Send, FileText, Download, User, Bot } from "lucide-react"
import Link from "next/link"

export default function UserProfilePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <Link href="/" className="flex items-center">
                            <Scale className="h-6 w-6 text-blue-600" />
                            <span className="ml-2 text-xl font-bold text-gray-900">JustGo</span>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Link href="/lawyers">
                                <Button variant="ghost">Browse Lawyers</Button>
                            </Link>
                            <Link href="/profile">
                                <Button variant="outline">Profile</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-t-2xl shadow-lg">
                    {/* Profile Section */}
                    <div className="px-8 py-8">
                        {/* Profile Photo and Title */}
                        <div className="flex flex-col items-center mb-8">
                            <Avatar className="w-24 h-24 mb-4">
                                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile photo" />
                                <AvatarFallback className="text-xl">JD</AvatarFallback>
                            </Avatar>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">User Profile</h1>
                            <p className="text-gray-600 text-center">Update your photo and personal details</p>
                        </div>

                        {/* 3x3 Grid Form */}
                        <form className="space-y-6">
                            {/* First Row: First Name, Middle Name, Last Name */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                                        First Name
                                    </Label>
                                    <Input id="firstName" type="text" placeholder="Enter first name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="middleName" className="text-sm font-medium text-gray-700">
                                        Middle Name
                                    </Label>
                                    <Input id="middleName" type="text" placeholder="Enter middle name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                                        Last Name
                                    </Label>
                                    <Input id="lastName" type="text" placeholder="Enter last name" />
                                </div>
                            </div>

                            {/* Second Row: Country, City, Nationality */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                                        Country
                                    </Label>
                                    <Input id="country" type="text" placeholder="Enter country" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                                        City
                                    </Label>
                                    <Input id="city" type="text" placeholder="Enter city" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nationality" className="text-sm font-medium text-gray-700">
                                        Nationality
                                    </Label>
                                    <Input id="nationality" type="text" placeholder="Enter nationality" />
                                </div>
                            </div>

                            {/* Third Row: Email, Phone Number, Date of Birth */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                        Email
                                    </Label>
                                    <Input id="email" type="email" placeholder="Enter email address" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                                        Phone Number
                                    </Label>
                                    <Input id="phoneNumber" type="tel" placeholder="Enter phone number" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
                                        Date of Birth
                                    </Label>
                                    <Input id="dateOfBirth" type="date" />
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-center pt-6">
                                <Link href="/chat">
                                    <Button type="submit" className="bg-black hover:bg-gray-800 text-white px-8 py-2">
                                        Save All
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
