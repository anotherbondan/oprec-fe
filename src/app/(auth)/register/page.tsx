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

export default function RegisterPage() {
  return (
    <Card className="border-muted shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Buat Akun Baru
        </CardTitle>
        <CardDescription>
          Daftar sekarang untuk mulai mengumpulkan data dengan mudah
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium leading-none">
            Nama Lengkap
          </label>
          <Input id="name" type="text" placeholder="Budi Santoso" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium leading-none">
            Email
          </label>
          <Input id="email" type="email" placeholder="nama@email.com" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium leading-none">
            Kata Sandi
          </label>
          <Input id="password" type="password" placeholder="••••••••" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="confirm-password" className="text-sm font-medium leading-none">
            Konfirmasi Kata Sandi
          </label>
          <Input id="confirm-password" type="password" placeholder="••••••••" required />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full" size="lg">
          Buat Akun
        </Button>
        <div className="text-sm text-center text-muted-foreground">
          Sudah memiliki akun?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Masuk di sini
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}