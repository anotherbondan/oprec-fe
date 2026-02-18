import { Github, Twitter, Linkedin, Facebook } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary"></div>
              <span className="text-xl font-bold">Acme Inc.</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Membangun solusi digital untuk bisnis modern. Kami membantu Anda
              mengelola tim dan proyek dengan lebih efisien.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Produk</h3>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Fitur
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Harga
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Integrasi
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Changelog
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Perusahaan</h3>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Tentang Kami
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Karir
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Kontak
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privasi
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Syarat & Ketentuan
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Lisensi
            </Link>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} Acme Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}