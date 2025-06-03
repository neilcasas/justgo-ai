"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Scale,
  Send,
  FileText,
  Download,
  User,
  Bot,
  Loader2,
  Upload,
  X,
  File,
} from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";
interface Message {
  id: string;
  type: "user" | "ai" | "loading";
  content: string;
  documents?: {
    required: string[];
    aiGenerated: string[];
  };
  lawyers?: Array<{
    id: string;
    name: string;
    specialization: string;
    rating: number;
  }>;
}

interface DocumentGenerationState {
  isOpen: boolean;
  documentType: string | null;
  isGenerating: boolean;
  progress: number;
  isComplete: boolean;
  documentContent?: string;
  uploadedFiles: File[];
  showFileUpload: boolean;
}

// Bryan's specific legal response
const bryanLegalResponse = {
  advice: `Hello Bryan, I've analyzed your situation regarding unpaid salary and unjust termination. Based on Philippine labor laws, here's my assessment:

**LEGAL ANALYSIS:**

1. **Unpaid Salary Violation**: Under Article 103 of the Labor Code of the Philippines (Presidential Decree No. 442), wages must be paid at least once every two weeks or twice a month. Your employer's failure to pay your salary constitutes a violation of this provision.

2. **Unjust Termination**: Article 294 (formerly Article 279) of the Labor Code provides security of tenure to employees. Termination without just or authorized cause and without due process constitutes illegal dismissal.

3. **Due Process Requirements**: Article 292 requires employers to follow procedural due process - written notice specifying grounds for termination and opportunity to be heard.

**YOUR LEGAL REMEDIES:**
- File a complaint with DOLE for unpaid wages (money claims)
- File an illegal dismissal case with NLRC
- Seek reinstatement with full backwages
- Claim moral and exemplary damages

**JURISDICTION:**
- DOLE: Money claims up to ₱5,000 per employee
- NLRC: Illegal dismissal cases and higher money claims

You have strong grounds for both complaints, Bryan. The law is clearly on your side.`,

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

Date: [Current Date]

[EMPLOYER NAME]
[POSITION/TITLE]
[COMPANY NAME]
[COMPANY ADDRESS]

Dear Sir/Madam:

SUBJECT: DEMAND FOR PAYMENT OF UNPAID WAGES AND REINSTATEMENT DUE TO ILLEGAL DISMISSAL

I am BRYAN [SURNAME], former employee of [COMPANY NAME], where I worked as [POSITION] from [START DATE] until my illegal termination on [TERMINATION DATE].

I am writing this formal demand letter to address two serious violations of the Labor Code of the Philippines:

I. UNPAID WAGES

As of my termination date, I have not received my salary for the following period(s):
- [SPECIFY UNPAID PERIOD]
- Total Amount Due: ₱[AMOUNT]

This constitutes a clear violation of Article 103 of the Labor Code, which mandates payment of wages at least once every two weeks or twice a month.

II. ILLEGAL DISMISSAL

I was terminated from my employment without:
1. Just or authorized cause as enumerated in Articles 297-298 of the Labor Code
2. Due process as required under Article 292 (written notice and opportunity to be heard)

This termination violates Article 294 of the Labor Code, which guarantees security of tenure to all employees.

DEMANDS:

Based on the foregoing violations, I hereby demand:

1. IMMEDIATE PAYMENT of my unpaid wages amounting to ₱[AMOUNT]
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

BRYAN [SURNAME]
[CONTACT NUMBER]
[EMAIL ADDRESS]
[SIGNATURE OVER PRINTED NAME]

RECEIVED BY:
_________________________
Signature over Printed Name
Position/Title
Date: _______________

---
Note: This demand letter was generated by JustGo PH based on the uploaded documents and case details provided. Please review and customize as needed before sending.`,
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm your AI legal assistant specializing in Philippine labor law. I can help you understand your rights, generate legal documents, and connect you with qualified lawyers. What specific workplace issue can I help you with today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [documentGeneration, setDocumentGeneration] =
    useState<DocumentGenerationState>({
      isOpen: false,
      documentType: null,
      isGenerating: false,
      progress: 0,
      isComplete: false,
      uploadedFiles: [],
      showFileUpload: false,
    });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Progress bar animation for document generation
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (documentGeneration.isGenerating && documentGeneration.progress < 100) {
      interval = setInterval(() => {
        setDocumentGeneration((prev) => {
          const newProgress = prev.progress + 8;
          if (newProgress >= 100) {
            clearInterval(interval);
            return {
              ...prev,
              progress: 100,
              isComplete: true,
              documentContent: bryanLegalResponse.demandLetterContent,
            };
          }
          return { ...prev, progress: newProgress };
        });
      }, 200);
    }

    return () => clearInterval(interval);
  }, [documentGeneration.isGenerating, documentGeneration.progress]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
    };

    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "loading",
      content:
        "Analyzing your labor law case and reviewing relevant Philippine employment laws...",
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setInput("");
    setIsLoading(true);

    // Check if this is Bryan's specific case about unpaid salary and unjust termination
    const isBryanCase =
      input.toLowerCase().includes("unpaid") &&
      (input.toLowerCase().includes("salary") ||
        input.toLowerCase().includes("wage")) &&
      (input.toLowerCase().includes("fired") ||
        input.toLowerCase().includes("terminated") ||
        input.toLowerCase().includes("dismissal"));

    // Simulate AI analysis delay
    setTimeout(() => {
      let aiResponse: Message;

      if (isBryanCase) {
        // Bryan's specific case response
        aiResponse = {
          id: (Date.now() + 2).toString(),
          type: "ai",
          content: bryanLegalResponse.advice,
          documents: bryanLegalResponse.documents,
          lawyers: bryanLegalResponse.lawyers,
        };
      } else {
        // Generic response for other queries
        aiResponse = {
          id: (Date.now() + 2).toString(),
          type: "ai",
          content:
            "I understand your concern. Based on your question, I recommend consulting with one of our qualified labor law specialists who can provide more specific guidance for your unique situation. Could you provide more details about your specific workplace issue so I can give you more targeted advice?",
          lawyers: bryanLegalResponse.lawyers,
        };
      }

      setMessages((prev) => {
        const withoutLoading = prev.filter((msg) => msg.type !== "loading");
        return [...withoutLoading, aiResponse];
      });
      setIsLoading(false);
    }, 4000);
  };

  const handleGenerateDocument = (documentType: string) => {
    setDocumentGeneration({
      isOpen: true,
      documentType,
      isGenerating: false,
      progress: 0,
      isComplete: false,
      uploadedFiles: [],
      showFileUpload: true,
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setDocumentGeneration((prev) => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...files],
    }));
  };

  const removeFile = (index: number) => {
    setDocumentGeneration((prev) => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index),
    }));
  };

  const startDocumentGeneration = () => {
    setDocumentGeneration((prev) => ({
      ...prev,
      isGenerating: true,
      showFileUpload: false,
      progress: 0,
    }));
  };

  const closeDocumentDialog = () => {
    setDocumentGeneration({
      isOpen: false,
      documentType: null,
      isGenerating: false,
      progress: 0,
      isComplete: false,
      uploadedFiles: [],
      showFileUpload: false,
    });
  };

  const downloadDocument = () => {
    const element = document.createElement("a");
    const file = new Blob([documentGeneration.documentContent || ""], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${documentGeneration.documentType?.replace(
      /\s+/g,
      "_"
    )}_Bryan.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-1">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="JustGo Logo"
                width={150}
                height={60}
              />
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
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start space-x-3 max-w-3xl ${
                  message.type === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
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
                  <p
                    className={`text-sm whitespace-pre-line ${
                      message.type === "loading" ? "text-gray-500 italic" : ""
                    }`}
                  >
                    {message.content}
                  </p>

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
                            <div
                              key={index}
                              className="flex items-center text-sm text-amber-800"
                            >
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
                            <div
                              key={index}
                              className="flex items-center justify-between"
                            >
                              <span className="text-sm text-blue-800">
                                {doc}
                              </span>
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
                      <h4 className="font-semibold text-green-900 mb-2">
                        Recommended Labor Law Specialists
                      </h4>
                      <div className="space-y-2">
                        {message.lawyers.map((lawyer) => (
                          <div
                            key={lawyer.id}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <div className="text-sm font-medium text-green-800">
                                {lawyer.name}
                              </div>
                              <div className="text-xs text-green-600">
                                {lawyer.specialization} • ⭐ {lawyer.rating}
                              </div>
                            </div>
                            <Link href={`/lawyers/${lawyer.id}`}>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs"
                              >
                                View Profile
                              </Button>
                            </Link>
                          </div>
                        ))}
                      </div>
                      <Link href="/lawyers">
                        <Button
                          variant="link"
                          className="text-xs text-green-600 p-0 mt-2"
                        >
                          View all labor lawyers →
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
                placeholder="Describe your legal problem... (e.g., 'I was fired without notice and my employer hasn't paid my salary')"
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
                onClick={() =>
                  setInput(
                    "I was fired without notice and my employer hasn't paid my last salary. What are my rights?"
                  )
                }
              >
                Unpaid Salary & Termination
              </Badge>
              <Badge
                variant="secondary"
                className="cursor-pointer text-xs"
                onClick={() =>
                  setInput(
                    "My employer terminated me without any valid reason and due process."
                  )
                }
              >
                Illegal Dismissal
              </Badge>
              <Badge
                variant="secondary"
                className="cursor-pointer text-xs"
                onClick={() =>
                  setInput(
                    "I'm being forced to work overtime without compensation."
                  )
                }
              >
                Unpaid Overtime
              </Badge>
              <Badge
                variant="secondary"
                className="cursor-pointer text-xs"
                onClick={() =>
                  setInput(
                    "I'm experiencing workplace harassment from my supervisor."
                  )
                }
              >
                Workplace Harassment
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Document Generation Dialog */}
      <Dialog
        open={documentGeneration.isOpen}
        onOpenChange={closeDocumentDialog}
      >
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
                  Upload employment contract, payslips, termination letter, or
                  other relevant documents
                </p>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload files or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">
                    PDF, DOC, DOCX, JPG, PNG (Max 10MB each)
                  </p>
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
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded border"
                    >
                      <div className="flex items-center space-x-2">
                        <File className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-700">
                          {file.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFile(index)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Generation Progress */}
          {documentGeneration.isGenerating &&
            !documentGeneration.isComplete && (
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
  );
}
