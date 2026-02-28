"use client";

import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { ArrowRight, BarChart3, ShieldCheck, Zap } from "lucide-react";
import Marquee from "../../node_modules/react-fast-marquee/dist/index.js";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans antialiased overflow-hidden">
      <main className="w-full flex-1">
        <section className="container mx-auto max-w-6xl pt-32 pb-20 flex flex-col items-center text-center space-y-8 px-4 md:px-6 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 bg-primary/10 blur-[100px] rounded-full -z-10 pointer-events-none" />

          <Badge className="py-1 px-3 text-sm">
            ✨ Form Builder v1.0 Now Available
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl text-foreground">
            Collect Data Easily with{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600">
              Smart Forms
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Dynamic form builder platform for surveys, registrations, and
            questionnaires. Designed for speed of creation, ease of sharing, and
            real-time response analysis.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-6">
            <Link href="/forms">
              <Button size="lg">
                Create Free Form
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Explore Features
            </Button>
          </div>
        </section>

        <section className="w-full py-12 border-y bg-muted/30 relative">
          <div className="absolute inset-y-0 left-0 w-1/8 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-1/8 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="w-full flex flex-col items-center">
            <p className="text-sm font-medium text-muted-foreground mb-8 uppercase tracking-widest px-4">
              Trusted by innovative teams worldwide
            </p>

            <Marquee
              speed={40}
              gradient={false}
              pauseOnHover={true}
              className="py-4 overflow-y-hidden"
            >
              <div className="flex items-center gap-2 text-muted-foreground/60 grayscale hover:grayscale-0 transition-all mx-12">
                <img src="aws.svg" alt="" className="h-12 w-auto" />
              </div>
              <div className="flex items-center gap-2 text-muted-foreground/60 grayscale hover:grayscale-0 transition-all mx-12">
                <img src="spotify.png" alt="" className="h-12 w-auto" />
              </div>
              <div className="flex items-center gap-2 text-muted-foreground/60 grayscale hover:grayscale-0 transition-all mx-12">
                <img src="aws.svg" alt="" className="h-12 w-auto" />
              </div>
              <div className="flex items-center gap-2 text-muted-foreground/60 grayscale hover:grayscale-0 transition-all mx-12">
                <img src="mastercard.svg" alt="" className="h-12 w-auto" />
              </div>
              <div className="flex items-center gap-2 text-muted-foreground/60 grayscale hover:grayscale-0 transition-all mx-12">
                <img src="aws.svg" alt="" className="h-12 w-auto" />
              </div>
              <div className="flex items-center gap-2 text-muted-foreground/60 grayscale hover:grayscale-0 transition-all mx-12">
                <img src="google.svg" alt="" className="h-12 w-auto" />
              </div>
              <div className="flex items-center gap-2 text-muted-foreground/60 grayscale hover:grayscale-0 transition-all mx-12">
                <img src="aws.svg" alt="" className="h-12 w-auto" />
              </div>
            </Marquee>
          </div>
        </section>

        <section className="w-full py-32">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Everything you need to collect data
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Powerful features built right in to help you build, share, and
                analyze your forms without any hassle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <CardHeader>
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Zap className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-xl">Instant Creation</CardTitle>
                  <CardDescription className="text-md">
                    Design complex forms in minutes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Use an intuitive drag-and-drop interface to add various
                    input types without needing a single line of code.
                  </p>
                </CardContent>
              </Card>

              <Card className="border bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <CardHeader>
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-xl">
                    Validation & Security
                  </CardTitle>
                  <CardDescription className="text-md">
                    Collect accurate data kept securely.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Equipped with built-in input validation to prevent spam and
                    strong encryption to protect respondents' privacy.
                  </p>
                </CardContent>
              </Card>

              <Card className="border bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <CardHeader>
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <BarChart3 className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-xl">Response Analysis</CardTitle>
                  <CardDescription className="text-md">
                    Monitor results in real-time.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Get direct insights from incoming responses via a clean,
                    interactive, and easily exportable analytics dashboard.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl px-4 md:px-6 pb-32">
          <div className="bg-card rounded-[2.5rem] p-12 md:p-24 shadow-2xl relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                Ready to Create Your First Form?
              </h2>
              <p className="max-w-2xl mx-auto mb-10 text-lg md:text-xl">
                Start collecting data smarter, neater, and more structured.
                Perfect your decision-making process right now.
              </p>
              <Button size="lg">Start for Free Now</Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
