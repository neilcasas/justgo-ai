import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Scale,
  Star,
  MapPin,
  Clock,
  Award,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

// Mock data for multiple lawyer profiles
const lawyerProfiles = {
  "1": {
    id: "maria",
    name: "Atty. Maria Santos",
    specialization: "Labor Law",
    rating: 4.8,
    reviews: 127,
    experience: 12,
    location: "Makati City",
    rate: "₱2,500/hour",
    image: "/placeholder.svg?height=200&width=200",
    phone: "+63 917 123 4567",
    email: "maria.santos@lawfirm.ph",
    description:
      "Atty. Maria Santos is a highly experienced labor law attorney with over 12 years of practice in the Philippines. She specializes in employment disputes, illegal dismissal cases, and labor relations. She has successfully represented hundreds of employees and employers in various labor-related matters.",
    education: [
      "Juris Doctor, University of the Philippines College of Law (2012)",
      "Bachelor of Arts in Political Science, Ateneo de Manila University (2008)",
    ],
    certifications: [
      "Philippine Bar Exam Passer (2012)",
      "Certified Labor Relations Specialist",
      "Member, Integrated Bar of the Philippines",
    ],
    specialties: [
      "Illegal Dismissal",
      "Wage and Hour Disputes",
      "Labor Relations",
      "Employment Contracts",
      "Workplace Harassment",
      "Collective Bargaining",
    ],
    recentCases: [
      {
        title: "Illegal Dismissal Case - Tech Company",
        outcome: "Won",
        year: "2024",
        description:
          "Successfully represented employee in illegal dismissal case, securing full back wages and reinstatement.",
      },
      {
        title: "Wage Dispute - Manufacturing Firm",
        outcome: "Settled",
        year: "2023",
        description:
          "Negotiated favorable settlement for unpaid overtime wages for 50+ employees.",
      },
      {
        title: "Labor Relations - Retail Chain",
        outcome: "Won",
        year: "2023",
        description:
          "Represented company in collective bargaining negotiations, reaching mutually beneficial agreement.",
      },
    ],
    clientReviews: [
      {
        name: "Juan Dela Cruz",
        rating: 5,
        comment:
          "Atty. Santos helped me with my illegal dismissal case. She was professional, knowledgeable, and got me the compensation I deserved.",
        date: "2024-01-15",
      },
      {
        name: "Maria Garcia",
        rating: 5,
        comment:
          "Excellent lawyer! She explained everything clearly and kept me updated throughout the process.",
        date: "2023-12-10",
      },
      {
        name: "Carlos Mendoza",
        rating: 4,
        comment:
          "Very competent and experienced. Would recommend for any labor law issues.",
        date: "2023-11-20",
      },
    ],
  },
  "2": {
    id: "2",
    name: "Atty. Juan Reyes",
    specialization: "Criminal Law",
    rating: 4.9,
    reviews: 89,
    experience: 15,
    location: "Quezon City",
    rate: "₱3,000/hour",
    image: "/placeholder.svg?height=200&width=200",
    phone: "+63 917 234 5678",
    email: "juan.reyes@criminallaw.ph",
    description:
      "Atty. Juan Reyes is a seasoned criminal defense attorney with 15 years of experience in Philippine criminal law. He has successfully defended clients in high-profile cases and has extensive experience in drug cases, theft, and white-collar crimes.",
    education: [
      "Juris Doctor, Ateneo de Manila University School of Law (2009)",
      "Bachelor of Science in Criminology, University of Santo Tomas (2005)",
    ],
    certifications: [
      "Philippine Bar Exam Passer (2009)",
      "Certified Criminal Defense Specialist",
      "Member, Philippine Association of Criminal Lawyers",
    ],
    specialties: [
      "Criminal Defense",
      "Drug Cases",
      "Theft and Robbery",
      "White Collar Crimes",
      "Homicide and Murder",
      "Cybercrime Defense",
    ],
    recentCases: [
      {
        title: "Drug Possession Defense",
        outcome: "Won",
        year: "2024",
        description:
          "Successfully defended client against drug possession charges, case dismissed due to illegal search.",
      },
      {
        title: "Corporate Fraud Case",
        outcome: "Settled",
        year: "2023",
        description:
          "Negotiated plea agreement for corporate executive in fraud case, avoiding jail time.",
      },
      {
        title: "Cybercrime Defense",
        outcome: "Won",
        year: "2023",
        description:
          "Defended client against cybercrime charges, secured acquittal through technical defense.",
      },
    ],
    clientReviews: [
      {
        name: "Roberto Silva",
        rating: 5,
        comment:
          "Atty. Reyes saved my life. His expertise in criminal law is unmatched. Highly recommended!",
        date: "2024-02-10",
      },
      {
        name: "Ana Morales",
        rating: 5,
        comment:
          "Professional and dedicated. He fought hard for my case and achieved the best possible outcome.",
        date: "2024-01-20",
      },
      {
        name: "Miguel Torres",
        rating: 4,
        comment:
          "Excellent criminal lawyer. Very knowledgeable about the law and court procedures.",
        date: "2023-12-15",
      },
    ],
  },
  "3": {
    id: "3",
    name: "Atty. Ana Garcia",
    specialization: "Family Law",
    rating: 4.7,
    reviews: 156,
    experience: 10,
    location: "Manila",
    rate: "₱2,000/hour",
    image: "/placeholder.svg?height=200&width=200",
    phone: "+63 917 345 6789",
    email: "ana.garcia@familylaw.ph",
    description:
      "Atty. Ana Garcia is a compassionate family law attorney with 10 years of experience helping families navigate difficult legal situations. She specializes in divorce, child custody, adoption, and domestic relations cases.",
    education: [
      "Juris Doctor, De La Salle University College of Law (2014)",
      "Bachelor of Arts in Psychology, University of the Philippines Diliman (2010)",
    ],
    certifications: [
      "Philippine Bar Exam Passer (2014)",
      "Certified Family Mediator",
      "Member, Family Law Association of the Philippines",
    ],
    specialties: [
      "Divorce and Annulment",
      "Child Custody",
      "Adoption",
      "Domestic Violence",
      "Property Settlement",
      "Prenuptial Agreements",
    ],
    recentCases: [
      {
        title: "Child Custody Dispute",
        outcome: "Won",
        year: "2024",
        description:
          "Secured primary custody for mother in complex custody dispute involving international elements.",
      },
      {
        title: "Annulment Case",
        outcome: "Won",
        year: "2023",
        description:
          "Successfully obtained annulment for client based on psychological incapacity grounds.",
      },
      {
        title: "Adoption Proceedings",
        outcome: "Won",
        year: "2023",
        description:
          "Facilitated smooth adoption process for family adopting internationally.",
      },
    ],
    clientReviews: [
      {
        name: "Carmen Lopez",
        rating: 5,
        comment:
          "Atty. Garcia was incredibly supportive during my divorce. She made a difficult time much easier.",
        date: "2024-01-25",
      },
      {
        name: "Pedro Ramos",
        rating: 5,
        comment:
          "Helped us with our adoption case. Very patient and understanding throughout the process.",
        date: "2023-12-30",
      },
      {
        name: "Lisa Santos",
        rating: 4,
        comment:
          "Professional and caring. She really understands family dynamics and legal complexities.",
        date: "2023-11-10",
      },
    ],
  },
};

interface LawyerProfilePageProps {
  params: {
    id: string;
  };
}

export default function LawyerProfilePage({ params }: LawyerProfilePageProps) {
  const lawyerProfile =
    lawyerProfiles[params.id as keyof typeof lawyerProfiles];

  if (!lawyerProfile) {
    notFound();
  }

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
              <Link href="/chat">
                <Button variant="ghost">Legal Chat</Button>
              </Link>
              <Link href="/lawyers">
                <Button variant="ghost">Browse Lawyers</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <img
                    src={lawyerProfile.image || "/placeholder.svg"}
                    alt={lawyerProfile.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {lawyerProfile.name}
                    </h1>
                    <Badge variant="secondary" className="mb-4">
                      {lawyerProfile.specialization}
                    </Badge>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-2" />
                        <span className="font-medium">
                          {lawyerProfile.rating}
                        </span>
                        <span className="ml-1">
                          ({lawyerProfile.reviews} reviews)
                        </span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Award className="h-4 w-4 mr-2" />
                        <span>{lawyerProfile.experience} years experience</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{lawyerProfile.location}</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="font-medium text-blue-600">
                          {lawyerProfile.rate}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">
                      {lawyerProfile.description}
                    </p>

                    <div className="flex space-x-3">
                      <Button>
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Consultation
                      </Button>
                      <Button variant="outline">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                      <Button variant="outline">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card>
              <CardHeader>
                <CardTitle>Areas of Practice</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {lawyerProfile.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Cases */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Cases</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {lawyerProfile.recentCases.map((case_, index) => (
                  <div key={index} className="border-l-4 border-blue-600 pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{case_.title}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            case_.outcome === "Won" ? "default" : "secondary"
                          }
                        >
                          {case_.outcome}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {case_.year}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{case_.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Client Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {lawyerProfile.clientReviews.map((review, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{review.name}</span>
                        <div className="flex">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {review.date}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                    {index < lawyerProfile.clientReviews.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{lawyerProfile.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{lawyerProfile.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{lawyerProfile.location}</span>
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {lawyerProfile.education.map((edu, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{edu}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {lawyerProfile.certifications.map((cert, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{cert}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Consultation
                </Button>
                <Button variant="outline" className="w-full">
                  Request Quote
                </Button>
                <Button variant="outline" className="w-full">
                  Save to Favorites
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
