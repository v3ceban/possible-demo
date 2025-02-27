"use client";

import { signOut, signIn } from "next-auth/react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { LogOut, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";

export const SignOut = ({
  className,
  variant,
  size,
  children,
  ...props
}: {
  className?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  children?: React.ReactNode;
  props?: ButtonProps;
}) => {
  return (
    <Button
      {...props}
      variant={variant}
      size={size}
      className={cn("gap-2", className)}
      onClick={() => signOut()}
    >
      <LogOut className="w-4 h-4" />
      {children || "Logout"}
    </Button>
  );
};

export const SignIn = ({
  className,
  variant,
  size,
  children,
  ...props
}: {
  className?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  children?: React.ReactNode;
  props?: ButtonProps;
}) => {
  return (
    <Button
      {...props}
      variant={variant}
      size={size}
      className={cn("gap-2", className)}
      onClick={() => signIn("google")}
    >
      <LogIn className="w-4 h-4" />
      {children || "Login"}
    </Button>
  );
};
