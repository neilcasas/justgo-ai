"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Star, MapPin, Award, Building } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const mockLawyers = [
  {
    id: "1",
    name: "Atty. Maria Santos",
    specialization: "Labor Law",
    organization: "Santos & Associates Law Firm",
    rating: 4.8,
    reviews: 127,
    experience: 12,
    location: "Makati City",
    rate: "₱2,500/hour",
    image:
      "https://images.squarespace-cdn.com/content/v1/541a0730e4b000f167faa35c/1474850119827-CYB63G9V2ALJORH7BXJU/UYeQHpHT.jpeg?format=1000w",
    cases: ["Illegal Dismissal", "Wage Disputes", "Labor Relations"],
    description:
      "Specializes in employment law with extensive experience in labor disputes and employee rights.",
  },
  {
    id: "2",
    name: "Atty. Juan Reyes",
    specialization: "Criminal Law",
    organization: "Public Attorney's Office",
    rating: 4.9,
    reviews: 89,
    experience: 15,
    location: "Quezon City",
    rate: "Free",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ4H58PvehoVhA-9l7dscQFIqJUZr10-uHdg&s",
    cases: ["Criminal Defense", "Drug Cases", "Theft Cases"],
    description:
      "Experienced criminal defense attorney providing free legal services through the Public Attorney's Office.",
  },
  {
    id: "3",
    name: "Atty. Ana Garcia",
    specialization: "Family Law",
    organization: "Garcia Family Law Center",
    rating: 4.7,
    reviews: 156,
    experience: 10,
    location: "Manila",
    rate: "₱2,000/hour",
    image:
      "https://www.manilatimes.net/manilatimes/uploads/images/2023/05/06/188375.jpg",
    cases: ["Divorce", "Child Custody", "Adoption"],
    description:
      "Compassionate family law attorney helping families navigate difficult legal situations.",
  },
  {
    id: "4",
    name: "Atty. Carlos Mendoza",
    specialization: "Civil Law",
    organization: "Mendoza & Partners",
    rating: 4.6,
    reviews: 203,
    experience: 18,
    location: "Pasig City",
    rate: "₱2,800/hour",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0nDnIA7Gub0vTDEF8lwz0mBEM0RDbGycQPg&s",
    cases: ["Contract Disputes", "Property Law", "Tort Claims"],
    description:
      "Civil litigation expert with extensive experience in contract and property disputes.",
  },
  {
    id: "5",
    name: "Atty. Rosa Dela Cruz",
    specialization: "Corporate Law",
    organization: "SyCip Salazar Hernandez & Gatmaitan",
    rating: 4.8,
    reviews: 94,
    experience: 14,
    location: "BGC, Taguig",
    rate: "₱4,000/hour",
    image:
      "https://www.callejalaw.com/wp-content/uploads/2022/12/Atty.-Katrin-Jessica-Distor-Guinigundo-Calleja-Law-Lawyer-in-Metro-Manila-Philippines.jpg",
    cases: [
      "Business Formation",
      "Mergers & Acquisitions",
      "Corporate Compliance",
    ],
    description:
      "Corporate law specialist helping businesses with legal compliance and transactions.",
  },
  {
    id: "6",
    name: "Atty. Miguel Torres",
    specialization: "Immigration Law",
    organization: "Legal Aid Foundation",
    rating: 4.5,
    reviews: 67,
    experience: 8,
    location: "Cebu City",
    rate: "Free",
    image: "https://accralaw.com/wp-content/uploads/2022/08/cdo-lawyer.jpg",
    cases: ["Visa Applications", "Deportation Defense", "Citizenship"],
    description:
      "Immigration law expert providing free legal assistance through Legal Aid Foundation.",
  },
];

const specializations = [
  "All Specializations",
  "Labor Law",
  "Criminal Law",
  "Family Law",
  "Civil Law",
  "Corporate Law",
  "Immigration Law",
];

export default function LawyersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState(
    "All Specializations"
  );
  const [sortBy, setSortBy] = useState("rating");

  const filteredLawyers = mockLawyers
    .filter((lawyer) => {
      const matchesSearch =
        lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialization =
        selectedSpecialization === "All Specializations" ||
        lawyer.specialization === selectedSpecialization;
      return matchesSearch && matchesSpecialization;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "experience") return b.experience - a.experience;
      if (sortBy === "reviews") return b.reviews - a.reviews;
      return 0;
    });

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
              <Button variant="outline">Profile</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Legal Professionals
          </h1>
          <p className="text-gray-600">
            Connect with qualified lawyers and paralegals in the Philippines
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search lawyers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select
                value={selectedSpecialization}
                onValueChange={setSelectedSpecialization}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Specialization" />
                </SelectTrigger>
                <SelectContent>
                  {specializations.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="experience">Most Experienced</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                </SelectContent>
              </Select>

              <Button className="w-full">Apply Filters</Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredLawyers.length} lawyers
            {selectedSpecialization !== "All Specializations" &&
              ` specializing in ${selectedSpecialization}`}
          </p>
        </div>

        {/* Lawyers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLawyers.map((lawyer) => (
            <Card key={lawyer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={lawyer.image || "/placeholder.svg"}
                    alt={lawyer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-lg">{lawyer.name}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {lawyer.specialization}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-medium">{lawyer.rating}</span>
                    <span className="text-gray-500 ml-1">
                      ({lawyer.reviews} reviews)
                    </span>
                  </div>
                  <span
                    className={`font-medium ${
                      lawyer.rate === "Free"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    {lawyer.rate}
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Award className="h-4 w-4 mr-2" />
                  <span>{lawyer.experience} years experience</span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{lawyer.location}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Building className="h-4 w-4 mr-2" />
                  <span>{lawyer.organization}</span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {lawyer.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {lawyer.cases.slice(0, 2).map((caseType, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {caseType}
                    </Badge>
                  ))}
                  {lawyer.cases.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{lawyer.cases.length - 2} more
                    </Badge>
                  )}
                </div>

                <div className="flex space-x-2 pt-2">
                  <Link href={`/lawyers/${lawyer.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </Link>
                  <Button className="flex-1">Contact</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Lawyers
          </Button>
        </div>
      </div>
    </div>
  );
}
