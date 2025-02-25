import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SessionData } from "./sheets";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function groupSessionsByWeek(sessions: SessionData[]) {
  return sessions.reduce(
    (acc, session) => {
      const weekKey = `Week ${session.week}`;
      if (!acc[weekKey]) {
        acc[weekKey] = [];
      }
      acc[weekKey].push(session);
      return acc;
    },
    {} as Record<string, SessionData[]>,
  );
}
