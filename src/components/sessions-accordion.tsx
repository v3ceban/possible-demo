import { SessionData, Status } from "@/lib/sheets";
import { groupSessionsByWeek } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ChevronRight,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  PenLine,
  Video,
  Calendar,
  User2,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SessionsAccordionProps {
  sessions: SessionData[];
  project: {
    status: Status;
  };
}

interface SessionStatusProps {
  session: SessionData;
  className?: string;
}

function SessionStatus({ session, className }: SessionStatusProps) {
  const getStatusIcon = () => {
    switch (session.status) {
      case "P":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "A":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "L":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "C":
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case "R":
        return <PenLine className="w-4 h-4 text-blue-600" />;
    }
  };

  const getStatusColor = () => {
    switch (session.status) {
      case "P":
        return "text-green-600";
      case "A":
        return "text-red-600";
      case "L":
        return "text-yellow-600";
      case "C":
        return "text-orange-600";
      case "R":
        return "text-blue-600";
    }
  };

  return (
    <div className={cn("flex items-center justify-between min-h-4", className)}>
      <span className="flex gap-2 items-center">
        {getStatusIcon()}
        <span className={cn("font-medium", getStatusColor())}>
          {session.status}
        </span>
      </span>
      {session.status === "A" && (
        <a
          className="flex gap-1 items-center ml-2 text-sm text-blue-500 hover:text-blue-700"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.notion.so/heypossible/Content-Library-17c20aa0025e81e5b3c8ee6ce25ce0ab"
        >
          <Video className="w-4 h-4" />
          <span className="underline">Watch recording</span>
        </a>
      )}
    </div>
  );
}

export function SessionsAccordion({
  sessions,
  project,
}: SessionsAccordionProps) {
  const weeklyGroups = groupSessionsByWeek(sessions);
  const weeks = Object.keys(weeklyGroups).sort((a, b) => {
    const aNum = parseInt(a.split(" ")[1]);
    const bNum = parseInt(b.split(" ")[1]);
    return aNum - bNum;
  });

  return (
    <Accordion
      defaultValue={[weeks[0]]}
      type="multiple"
      className="w-full divide-y divide-black/30"
    >
      {weeks.map((week) => (
        <AccordionItem key={week} value={week} className="border-transparent">
          <AccordionTrigger className="hover:no-underline">
            <header className="flex gap-2 items-center">
              <ChevronRight className="w-4 h-4 transition-transform duration-200" />
              <h3 className="font-semibold">{week}</h3>
              <span className="text-sm text-muted-foreground">
                ({weeklyGroups[week].length} sessions)
              </span>
            </header>
          </AccordionTrigger>
          <AccordionContent>
            <main className="overflow-hidden rounded-lg">
              {/* Desktop view */}
              <table className="hidden w-full md:table">
                <thead className="text-white bg-teal-500">
                  <tr>
                    <th className="py-2 px-4 text-left">
                      <span className="flex gap-2 items-center">
                        <Calendar className="w-4 h-4" />
                        Day
                      </span>
                    </th>
                    <th className="py-2 px-4 text-left">
                      <span className="flex gap-2 items-center">
                        <Info className="w-4 h-4" />
                        Session
                      </span>
                    </th>
                    <th className="py-2 px-4 text-left">
                      <span className="flex gap-2 items-center">
                        <User2 className="w-4 h-4" />
                        Speaker
                      </span>
                    </th>
                    <th className="py-2 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {Object.entries(
                    weeklyGroups[week].reduce(
                      (acc, session) => {
                        const key = `${session.day}`;
                        if (!acc[key]) {
                          acc[key] = [];
                        }
                        acc[key].push(session);
                        return acc;
                      },
                      {} as Record<string, SessionData[]>,
                    ),
                  ).map(([day, daySessions]) => (
                    <tr key={day} className="relative border-t border-black/30">
                      <td className="py-2 px-4 align-top" rowSpan={1}>
                        {day}
                      </td>
                      <td className="py-2 px-4">
                        <div className="space-y-2">
                          {daySessions.map((session, idx) => (
                            <div
                              key={idx}
                              className={`flex items-center gap-2 ${
                                idx > 0 ? "pt-2 border-t border-black/30" : ""
                              }`}
                            >
                              {session.isFireside && (
                                <span className="py-0.5 px-2 text-xs text-orange-700 bg-orange-100 rounded">
                                  Fireside
                                </span>
                              )}
                              {session.name}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <div className="space-y-2">
                          {daySessions.map((session, idx) => (
                            <div
                              key={idx}
                              className={`${
                                idx > 0
                                  ? "pt-2 border-t border-black/30 min-h-4"
                                  : ""
                              }`}
                            >
                              {session.speaker}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <div className="space-y-2">
                          {daySessions.map((session, idx) => (
                            <SessionStatus
                              key={idx}
                              session={session}
                              className={
                                idx > 0 ? "pt-2 border-t border-black/30" : ""
                              }
                            />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile view */}
              <div className="md:hidden">
                {Object.entries(
                  weeklyGroups[week].reduce(
                    (acc, session) => {
                      const key = `${session.day}`;
                      if (!acc[key]) {
                        acc[key] = [];
                      }
                      acc[key].push(session);
                      return acc;
                    },
                    {} as Record<string, SessionData[]>,
                  ),
                ).map(([day, daySessions]) => (
                  <div key={day} className="p-4">
                    <div className="flex gap-2 items-center mb-3">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <h4 className="font-medium">{day}</h4>
                    </div>
                    <div className="space-y-4">
                      {daySessions.map((session, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            "rounded-lg bg-white border p-3 space-y-2",
                            idx > 0 ? "mt-2" : "",
                          )}
                        >
                          <div className="flex gap-2 justify-between items-start">
                            <div className="flex-1 space-y-1">
                              <div className="flex gap-2 items-center">
                                {session.isFireside && (
                                  <span className="py-0.5 px-2 text-xs text-orange-700 bg-orange-100 rounded">
                                    Fireside
                                  </span>
                                )}
                                <span className="font-medium">
                                  {session.name}
                                </span>
                              </div>
                              <div className="flex gap-2 items-center text-sm text-muted-foreground">
                                <User2 className="w-3 h-3" />
                                {session.speaker}
                              </div>
                            </div>
                            <SessionStatus session={session} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </AccordionContent>
        </AccordionItem>
      ))}
      <AccordionItem value="Project" className="border-transparent">
        <AccordionTrigger>
          <header className="flex gap-2 items-center">
            <ChevronRight className="w-4 h-4 transition-transform duration-200" />
            <h3 className="font-semibold">Project</h3>
          </header>
        </AccordionTrigger>
        <AccordionContent>
          <main className="p-4 bg-white rounded-lg">
            <div className="flex gap-2 items-center">
              <Info className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">
                {["P", "A"].includes(project.status)
                  ? "Completed"
                  : "In progress"}
              </span>
            </div>
          </main>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
