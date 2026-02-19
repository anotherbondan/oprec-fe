"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { FileText, Plus, Eye, Trash2 } from "lucide-react";
import { Navbar } from "@/src/components/elements/Navbar/Navbar";
import { Footer } from "@/src/components/elements/Footer/Footer";

const DUMMY_FORMS = [
  {
    id: "f1a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c",
    title: "Customer Satisfaction Survey 2026",
    description: "Questionnaire to evaluate Q1 services.",
    createdAt: "2026-02-15",
    questionsCount: 5,
  },
  {
    id: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    title: "Webinar Registration Form",
    description: "Participant registration for next month's Tech Talk.",
    createdAt: "2026-02-18",
    questionsCount: 3,
  },
];

export default function FormsPage() {
  return (
    <div className="min-h-screen bg-secondary/10">
      <Navbar />
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Forms</h1>
            <p className="text-muted-foreground mt-1">
              Manage all your forms here.
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Create New Form
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DUMMY_FORMS.map((form) => (
            <Card
              key={form.id}
              className="hover:shadow-md transition-shadow bg-background"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                    {form.createdAt}
                  </span>
                </div>
                <CardTitle className="text-xl line-clamp-1">
                  {form.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 min-h-10">
                  {form.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground font-medium">
                  {form.questionsCount} Questions
                </p>
              </CardContent>
              <CardFooter className="pt-2 flex gap-2 border-t mt-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link href={`/forms/${form.id}`}>
                    <Eye className="w-4 h-4 mr-2" /> View
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
