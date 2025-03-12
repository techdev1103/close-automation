"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { paths } from "@/routes/paths";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { resetPassword } from "@/auth/context";
// ----------------------------------------------------------------------

export function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await resetPassword({ email });
      setMessage("Password reset email sent. Check your inbox.");
      // Optionally, redirect to login page after a short delay
      setTimeout(() => {
        router.push(paths.auth.login);
      }, 3000);
       
    } catch (error: any) {
      setError(error.message || "An error occurred. Please try again.");
    }
  };

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Reset Password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
      </div>
      <form onSubmit={handleResetPassword}>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <Button className="mt-4 w-full" type="submit">
          Send reset link
        </Button>
      </form>
    </div>
  );
}
