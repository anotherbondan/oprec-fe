"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";

export default function LoginPage() {
  return (
    <Card className="border-muted shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Selamat Datang Kembali
        </CardTitle>
        <CardDescription>
          Masukkan email dan kata sandi Anda untuk masuk ke dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Email
          </label>
          <Input id="email" type="email" placeholder="nama@email.com" required />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Kata Sandi
            </label>
            <Link href="#" className="text-sm text-primary hover:underline">
              Lupa sandi?
            </Link>
          </div>
          <Input id="password" type="password" placeholder="••••••••" required />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full" size="lg">
          Masuk
        </Button>
        <div className="text-sm text-center text-muted-foreground">
          Belum punya akun?{" "}
          <Link href="/register" className="text-primary font-medium hover:underline">
            Daftar sekarang
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}