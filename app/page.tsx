import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, MessageSquare, FileText, Users, CheckCircle, Star } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Scale className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">JustGo</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/chat">
                <Button variant="ghost">Get Legal Help</Button>
              </Link>
              <Link href="/lawyers">
                <Button variant="ghost">Find Lawyers</Button>
              </Link>
              <Link href="/login">
                <Button className="bg-black text-white">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">AI-Powered Legal Assistance for the Philippines</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get instant legal advice, generate required documents, and connect with qualified lawyers - all in one
            platform designed for Philippine law.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/chat">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Start Legal Chat
              </Button>
            </Link>
            <Link href="/lawyers">
              <Button size="lg" variant="outline">
                Browse Lawyers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Legal Solution</h2>
            <p className="text-lg text-gray-600">Everything you need for legal assistance in the Philippines</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>AI Legal Advice</CardTitle>
                <CardDescription>
                  Get instant legal guidance based on Philippine law through our AI assistant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">24/7 availability</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Philippine law expertise</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Instant responses</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Document Generation</CardTitle>
                <CardDescription>
                  Automatically generate legal documents and forms required for your case
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Complaint forms</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Legal notices</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Contract templates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Lawyer Marketplace</CardTitle>
                <CardDescription>
                  Connect with qualified lawyers and paralegals specializing in your legal area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Verified professionals</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Specialization filtering</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Affordable rates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Get legal help in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Describe Your Problem</h3>
              <p className="text-gray-600">Chat with our AI and explain your legal situation in plain language</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Get AI Guidance</h3>
              <p className="text-gray-600">Receive legal advice and automatically generated documents for your case</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect with Lawyers</h3>
              <p className="text-gray-600">
                Get matched with qualified lawyers if you need professional representation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "JustGo PH helped me understand my employment rights and generated the complaint letter I needed. The
                  lawyer recommendations were spot-on!"
                </p>
                <div className="font-semibold">Maria Santos</div>
                <div className="text-sm text-gray-500">Small Business Owner</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "As someone who couldn't afford a lawyer initially, this platform gave me the guidance I needed to
                  understand my options."
                </p>
                <div className="font-semibold">Juan Dela Cruz</div>
                <div className="text-sm text-gray-500">OFW</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Legal Help?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of Filipinos who have found legal solutions through our platform
          </p>
          <Link href="/chat">
            <Button size="lg" className="bg-white" variant="secondary">
              Start Your Legal Chat Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Scale className="h-6 w-6 text-blue-400" />
                <span className="ml-2 text-xl font-bold">JustGo PH</span>
              </div>
              <p className="text-gray-400">
                Making legal assistance accessible to all Filipinos through AI technology.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>AI Legal Advice</li>
                <li>Document Generation</li>
                <li>Lawyer Matching</li>
                <li>Legal Forms</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal Areas</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Employment Law</li>
                <li>Family Law</li>
                <li>Criminal Law</li>
                <li>Civil Law</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>support@JustGo.ph</li>
                <li>+63 2 123 4567</li>
                <li>Manila, Philippines</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 JustGo PH. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
