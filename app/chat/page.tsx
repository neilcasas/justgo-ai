"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Send,
  FileText,
  Download,
  User,
  Bot,
  Loader2,
  Upload,
  X,
  File,
  Menu,
  MessageSquare,
  Plus,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import Image from "next/image"

interface Message {
  id: string
  type: "user" | "ai" | "loading"
  content: string
  documents?: {
    required: string[]
    aiGenerated: string[]
  }
  lawyers?: Array<{
    id: string
    name: string
    specialization: string
    rating: number
  }>
}

interface DocumentGenerationState {
  isOpen: boolean
  documentType: string | null
  isGenerating: boolean
  progress: number
  isComplete: boolean
  documentContent?: string
  uploadedFiles: File[]
  showFileUpload: boolean
}

interface ChatHistory {
  id: string
  title: string
  date: string
  preview: string
}

// Mock chat history data
const mockChatHistory: ChatHistory[] = [
  {
    id: "1",
    title: "Unpaid Salary & Illegal Dismissal",
    date: "Today",
    preview: "I was fired without notice and my employer hasn't paid my last salary...",
  },
  {
    id: "2",
    title: "Employment Contract Review",
    date: "Yesterday",
    preview: "Can you help me review my employment contract terms...",
  },
  {
    id: "3",
    title: "Overtime Pay Dispute",
    date: "2 days ago",
    preview: "My employer is not paying overtime despite working 12 hours...",
  },
  {
    id: "4",
    title: "Workplace Harassment Case",
    date: "1 week ago",
    preview: "I'm experiencing harassment from my supervisor and need legal advice...",
  },
  {
    id: "5",
    title: "Resignation Letter Template",
    date: "1 week ago",
    preview: "I need help drafting a resignation letter with proper notice...",
  },
  {
    id: "6",
    title: "13th Month Pay Inquiry",
    date: "2 weeks ago",
    preview: "When should I receive my 13th month pay and how is it calculated...",
  },
]

// Bryan's specific legal response
const bryanLegalResponse = {
  advice: `Hello Bryan, I've analyzed your situation regarding unpaid salary and unjust termination. Based on Philippine labor laws, here's my assessment:

<div class="space-y-4">
  <div>
    <h3 class="font-bold text-gray-900 mb-2">LEGAL ANALYSIS:</h3>
    <ol class="list-decimal pl-5 space-y-3">
      <li>
        <span class="font-medium">Unpaid Salary Violation:</span> Under <a href="https://blr.dole.gov.ph/2014/12/11/book-three-conditions-of-employment/" target="_blank" class="text-blue-600 hover:underline">Article 103 of the Labor Code of the Philippines</a> (Presidential Decree No. 442), wages must be paid at least once every two weeks or twice a month. Your employer's failure to pay your salary constitutes a violation of this provision.
      </li>
      <li>
        <span class="font-medium">Unjust Termination:</span> <a href="https://blr.dole.gov.ph/2014/12/11/book-six-post-employment/" target="_blank" class="text-blue-600 hover:underline">Article 294 (formerly Article 279)</a> of the Labor Code provides security of tenure to employees. Termination without just or authorized cause and without due process constitutes illegal dismissal.
      </li>
      <li>
        <span class="font-medium">Due Process Requirements:</span> <a href="https://blr.dole.gov.ph/2014/12/11/book-six-post-employment/" target="_blank" class="text-blue-600 hover:underline">Article 292</a> requires employers to follow procedural due process - written notice specifying grounds for termination and opportunity to be heard.
      </li>
    </ol>
  </div>

  <div>
    <h3 class="font-bold text-gray-900 mb-2">YOUR LEGAL REMEDIES:</h3>
    <ul class="list-disc pl-5 space-y-1">
      <li>File a complaint with <a href="https://www.dole.gov.ph/sena/" target="_blank" class="text-blue-600 hover:underline">DOLE</a> for unpaid wages (money claims)</li>
      <li>File an illegal dismissal case with <a href="https://nlrc.dole.gov.ph/" target="_blank" class="text-blue-600 hover:underline">NLRC</a></li>
      <li>Seek reinstatement with full backwages</li>
      <li>Claim moral and exemplary damages</li>
    </ul>
  </div>

  <div>
    <h3 class="font-bold text-gray-900 mb-2">JURISDICTION:</h3>
    <ul class="list-disc pl-5 space-y-1">
      <li><a href="https://www.dole.gov.ph/" target="_blank" class="text-blue-600 hover:underline">DOLE</a>: Money claims up to ₱5,000 per employee</li>
      <li><a href="https://nlrc.dole.gov.ph/" target="_blank" class="text-blue-600 hover:underline">NLRC</a>: Illegal dismissal cases and higher money claims</li>
    </ul>
  </div>
</div>

<p class="mt-4 font-medium">You have strong grounds for both complaints, Bryan. The law is clearly on your side.</p>`,

  documents: {
    required: [
      "Employment Contract or Job Offer Letter",
      "Company ID or Employment Certificate",
      "Payslips or Salary Records",
      "Termination Letter or Notice (if any)",
      "Witnesses' Contact Information",
      "Bank Statements showing salary deposits",
    ],
    aiGenerated: [
      "Demand Letter for Unpaid Wages and Illegal Dismissal",
      "DOLE Complaint Form (SENA Request)",
      "NLRC Position Paper Draft",
      "Affidavit of Illegal Dismissal",
    ],
  },

  lawyers: [
    {
      id: "1",
      name: "Atty. Maria Santos",
      specialization: "Labor Law",
      rating: 4.8,
    },
    {
      id: "2",
      name: "Atty. Juan Reyes",
      specialization: "Employment Law",
      rating: 4.9,
    },
    {
      id: "3",
      name: "Atty. Ana Garcia",
      specialization: "Labor Relations",
      rating: 4.7,
    },
  ],

  demandLetterContent: `DEMAND LETTER

Date: July 15, 2025

[EMPLOYER NAME]
[POSITION/TITLE]
ACME CO.
QUEZON CITY, PHILIPPINES

Dear Sir/Madam:

SUBJECT: DEMAND FOR PAYMENT OF UNPAID WAGES AND REINSTATEMENT DUE TO ILLEGAL DISMISSAL

I am BRYAN MAZINO, former employee of ACME CO., where I worked as FAST FOOD WORKER from MAY 19, 2023 until my illegal termination on JUNE 15, 2025.

I am writing this formal demand letter to address two serious violations of the Labor Code of the Philippines:

I. UNPAID WAGES

As of my termination date, I have not received my salary for the following period(s):
- APRIL 1, 2025 to JUNE 15, 2025 
- Total Amount Due: ₱26,000

This constitutes a clear violation of Article 103 of the Labor Code, which mandates payment of wages at least once every two weeks or twice a month.

II. ILLEGAL DISMISSAL

I was terminated from my employment without:
1. Just or authorized cause as enumerated in Articles 297-298 of the Labor Code
2. Due process as required under Article 292 (written notice and opportunity to be heard)

This termination violates Article 294 of the Labor Code, which guarantees security of tenure to all employees.

DEMANDS:

Based on the foregoing violations, I hereby demand:

1. IMMEDIATE PAYMENT of my unpaid wages amounting to ₱26,000
2. REINSTATEMENT to my former position without loss of seniority rights and other benefits
3. PAYMENT OF BACKWAGES from the date of illegal dismissal until actual reinstatement
4. PAYMENT OF 13th MONTH PAY and other monetary benefits due
5. MORAL AND EXEMPLARY DAMAGES for the mental anguish and suffering caused

LEGAL BASIS:
- Presidential Decree No. 442 (Labor Code of the Philippines)
- Articles 103, 292, 294, 297-298
- DOLE Department Order No. 147-15
- Relevant jurisprudence on illegal dismissal

I am giving you FIVE (5) CALENDAR DAYS from receipt of this letter to comply with the above demands. Failure to do so will constrain me to:

1. File appropriate complaints with the Department of Labor and Employment (DOLE)
2. File an illegal dismissal case with the National Labor Relations Commission (NLRC)
3. Pursue all legal remedies available under the law
4. Seek attorney's fees and litigation expenses

I trust that you will give this matter your immediate attention to avoid unnecessary legal proceedings.

Very truly yours,

BRYAN MAZINO
+63 912 345 6789
STA. MESA HEIGHTS, QUEZON CITY, PHILIPPINES
[SIGNATURE OVER PRINTED NAME]

RECEIVED BY:
_________________________
Signature over Printed Name
Position/Title
Date: _______________

---
Note: This demand letter was generated by JustGo PH based on the uploaded documents and case details provided. Please review and customize as needed before sending.`,
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm your AI legal assistant specializing in Philippine labor law. I can help you understand your rights, generate legal documents, and connect you with qualified lawyers. What specific workplace issue can I help you with today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [documentGeneration, setDocumentGeneration] = useState<DocumentGenerationState>({
    isOpen: false,
    documentType: null,
    isGenerating: false,
    progress: 0,
    isComplete: false,
    uploadedFiles: [],
    showFileUpload: false,
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [chatFiles, setChatFiles] = useState<File[]>([])
  const chatFileInputRef = useRef<HTMLInputElement>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>(mockChatHistory)

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
          const newProgress = prev.progress + 8
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
      }, 200)
    }

    return () => clearInterval(interval)
  }, [documentGeneration.isGenerating, documentGeneration.progress])

  const handleChatFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setChatFiles((prev) => [...prev, ...files])
  }

  const removeChatFile = (index: number) => {
    setChatFiles((prev) => prev.filter((_, i) => i !== index))
  }

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
      content: "Analyzing your case and reviewing relevant Philippine laws...",
    }

    setMessages((prev) => [...prev, userMessage, loadingMessage])
    setInput("")
    setChatFiles([]) // Clear uploaded files after sending
    setIsLoading(true)

    // Check if this is Bryan's specific case about unpaid salary and unjust termination
    const isBryanCase =
      input.toLowerCase().includes("unpaid") &&
      (input.toLowerCase().includes("salary") || input.toLowerCase().includes("wage")) &&
      (input.toLowerCase().includes("fired") ||
        input.toLowerCase().includes("terminated") ||
        input.toLowerCase().includes("dismissal"))

    // Simulate AI analysis delay
    setTimeout(() => {
      let aiResponse: Message

      if (isBryanCase) {
        // Bryan's specific case response
        aiResponse = {
          id: (Date.now() + 2).toString(),
          type: "ai",
          content: bryanLegalResponse.advice,
          documents: bryanLegalResponse.documents,
          lawyers: bryanLegalResponse.lawyers,
        }
      } else {
        // Generic response for other queries
        aiResponse = {
          id: (Date.now() + 2).toString(),
          type: "ai",
          content:
            "I understand your concern. Based on your question, I recommend consulting with one of our qualified labor law specialists who can provide more specific guidance for your unique situation. Could you provide more details about your specific workplace issue so I can give you more targeted advice?",
          lawyers: bryanLegalResponse.lawyers,
        }
      }

      setMessages((prev) => {
        const withoutLoading = prev.filter((msg) => msg.type !== "loading")
        return [...withoutLoading, aiResponse]
      })
      setIsLoading(false)
    }, 4000)
  }

  const handleGenerateDocument = (documentType: string) => {
    setDocumentGeneration({
      isOpen: true,
      documentType,
      isGenerating: false,
      progress: 0,
      isComplete: false,
      uploadedFiles: [],
      showFileUpload: true,
    })
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setDocumentGeneration((prev) => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...files],
    }))
  }

  const removeFile = (index: number) => {
    setDocumentGeneration((prev) => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index),
    }))
  }

  const startDocumentGeneration = () => {
    setDocumentGeneration((prev) => ({
      ...prev,
      isGenerating: true,
      showFileUpload: false,
      progress: 0,
    }))
  }

  const closeDocumentDialog = () => {
    setDocumentGeneration({
      isOpen: false,
      documentType: null,
      isGenerating: false,
      progress: 0,
      isComplete: false,
      uploadedFiles: [],
      showFileUpload: false,
    })
  }

  const downloadDocument = () => {
    const element = document.createElement("a")
    const file = new Blob([documentGeneration.documentContent || ""], {
      type: "text/plain",
    })
    element.href = URL.createObjectURL(file)
    element.download = `${documentGeneration.documentType?.replace(/\s+/g, "_")}_Bryan.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const startNewChat = () => {
    setMessages([
      {
        id: "1",
        type: "ai",
        content:
          "Hello! I'm your AI legal assistant specializing in Philippine labor law. I can help you understand your rights, generate legal documents, and connect you with qualified lawyers. What specific workplace issue can I help you with today?",
      },
    ])
    setInput("")
    setChatFiles([])
    setSidebarOpen(false)
  }

  const loadChatHistory = (historyItem: ChatHistory) => {
    // In a real app, this would load the actual conversation
    // For now, we'll just show a placeholder
    setMessages([
      {
        id: "1",
        type: "user",
        content: historyItem.preview,
      },
      {
        id: "2",
        type: "ai",
        content:
          "This is a previous conversation. The full chat history would be loaded here in a real implementation.",
      },
    ])
    setSidebarOpen(false)
  }

  const deleteChatHistory = (historyId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setChatHistory((prev) => prev.filter((item) => item.id !== historyId))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:relative z-30 w-64 bg-white border-r border-gray-200 h-full transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200">
            <Button onClick={startNewChat} className="w-full justify-start" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-2">
            <div className="space-y-1">
              {chatHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => loadChatHistory(item)}
                  className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-1">
                      <MessageSquare className="w-3 h-3 text-gray-400 mr-2 flex-shrink-0" />
                      <h4 className="text-sm font-medium text-gray-900 truncate">{item.title}</h4>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{item.preview}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => deleteChatHistory(item.id, e)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 ml-2"
                  >
                    <Trash2 className="h-3 w-3 text-gray-400 hover:text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Bryan Mazino</p>
                <p className="text-xs text-gray-500">Free Plan</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-1">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden mr-2"
                >
                  <Menu className="w-4 h-4" />
                </Button>
                <Link href="/" className="flex items-center">
                  <Image src="/logo.png" alt="JustGo Logo" width={150} height={60} />
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/lawyers">
                  <Button variant="ghost">Browse Lawyers</Button>
                </Link>
                <Button variant="outline">Profile</Button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 max-w-4xl mx-auto w-full p-4">
          {/* Chat Messages */}
          <div className="space-y-4 mb-6 max-h-[calc(100vh-250px)] overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-start space-x-3 max-w-3xl ${
                    message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
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
                    {message.type === "loading" ? (
                      <p className="text-sm whitespace-pre-line text-gray-500 italic">{message.content}</p>
                    ) : (
                      <div className="text-sm" dangerouslySetInnerHTML={{ __html: message.content }} />
                    )}

                    {/* Documents Section */}
                    {message.documents && (
                      <div className="mt-4 space-y-4">
                        {/* Required Documents */}
                        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                          <h4 className="font-semibold text-amber-900 mb-2 flex items-center">
                            <FileText className="w-4 h-4 mr-2" />
                            Documents You Need to Provide
                          </h4>
                          <div className="space-y-1">
                            {message.documents.required.map((doc, index) => (
                              <div key={index} className="flex items-center text-sm text-amber-800">
                                <span className="w-2 h-2 bg-amber-600 rounded-full mr-2 flex-shrink-0"></span>
                                {doc}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* AI Generated Documents */}
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                            <Bot className="w-4 h-4 mr-2" />
                            Documents AI Can Generate for You
                          </h4>
                          <div className="space-y-2">
                            {message.documents.aiGenerated.map((doc, index) => (
                              <div key={index} className="flex items-center justify-between">
                                <span className="text-sm text-blue-800">{doc}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs"
                                  onClick={() => handleGenerateDocument(doc)}
                                >
                                  <Download className="w-3 h-3 mr-1" />
                                  Generate
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Recommended Lawyers Section */}
                    {message.lawyers && (
                      <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-900 mb-2">Recommended Labor Law Specialists</h4>
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
                            View all labor lawyers →
                          </Button>
                        </Link>
                      </div>
                    )}

                    {/* Disclaimer for AI messages */}
                    {message.type === "ai" && (
                      <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                        <p className="text-xs text-red-700">
                          <strong>⚠️ Legal Disclaimer:</strong> JustGo AI is not a replacement for professional legal
                          advice. This information is for educational purposes only and should not be considered as
                          legal counsel. Please consult with a qualified attorney before making any legal decisions or
                          taking action based on this advice.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <Card className="absolute bottom-0 left-0 lg:left-64 right-0 max-w-4xl mx-auto mb-4">
            <CardContent className="p-4">
              {/* Uploaded Files Display */}
              {chatFiles.length > 0 && (
                <div className="mb-3 space-y-2">
                  <Label className="text-sm font-medium">Attached Files:</Label>
                  <div className="flex flex-wrap gap-2">
                    {chatFiles.map((file, index) => (
                      <div key={index} className="flex items-center space-x-2 bg-gray-100 rounded-md px-2 py-1 text-xs">
                        <File className="h-3 w-3 text-gray-500" />
                        <span className="text-gray-700 max-w-[100px] truncate">{file.name}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeChatFile(index)}
                          className="h-4 w-4 p-0 hover:bg-gray-200"
                        >
                          <X className="h-2 w-2" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <div className="flex-1 flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => chatFileInputRef.current?.click()}
                    className="px-3"
                  >
                    <Upload className="w-4 h-4" />
                  </Button>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe your legal problem... (e.g., 'I was fired without notice and my employer hasn't paid my salary')"
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1"
                  />
                </div>
                <Button onClick={handleSend} disabled={isLoading}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Hidden file input */}
              <input
                ref={chatFileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                onChange={handleChatFileUpload}
                className="hidden"
              />

              <div className="flex flex-wrap gap-2 mt-3">
                <Badge
                  variant="secondary"
                  className="cursor-pointer text-xs"
                  onClick={() =>
                    setInput(
                      "I was fired without notice and my employer hasn't paid my last salary. What are my rights?",
                    )
                  }
                >
                  Unpaid Salary & Termination
                </Badge>
                <Badge
                  variant="secondary"
                  className="cursor-pointer text-xs"
                  onClick={() => setInput("My employer terminated me without any valid reason and due process.")}
                >
                  Illegal Dismissal
                </Badge>
                <Badge
                  variant="secondary"
                  className="cursor-pointer text-xs"
                  onClick={() =>
                    setInput("What are the legal requirements for starting a business in the Philippines?")
                  }
                >
                  Starting a Business
                </Badge>
                <Badge
                  variant="secondary"
                  className="cursor-pointer text-xs"
                  onClick={() => setInput("What laws pertain to animal abuse in the Philippines?")}
                >
                  Animal Abuse
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Document Generation Dialog */}
      <Dialog open={documentGeneration.isOpen} onOpenChange={closeDocumentDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {documentGeneration.isComplete
                ? "Document Generated Successfully"
                : documentGeneration.isGenerating
                  ? `Generating ${documentGeneration.documentType}`
                  : `Generate ${documentGeneration.documentType}`}
            </DialogTitle>
            <DialogDescription>
              {documentGeneration.isComplete
                ? "Your legal document is ready for download and review."
                : documentGeneration.isGenerating
                  ? "Please wait while we analyze your case details and generate your legal document..."
                  : "Upload your supporting documents to help us create a more accurate and personalized legal document."}
            </DialogDescription>
          </DialogHeader>

          {/* File Upload Section */}
          {documentGeneration.showFileUpload && (
            <div className="py-4 space-y-4">
              <div>
                <Label htmlFor="file-upload" className="text-sm font-medium">
                  Upload Supporting Documents (Optional)
                </Label>
                <p className="text-xs text-gray-500 mb-3">
                  Upload employment contract, payslips, termination letter, or other relevant documents
                </p>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload files or drag and drop</p>
                  <p className="text-xs text-gray-400">PDF, DOC, DOCX, JPG, PNG (Max 10MB each)</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Uploaded Files List */}
              {documentGeneration.uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Uploaded Files:</Label>
                  {documentGeneration.uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                      <div className="flex items-center space-x-2">
                        <File className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => removeFile(index)} className="h-6 w-6 p-0">
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Generation Progress */}
          {documentGeneration.isGenerating && !documentGeneration.isComplete && (
            <div className="py-6">
              <div className="flex items-center justify-center mb-4">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${documentGeneration.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>
                  {documentGeneration.progress < 30
                    ? "Analyzing uploaded documents..."
                    : documentGeneration.progress < 60
                      ? "Applying Philippine labor laws..."
                      : documentGeneration.progress < 90
                        ? "Customizing document for your case..."
                        : "Finalizing document..."}
                </span>
                <span>{documentGeneration.progress}%</span>
              </div>
            </div>
          )}

          {/* Generated Document Display */}
          {documentGeneration.isComplete && (
            <div className="py-4">
              <div className="bg-gray-50 p-4 rounded-md border max-h-[400px] overflow-y-auto font-mono text-xs whitespace-pre-wrap">
                {documentGeneration.documentContent}
              </div>
            </div>
          )}

          <DialogFooter>
            {documentGeneration.showFileUpload && (
              <>
                <Button variant="outline" onClick={closeDocumentDialog}>
                  Cancel
                </Button>
                <Button onClick={startDocumentGeneration}>
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Document
                </Button>
              </>
            )}
            {documentGeneration.isComplete && (
              <>
                <Button variant="outline" onClick={closeDocumentDialog}>
                  Close
                </Button>
                <Button onClick={downloadDocument}>
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
