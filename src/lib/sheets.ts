import { google } from "googleapis";

export type SessionData = {
  name: string;
  speaker: string;
  week: number;
  day: string;
  status: "P" | "A" | "L" | "C" | "R" | "";
};

export type StudentData = {
  name: string;
  email: string;
  school: string;
  attendance: number;
  totalEvents: number;
  stats: {
    present: number;
    reflection: number;
    late: number;
    conflict: number;
    absent: number;
    presentPercentage: number;
  };
  sessions: SessionData[];
};

const getSheets = () => {
  return google.sheets({
    version: "v4",
    auth: process.env.GOOGLE_API_KEY,
  });
};

export async function getStudentData(
  email: string,
): Promise<StudentData | null> {
  try {
    const sheets = getSheets();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SHEET_ID,
      range: "A:ZZ", // Adjust based on your sheet's range
    });

    const rows = response.data.values;
    if (!rows) return null;

    // Find student row
    const studentRow = rows.find((row) => row[1] === email);
    if (!studentRow) return null;

    // Get week/day, session names, and speakers (rows 0, 1, and 2)
    const weekDays = rows[0].slice(11);
    const sessionNames = rows[1].slice(11);
    const speakers = rows[2].slice(11);
    let weekNumber = 0;

    // Process session information
    const sessions = sessionNames.map((name, index) => {
      const weekDay = weekDays[index] || "";
      const weekMatch = weekDay.match(/Wk (\d+)/);
      const week = weekMatch ? parseInt(weekMatch[1]) : 0;
      weekNumber = week || weekNumber;
      const dayMatch = weekDay.match(
        /(Monday|Tuesday|Wednesday|Thursday|Friday)/,
      );
      const day = dayMatch ? dayMatch[1] : "";

      return {
        name: name,
        speaker: speakers[index],
        week: weekNumber,
        day: day,
        status: studentRow[index + 5] || "",
      };
    });

    // Calculate statistics
    const stats = {
      present: studentRow.filter((val) => val === "P").length,
      reflection: studentRow.filter((val) => val === "R").length,
      late: studentRow.filter((val) => val === "L").length,
      conflict: studentRow.filter((val) => val === "C").length,
      absent: studentRow.filter((val) => val === "A").length,
      presentPercentage: parseFloat(studentRow[3]),
    };

    return {
      name: studentRow[0],
      email: studentRow[1],
      school: studentRow[2],
      attendance: parseFloat(studentRow[3]),
      totalEvents: parseInt(studentRow[4]),
      stats,
      sessions,
    };
  } catch (error) {
    console.error("Error fetching student data:", error);
    return null;
  }
}
