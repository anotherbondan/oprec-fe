"use client";

import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { toast } from "sonner";
import { Navbar } from "@/src/components/elements/Navbar/Navbar";
import { Footer } from "@/src/components/elements/Footer/Footer";
import { ArrowRight, BarChart3, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans antialiased">
      <Navbar />

      <main className="w-full flex-1">
        <section className="container mx-auto max-w-6xl pt-32 pb-32 flex flex-col items-center text-center space-y-8 px-4 md:px-6">
          <Badge variant="secondary" className="px-4 py-1 text-sm rounded-full">
            ✨ Form Builder v1.0 Kini Tersedia
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-4xl text-foreground">
            Kumpulkan Data Lebih Mudah dengan{" "}
            <span className="text-primary">Formulir Cerdas</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Platform pembuat formulir dinamis untuk survei, pendaftaran, dan
            kuesioner. Didesain untuk kecepatan pembuatan, kemudahan berbagi,
            dan analisis respons secara langsung.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-6">
            <Button size="lg" className="px-8 shadow-lg">
              Buat Formulir Gratis <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              Jelajahi Fitur
            </Button>
          </div>
        </section>

        <section className="w-full bg-secondary/20 py-24">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-background border-none shadow-sm hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                    <Zap className="w-6 h-6" />
                  </div>
                  <CardTitle>Pembuatan Instan</CardTitle>
                  <CardDescription>
                    Rancang formulir kompleks dalam hitungan menit.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Gunakan antarmuka yang intuitif untuk menambahkan berbagai
                    macam tipe input tanpa perlu keahlian coding.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background border-none shadow-sm hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <CardTitle>Validasi & Keamanan</CardTitle>
                  <CardDescription>
                    Kumpulkan data yang akurat dan tersimpan dengan aman.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Dilengkapi dengan validasi input bawaan untuk mencegah data
                    spam dan enkripsi untuk melindungi privasi responden Anda.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background border-none shadow-sm hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <CardTitle>Analisis Respons</CardTitle>
                  <CardDescription>
                    Pantau hasil pengumpulan data secara real-time.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Dapatkan wawasan langsung dari respons yang masuk melalui
                    dashboard analitik yang rapi dan mudah diekspor.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl py-24 px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center justify-center">
            <div className="flex-1 space-y-6 max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight">
                Kelola Formulir di Satu Tempat
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Antarmuka kami dirancang agar ramah pengguna. Anda dapat membuat
                formulir baru, mengatur privasi, dan membagikan tautan survei
                hanya dengan beberapa klik.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default" className="shadow-md">
                      Coba Buat Formulir
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                      <DialogTitle>Formulir Baru</DialogTitle>
                      <DialogDescription>
                        Tentukan judul dan deskripsi untuk formulir pertama
                        Anda.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label
                          htmlFor="title"
                          className="text-right text-sm font-medium"
                        >
                          Judul
                        </label>
                        <Input
                          id="title"
                          defaultValue="Survei Kepuasan"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label
                          htmlFor="desc"
                          className="text-right text-sm font-medium"
                        >
                          Deskripsi
                        </label>
                        <Input
                          id="desc"
                          defaultValue="Mohon isi dengan jujur"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        onClick={() =>
                          toast.success("Formulir berhasil dibuat!")
                        }
                      >
                        Simpan Formulir
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="outline"
                  onClick={() =>
                    toast("Tautan Disalin", {
                      description:
                        "Tautan formulir Anda siap dibagikan ke responden.",
                      action: {
                        label: "Tutup",
                        onClick: () => console.log("Tutup"),
                      },
                    })
                  }
                >
                  Simulasi Bagikan Tautan
                </Button>
              </div>
            </div>

            <div className="flex-1 w-full max-w-md">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full bg-primary/10 rounded-2xl blur-2xl"></div>

                <Card className="relative border-muted shadow-xl bg-card">
                  <CardHeader>
                    <CardTitle>Akses Pembuat</CardTitle>
                    <CardDescription>
                      Masuk ke dashboard untuk mengelola formulir Anda.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input placeholder="nama@email.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Kata Sandi</label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full shadow-sm">
                      Masuk Dashboard
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl px-4 md:px-6 pb-24 text-center">
          <div className="bg-primary text-primary-foreground rounded-3xl p-12 md:p-24 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white/5 pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                Siap Membuat Formulir Pertama Anda?
              </h2>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-10 text-lg md:text-xl">
                Mulai kumpulkan data dengan cara yang lebih cerdas, rapi, dan
                terstruktur. Sempurnakan proses pengambilan keputusan Anda
                sekarang juga.
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="font-semibold px-8 h-12 text-md shadow-lg hover:bg-secondary/90 transition-colors"
              >
                Mulai Gratis Sekarang
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
