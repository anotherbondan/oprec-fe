"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  FileText,
  UserCircle,
  LogOut,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import { MENU_ITEMS } from "./const";
import { useAuth } from "@/src/hooks/useAuth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <div className="bg-primary/10 p-1.5 rounded-lg">
            <FileText className="w-5 h-5 text-primary fill-primary/20" />
          </div>
          <span className="font-bold text-lg tracking-tight">FormBuilder</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 pl-2 pr-3 border hover:bg-muted"
                  >
                    <UserCircle className="w-5 h-5 text-muted-foreground" />

                    <span className="font-medium">
                      Welcome, {user?.name?.split(" ")[0] || "User"}!
                    </span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground opacity-50" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/forms" className="flex items-center w-full">
                      <LayoutDashboard className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>My Forms</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="hidden sm:inline-flex text-muted-foreground hover:text-foreground"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="font-medium shadow-sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
