"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";

interface SiteHeaderProps {
  isAuthenticated: boolean;
  userEmail?: string | null;
}

export function SiteHeader({ isAuthenticated, userEmail }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex justify-between items-center mx-auto h-14">
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Possible Demo</span>
        </div>

        <div className="flex gap-4 items-center">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-muted-foreground">{userEmail}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut()}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signIn("google")}
              className="gap-2"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
