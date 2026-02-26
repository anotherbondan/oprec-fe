"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  FileText,
  UserCircle,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Menu,
  X,
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
import Toggle from "../../ui/toggle";
import { useState } from "react";

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90 relative z-20"
        >
          <div className="bg-primary/10 p-1.5 rounded-lg">
            <FileText className="w-5 h-5 text-primary fill-primary/20" />
          </div>
          <span className="font-bold text-lg tracking-tight max-lg:text-md">
            FormBuilder
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
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

        <div className="flex items-center gap-4 relative z-20">
          <Toggle />
          {isAuthenticated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="max-lg:hidden">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 border hover:bg-muted"
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
              <Button
                variant="ghost"
                className="max-lg:hidden sm:inline-flex text-muted-foreground hover:text-foreground"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button className="font-medium shadow-sm max-lg:hidden">
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            className="flex items-center gap-2 hover:bg-muted lg:hidden p-0 mx-1"
            onClick={() => setOpen(!open)}
          >
            <Menu className="w-7 h-7 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {open && (
        <div className="absolute left-0 top-0 w-full h-screen lg:hidden flex flex-col bg-background z-50">
          <div className="px-6 py-8 flex flex-col gap-6 flex-1 overflow-y-auto">
            <div className="flex flex-col gap-4">
              {MENU_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-2xl font-medium text-muted-foreground transition-colors hover:text-primary hover:bg-muted/50 rounded-lg"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="h-px bg-border w-full" />

            {isAuthenticated ? (
              <div className="flex flex-col gap-2">
                <div className="px-4 py-3 text-sm text-muted-foreground flex items-center gap-3">
                  <UserCircle className="w-6 h-6" />
                  <span className="font-medium text-base">
                    {user?.name || "User"}
                  </span>
                </div>

                <Link
                  href="/forms"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-muted-foreground transition-colors hover:text-primary hover:bg-muted/50 rounded-lg"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  My Forms
                </Link>

                <Button
                  variant="ghost"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="flex w-fit items-center gap-3 px-4 py-3 text-lg font-medium text-destructive transition-colors hover:bg-destructive/10 rounded-lg text-left"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className=" text-muted-foreground hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  className="font-medium shadow-sm"
                  onClick={() => setOpen(false)}
                >
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}
            <Button
              variant="ghost"
              className="flex items-center gap-2 hover:bg-muted lg:hidden p-0 mx-1"
              onClick={() => setOpen(!open)}
            >
              <X className="w-7 h-7 text-muted-foreground" />
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
