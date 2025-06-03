"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Scale, Send, FileText, Download, User, Bot, Loader2 } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

interface Message {
  id: string
  type: "user" | "ai" | "loading"
  content: string
  documents?: string[]
  lawyers?: Array<{
    id: string
    name: string
    specialization: string
    rating: number
  }>
}

interface DocumentGenerationState {
  isGenerating: boolean
  documentType: string | null
  progress: number
  isComplete: boolean
  documentContent?: string
}

// Bryan's specific legal response
const bryanLegalResponse = {
  advice: `Based on your situation, Bryan, you're dealing with two separate but related labor issues under Philippine law:

1. **Unpaid Salary**: Under the Labor Code of the Philippines (Presidential Decree No. 442), specifically Articles 128 and 129, employers are required to pay employees their wages on time and in full. The Department of Labor and Employment (DOLE) has jurisdiction over unpaid wage claims.

2. **Unjust Termination**: Article 279 (now Article 294) of the Labor Code protects employees from being dismissed without just or authorized causes. If you were terminated without due process or valid reason, this constitutes illegal dismissal.

You have the right to file complaints with DOLE for both issues. For the unpaid salary, you can file a money claim, and for the unjust termination, you can file an illegal dismissal case with the National Labor Relations Commission (NLRC).`,
  documents: [
    "Demand Letter for Unpaid Wages and Illegal Dismissal",
    "DOLE Single Entry Approach (SEnA) Request Form",
    "NLRC Complaint Form for Illegal Dismissal",
    "Affidavit of Circumstances of Termination",
  ],
  aiGeneratedDocuments: ["Demand Letter for Unpaid Wages and Illegal Dismissal"],
  lawyers: [
    { id: "1", name: "Atty. Maria Santos", specialization: "Labor Law", rating: 4.8 },
    { id: "2", name: "Atty. Juan Reyes", specialization: "Employment Law", rating: 4.9 },
    { id: "3", name: "Atty. Ana Garcia", specialization: "Labor Relations", rating: 4.7 },
  ],
  demandLetterContent: `
DEMAND LETTER

[DATE]

[EMPLOYER NAME]
[COMPANY NAME]
[COMPANY ADDRESS]

SUBJECT: DEMAND FOR PAYMENT OF UNPAID WAGES AND REINSTATEMENT

Dear Sir/Madam:

I, Bryan [Last Name], am writing this letter to formally demand the payment of my unpaid wages and my reinstatement to my position as [POSITION] in your company, where I was employed from [START DATE] until my unjust termination on [TERMINATION DATE].

UNPAID WAGES:
As of the date of my termination, I have not received my salary for the period of [UNPAID PERIOD], amounting to [AMOUNT]. This is in direct violation of the Labor Code of the Philippines, specifically Articles 128 and 129, which mandate the timely and complete payment of wages to employees.

UNJUST TERMINATION:
Furthermore, I was terminated from my position without just or authorized cause and without due process, in violation of Article 294 (formerly Article 279) of the Labor Code. I was not provided with a written notice stating the cause of my termination, nor was I given an opportunity to explain my side.

DEMAND:
In light of the above, I am demanding the following:

1. Immediate payment of my unpaid wages amounting to [AMOUNT]
2. Reinstatement to my former position without loss of seniority rights
3. Payment of backwages from the date of my termination until actual reinstatement

I am giving you five (5) days from receipt of this letter to comply with my demands. Should you fail to do so, I will be constrained to take appropriate legal action, including but not limited to filing complaints with the Department of Labor and Employment (DOLE) and the National Labor Relations Commission (NLRC).

I hope for your immediate and favorable response to avoid any legal proceedings.

Sincerely,

Bryan [Last Name]
[CONTACT NUMBER]
[EMAIL ADDRESS]
  `,
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello Bryan! I'm your AI legal assistant. I can help you understand Philippine labor laws, generate legal documents, and connect you with qualified lawyers. What specific legal issue can I help you with today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [documentGeneration, setDocumentGeneration] = useState<DocumentGenerationState>({
    isGenerating: false,
    documentType: null,
    progress: 0,
    isComplete: false,
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Progress bar animation for document generation
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (documentGeneration.isGenerating && documentGeneration.progress < 100) {
      interval = setInterval(() => {
        setDocumentGeneration((prev) => {
          const newProgress = prev.progress + 5
          if (newProgress >= 100) {
            clearInterval(interval)
            return {
              ...prev,
              progress: 100,
              isComplete: true,
              documentContent: bryanLegalResponse.demandLetterContent,
            }
          }
          return { ...prev, progress: newProgress }
        })
      }, 150)
    }

    return () => clearInterval(interval)
  }, [documentGeneration.isGenerating, documentGeneration.progress])

  const handleSend = () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
    }

    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "loading",
      content: "Analyzing your labor law issue...",
    }

    setMessages((prev) => [...prev, userMessage, loadingMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: "ai",
        content: bryanLegalResponse.advice,
        documents: bryanLegalResponse.documents,
        lawyers: bryanLegalResponse.lawyers,
      }

      setMessages((prev) => {
        // Remove loading message and add AI response
        const withoutLoading = prev.filter((msg) => msg.type !== "loading")
        return [...withoutLoading, aiMessage]
      })
      setIsLoading(false)
    }, 3000) // 3 second delay
  }

  const handleGenerateDocument = (documentType: string) => {
    setDocumentGeneration({
      isGenerating: true,
      documentType,
      progress: 0,
      isComplete: false,
    })
  }

  const closeDocumentDialog = () => {
    setDocumentGeneration({
      isGenerating: false,
      documentType: null,
      progress: 0,
      isComplete: false,
    })
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
        <div className="space-y-4 mb-6 max-h-[calc(100vh-300px)] overflow-y-auto">
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
                  ) : message.type === "loading" ? (
                    <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`rounded-lg p-4 ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : message.type === "loading"
                        ? "bg-gray-100 border shadow-sm animate-pulse"
                        : "bg-white border shadow-sm"
                  }`}
                >
                  <p className={`text-sm ${message.type === "loading" ? "text-gray-500 italic" : ""}`}>
                    {message.content}
                  </p>

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
                            {bryanLegalResponse.aiGeneratedDocuments.includes(doc) ? (
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs"
                                onClick={() => handleGenerateDocument(doc)}
                              >
                                <Download className="w-3 h-3 mr-1" />
                                Generate
                              </Button>
                            ) : (
                              <Badge variant="outline" className="text-xs">
                                Manual Preparation
                              </Badge>
                            )}
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
          <div ref={messagesEndRef} />
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
              <Button onClick={handleSend} disabled={isLoading}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge
                variant="secondary"
                className="cursor-pointer text-xs"
                onClick={() => setInput("I was fired without notice and my employer hasn't paid my last salary.")}
              >
                Unpaid Salary
              </Badge>
              <Badge
                variant="secondary"
                className="cursor-pointer text-xs"
                onClick={() => setInput("My employer terminated me without any valid reason.")}
              >
                Unjust Termination
              </Badge>
              <Badge
                variant="secondary"
                className="cursor-pointer text-xs"
                onClick={() => setInput("I'm being forced to work overtime without compensation.")}
              >
                Unpaid Overtime
              </Badge>
              <Badge
                variant="secondary"
                className="cursor-pointer text-xs"
                onClick={() => setInput("I'm experiencing workplace harassment.")}
              >
                Workplace Harassment
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
              <p className="text-xs text-gray-600 mb-3">Learn about Philippine labor laws</p>
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
              <p className="text-xs text-gray-600 mb-3">Urgent labor dispute assistance</p>
              <Button size="sm" variant="outline" className="w-full">
                Get Help Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Document Generation Dialog */}
      <Dialog open={documentGeneration.isGenerating} onOpenChange={closeDocumentDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {documentGeneration.isComplete
                ? "Document Generated Successfully"
                : `Generating ${documentGeneration.documentType}`}
            </DialogTitle>
            <DialogDescription>
              {documentGeneration.isComplete
                ? "Your document is ready for download or editing."
                : "Please wait while we prepare your legal document..."}
            </DialogDescription>
          </DialogHeader>

          {!documentGeneration.isComplete ? (
            <div className="py-6">
              <div className="flex items-center justify-center mb-4">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${documentGeneration.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>Analyzing case details</span>
                <span>{documentGeneration.progress}%</span>
              </div>
            </div>
          ) : (
            <div className="py-4">
              <div className="bg-gray-50 p-4 rounded-md border max-h-[400px] overflow-y-auto font-mono text-sm whitespace-pre-wrap">
                {documentGeneration.documentContent}
              </div>
            </div>
          )}

          <DialogFooter>
            {documentGeneration.isComplete && (
              <>
                <Button variant="outline" onClick={closeDocumentDialog}>
                  Close
                </Button>
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Download Document
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
