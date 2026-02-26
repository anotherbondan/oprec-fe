"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Info, 
  Loader2 
} from "lucide-react";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      richColors={true}
      position="top-right"
      icons={{
        success: <CheckCircle2 className="h-4 w-4" />,
        info: <Info className="h-4 w-4" />,
        warning: <AlertTriangle className="h-4 w-4" />,
        error: <XCircle className="h-4 w-4" />,
        loading: <Loader2 className="h-4 w-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg font-sans",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          closeButton: 
            "group-[.toast]:bg-transparent group-[.toast]:text-muted-foreground group-[.toast]:hover:text-foreground group-[.toast]:hover:bg-muted transition-colors",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };