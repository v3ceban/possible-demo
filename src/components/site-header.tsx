import Image from "next/image";
import { SignOut } from "./auth-buttons";

interface SiteHeaderProps {
  isAuthenticated: boolean;
  userEmail?: string | null;
}

export function SiteHeader({ isAuthenticated, userEmail }: SiteHeaderProps) {
  if (!isAuthenticated) return null;
  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-500 to-teal-400 backdrop-blur supports-[backdrop-filter]:bg-opacity-80">
      <div className="container flex justify-between items-center mx-auto h-16">
        <div className="flex gap-3 items-center">
          <h1 className="flex gap-x-2 items-center text-xl font-semibold text-white">
            <Image
              src="/logo.webp"
              alt="Possible Logo"
              width={40}
              height={40}
              className="rounded-md"
            />
            Engagement Rate Portal
          </h1>
        </div>

        <div className="flex gap-4 items-center">
          <span className="hidden text-sm text-white sm:inline-block">
            {userEmail}
          </span>
          <SignOut variant="link" size="sm" className="text-white" />
        </div>
      </div>
    </header>
  );
}
