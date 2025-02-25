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
  AlertCircle,
  XCircle,
  type LucideIcon,
} from "lucide-react";

async function getData() {
  const session = await auth();
  if (!session) return { session: null, data: null };

  const data = await getStudentData(session.user!.email!);

  if (!data) {
    return { session, data: null };
  }
  return { session, data };
}

export default async function Home() {
  const { session, data } = await getData();

  if (!data) {
    return (
      <main className="container py-4 mx-auto">
        <h2 className="mb-4 text-2xl font-bold">No data available</h2>
        {session ? (
          <p>
            Sorry, it was im<strong>POSSIBLE</strong> find your data. Please
            contact David if you think this is a mistake.
          </p>
        ) : (
          <p>Please sign in to view your attendance data.</p>
        )}
      </main>
    );
  }

  type StatCard = {
    title: string;
    value: string | number;
    icon?: LucideIcon;
    color?: string;
    titleColor?: string;
    description: string;
  };

  const summaryCards: StatCard[] = [
    {
      title: "Name",
      value: data.name,
      description: "Your registered name",
    },
    {
      title: "Attendance Rate",
      value: `${data.attendance}%`,
      color:
        data.attendance >= 70
          ? "text-green-600"
          : data.attendance >= 50
            ? "text-orange-600"
            : "text-red-600",
      description: "Your overall attendance rate up to current day",
    },
    {
      title: "Total Events",
      value: data.totalEvents,
      description: "Total number of sessions and fireside chats",
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
      title: "Conflict",
      value: data.stats.conflict,
      icon: AlertCircle,
      color: "text-orange-600",
      titleColor: "text-orange-600",
      description: "Sessions with schedule conflicts",
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

  const StatCardComponent = ({ card }: { card: StatCard }) => (
    <Card className="rounded-sm transition-all hover:shadow-md">
      <CardHeader className="flex flex-row justify-between items-center pb-2 space-y-0">
        <CardTitle
          className={`text-sm ${card.titleColor || "text-foreground"}`}
        >
          {card.title}
        </CardTitle>
        {card.icon && (
          <card.icon
            className={`w-4 h-4 ${card.color || "text-muted-foreground"}`}
          />
        )}
      </CardHeader>
      <CardContent className="pb-2">
        <div className={`text-2xl font-bold ${card.color || ""}`}>
          {card.value}
        </div>
      </CardContent>
      <CardFooter>
        <CardDescription>{card.description}</CardDescription>
      </CardFooter>
    </Card>
  );

  return (
    <main className="container py-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Student Dashboard</h1>

      <section className="grid gap-4 mb-6 md:grid-cols-3">
        {summaryCards.map((card, index) => (
          <StatCardComponent key={index} card={card} />
        ))}
      </section>

      <section className="grid gap-4 mb-6 md:grid-cols-5">
        {statsCards.map((card, index) => (
          <StatCardComponent key={index} card={card} />
        ))}
      </section>

      <SessionsAccordion sessions={data.sessions} />
    </main>
  );
}
