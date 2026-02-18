import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Hexagon } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <div className="bg-primary/10 p-1.5 rounded-lg">
            <Hexagon className="w-5 h-5 text-primary fill-primary/20" />
          </div>
          <span className="font-bold text-lg tracking-tight">Acme Inc</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Fitur
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Solusi
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Harga
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Blog
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="hidden sm:inline-flex text-muted-foreground hover:text-foreground"
          >
            Masuk
          </Button>
          <Button className="font-medium shadow-sm">Coba Gratis</Button>
        </div>
      </div>
    </nav>
  );
}
