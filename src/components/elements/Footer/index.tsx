import { FileText } from "lucide-react";
import {
  SOCIAL_MEDIA,
  PRODUCT_LINKS,
  COMPANY_LINKS,
  LEGAL_LINKS,
} from "./const";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary/10 p-1.5 rounded-lg">
                <FileText className="w-5 h-5 text-primary fill-primary/20" />
              </div>
              <span className="text-xl font-bold">FormBuilder</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The best form builder platform to collect data, create interactive
              surveys, and analyze responses quickly and easily.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Product</h3>
            {PRODUCT_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Company</h3>
            {COMPANY_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Legal</h3>
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} FormBuilder. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {SOCIAL_MEDIA.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
