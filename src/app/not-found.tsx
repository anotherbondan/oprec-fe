import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="bg-primary/10 p-4 rounded-full mb-6 animate-pulse">
        <FileQuestion className="w-16 h-16 text-primary" />
      </div>

      <h1 className="text-6xl font-extrabold tracking-tight lg:text-7xl mb-2 text-foreground">
        404
      </h1>
      <h2 className="text-2xl font-semibold tracking-tight mb-4 text-foreground">
        Page Not Found
      </h2>
      <p className="text-muted-foreground max-w-md mb-8 text-lg">
        Oops! The page you are looking for does not exist, has been moved, or
        has been deleted.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Button className="w-full sm:w-auto flex items-center gap-2" size="lg" asChild>
          <Link href="/">
            <Home className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
