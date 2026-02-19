import Link from "next/link";
import { FileText } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary/20 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <Link href="/" className="flex items-center gap-2 mb-4 transition-opacity hover:opacity-90">
            <div className="bg-primary/10 p-2 rounded-xl">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <span className="font-bold text-2xl tracking-tight">FormBuilder</span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}