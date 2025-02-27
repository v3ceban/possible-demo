import { GraduationCap } from "lucide-react";
import { SignIn } from "./auth-buttons";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";

const FrontPage = () => {
  return (
    <section className="bg-gradient-to-br from-blue-400 via-teal-300 to-pink-400 min-h-dvh">
      <div className="container py-12 mx-auto">
        <header className="mb-16 text-center">
          <Image
            src="/logo-big.webp"
            alt="Possible Logo"
            className="mx-auto mb-6 w-auto h-16"
            width={400}
            height={128}
          />
          <h1 className="mb-6 text-4xl font-semibold text-white md:text-6xl">
            Cohort Engagement Rate Portal
          </h1>
          <p className="mx-auto text-xl text-white">
            Real-time access to student engagement scores and session attendance
            tracking
          </p>
        </header>
        <Card className="mx-auto max-w-xl">
          <CardHeader className="text-center">
            <GraduationCap className="mx-auto w-16 h-16 text-blue-500" />
            <CardTitle className="text-2xl text-gray-800">
              Student Access
            </CardTitle>
            <CardDescription className="text-gray-600">
              View your Cohort engagement scores and session attendance
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <SignIn
              size="lg"
              className="w-full text-white bg-blue-500 hover:bg-blue-600"
            >
              Student Login
            </SignIn>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default FrontPage;
