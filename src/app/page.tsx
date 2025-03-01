import { auth } from "@/lib/auth";
import { getStudentData } from "@/lib/sheets";
import { SessionsAccordion } from "@/components/sessions-accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle2,
  PenLine,
  Clock,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import NoData from "@/components/no-data";
import { JSX } from "react";

async function getData() {
  const session = await auth();
  if (!session) return { session: null, data: null };

  const data = await getStudentData(session.user!.email!);

  if (!data) {
    return { session, data: null };
  }

  const recordingUrl = data.recordingUrl;
  return { session, data, recordingUrl };
}

type StatCard = {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  color?: string;
  titleColor?: string;
  description: string | JSX.Element;
};

const StatCardComponent = ({ card }: { card: StatCard }) => (
  <Card className="rounded-md border-0 shadow-md transition-all hover:shadow-lg">
    <CardHeader className="flex flex-row justify-between items-center pb-2 space-y-0">
      <CardTitle
        className={`text-sm font-semibold ${card.titleColor || "text-gray-800"}`}
      >
        {card.title}
      </CardTitle>
      {card.icon && (
        <card.icon className={`w-5 h-5 ${card.color || "text-blue-500"}`} />
      )}
    </CardHeader>
    <CardContent className="pb-2">
      <div className={`text-2xl font-bold ${card.color || "text-gray-800"}`}>
        {card.value}
      </div>
    </CardContent>
    <CardFooter>
      <CardDescription className="text-gray-600">
        {card.description}
      </CardDescription>
    </CardFooter>
  </Card>
);

export default async function Home() {
  const { session, data, recordingUrl } = await getData();

  if (!data) {
    return <NoData session={session} />;
  }

  const summaryCards: StatCard[] = [
    {
      title: "Student Name",
      value: data.name,
      description: "Please let us know if your name needs to be updated",
    },
    {
      title: "Engagement Rate",
      value: `${data.attendance}%`,
      color:
        data.attendance >= 70
          ? "text-green-600"
          : data.attendance >= 50
            ? "text-orange-600"
            : "text-red-600",
      description: (
        <>
          This is{" "}
          <strong>
            <em>your</em>
          </strong>{" "}
          overall{" "}
          <strong>
            <em>engagement</em>
          </strong>{" "}
          rate, updated every 24 hours
        </>
      ),
    },
  ];

  const statsCards: StatCard[] = [
    {
      title: "Present",
      value: data.stats.present,
      icon: CheckCircle2,
      color: "text-green-600",
      titleColor: "text-green-600",
      description: "Sessions you attended on time",
    },
    {
      title: "Reflection",
      value: data.stats.reflection,
      icon: PenLine,
      color: "text-blue-600",
      titleColor: "text-blue-600",
      description: "Missed sessions with a reflection",
    },
    {
      title: "Late",
      value: data.stats.late,
      icon: Clock,
      color: "text-yellow-600",
      titleColor: "text-yellow-600",
      description: "Sessions you attended late",
    },
    {
      title: "Absent",
      value: data.stats.absent,
      icon: XCircle,
      color: "text-red-600",
      titleColor: "text-red-600",
      description: "Sessions you missed",
    },
  ];

  return (
    <main className="bg-gradient-to-br from-blue-50 to-teal-50 min-h-dvh">
      <div className="container p-6 mx-auto">
        <header className="mb-6 text-center">
          <h1 className="mb-4 text-3xl font-bold text-blue-600">
            Student Dashboard
          </h1>
          <p className="mb-8 text-gray-600">
            View your engagement scores and session attendance
          </p>
        </header>

        <section className="grid gap-4 mb-8 md:grid-cols-2">
          {summaryCards.map((card, index) => (
            <StatCardComponent key={index} card={card} />
          ))}
        </section>

        <section className="grid gap-4 mb-8 md:grid-cols-4">
          {statsCards.map((card, index) => (
            <StatCardComponent key={index} card={card} />
          ))}
        </section>

        <SessionsAccordion
          sessions={data.sessions}
          project={data.project}
          recordingUrl={recordingUrl}
        />
      </div>
    </main>
  );
}
