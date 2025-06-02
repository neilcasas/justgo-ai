"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Scale, Send, FileText, Download, User, Bot } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  documents?: string[]
  lawyers?: Array<{
    id: string
    name: string
    specialization: string
    rating: number
  }>
}

const mockLegalResponse = {
  advice:
    "Based on your description, this appears to be a case of illegal dismissal under the Labor Code of the Philippines. You have the right to file a complaint with the Department of Labor and Employment (DOLE) or the National Labor Relations Commission (NLRC).",
  documents: ["Complaint for Illegal Dismissal", "Position Paper", "Affidavit of Witnesses"],
  lawyers: [
    { id: "1", name: "Atty. Maria Santos", specialization: "Labor Law", rating: 4.8 },
    { id: "2", name: "Atty. Juan Reyes", specialization: "Employment Law", rating: 4.9 },
    { id: "3", name: "Atty. Ana Garcia", specialization: "Labor Relations", rating: 4.7 },
  ],
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm your AI legal assistant. I can help you understand Philippine law, generate legal documents, and connect you with qualified lawyers. What legal issue can I help you with today?",
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
    }

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "ai",
      content: mockLegalResponse.advice,
      documents: mockLegalResponse.documents,
      lawyers: mockLegalResponse.lawyers,
    }

    setMessages((prev) => [...prev, userMessage, aiMessage])
    setInput("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <Scale className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">LegalAI PH</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/lawyers">
                <Button variant="ghost">Browse Lawyers</Button>
              </Link>
              <Button variant="outline">Profile</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        {/* Chat Messages */}
        <div className="space-y-4 mb-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex items-start space-x-3 max-w-3xl ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === "user" ? "bg-blue-600" : "bg-gray-600"
                  }`}
                >
                  {message.type === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`rounded-lg p-4 ${
                    message.type === "user" ? "bg-blue-600 text-white" : "bg-white border shadow-sm"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>

                  {/* Required Documents Section */}
                  {message.documents && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Required Documents
                      </h4>
                      <div className="space-y-2">
                        {message.documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm text-blue-800">{doc}</span>
                            <Button size="sm" variant="outline" className="text-xs">
                              <Download className="w-3 h-3 mr-1" />
                              Generate
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommended Lawyers Section */}
                  {message.lawyers && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Recommended Lawyers</h4>
                      <div className="space-y-2">
                        {message.lawyers.map((lawyer) => (
                          <div key={lawyer.id} className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium text-green-800">{lawyer.name}</div>
                              <div className="text-xs text-green-600">
                                {lawyer.specialization} • ⭐ {lawyer.rating}
                              </div>
                            </div>
                            <Link href={`/lawyers/${lawyer.id}`}>
                              <Button size="sm" variant="outline" className="text-xs">
                                View Profile
                              </Button>
                            </Link>
                          </div>
                        ))}
                      </div>
                      <Link href="/lawyers">
                        <Button variant="link" className="text-xs text-green-600 p-0 mt-2">
                          View all lawyers →
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <Card>
          <CardContent className="p-4">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your legal problem... (e.g., 'I was fired without notice from my job')"
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button onClick={handleSend}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="secondary" className="cursor-pointer text-xs">
                Employment Issues
              </Badge>
              <Badge variant="secondary" className="cursor-pointer text-xs">
                Contract Disputes
              </Badge>
              <Badge variant="secondary" className="cursor-pointer text-xs">
                Family Law
              </Badge>
              <Badge variant="secondary" className="cursor-pointer text-xs">
                Criminal Defense
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Document Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600 mb-3">Generate common legal documents</p>
              <Button size="sm" variant="outline" className="w-full">
                Browse Templates
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Legal Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600 mb-3">Learn about Philippine laws</p>
              <Button size="sm" variant="outline" className="w-full">
                View Resources
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Emergency Legal Aid</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600 mb-3">Urgent legal assistance</p>
              <Button size="sm" variant="outline" className="w-full">
                Get Help Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
