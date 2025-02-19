import { auth } from "@/lib/auth";
import { getStudentData } from "@/lib/sheets";
import { SiteHeader } from "@/components/site-header";

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
      <>
        <SiteHeader
          isAuthenticated={!!session}
          userEmail={session?.user?.email}
        />
        <main className="container p-4 mx-auto">
          <h1 className="mb-4 text-2xl font-bold">No data available</h1>
          {session ? (
            <p>
              Sorry, it was im<strong>POSSIBLE</strong> find your data. Please
              contact David if you think this is a mistake.
            </p>
          ) : (
            <p>Please sign in to view your attendance data.</p>
          )}
        </main>
      </>
    );
  }

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 70) return "text-green-600";
    if (percentage >= 50) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <>
      {" "}
      <SiteHeader
        isAuthenticated={!!session}
        userEmail={session?.user?.email}
      />
      <main className="container p-4 mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Student Dashboard</h1>

        <div className="grid gap-4 mb-6 md:grid-cols-3">
          <div className="p-4 rounded-lg border">
            <p className="text-sm text-gray-600">Name</p>
            <p className="text-xl font-bold">{data.name}</p>
          </div>
          <div className="p-4 rounded-lg border">
            <p className="text-sm text-gray-600">Attendance Rate</p>
            <p
              className={`text-xl font-bold ${getAttendanceColor(data.attendance)}`}
            >
              {data.attendance}%
            </p>
          </div>
          <div className="p-4 rounded-lg border">
            <p className="text-sm text-gray-600">Total Events</p>
            <p className="text-xl font-bold">{data.totalEvents}</p>
          </div>
        </div>

        <div className="grid gap-4 mb-6 md:grid-cols-5">
          <div className="p-4 rounded-lg border">
            <p className="text-sm text-gray-600">Present</p>
            <p className="text-xl font-bold text-green-600">
              {data.stats.present}
            </p>
          </div>
          <div className="p-4 rounded-lg border">
            <p className="text-sm text-gray-600">Reflection</p>
            <p className="text-xl font-bold text-blue-600">
              {data.stats.reflection}
            </p>
          </div>
          <div className="p-4 rounded-lg border">
            <p className="text-sm text-gray-600">Late</p>
            <p className="text-xl font-bold text-yellow-600">
              {data.stats.late}
            </p>
          </div>
          <div className="p-4 rounded-lg border">
            <p className="text-sm text-gray-600">Conflict</p>
            <p className="text-xl font-bold text-orange-600">
              {data.stats.conflict}
            </p>
          </div>
          <div className="p-4 rounded-lg border">
            <p className="text-sm text-gray-600">Absent</p>
            <p className="text-xl font-bold text-red-600">
              {data.stats.absent}
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-2 px-4 text-left">Week</th>
                <th className="py-2 px-4 text-left">Day</th>
                <th className="py-2 px-4 text-left">Session</th>
                <th className="py-2 px-4 text-left">Speaker</th>
                <th className="py-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.sessions.map((session, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4">Week {session.week}</td>
                  <td className="py-2 px-4">{session.day}</td>
                  <td className="py-2 px-4">{session.name}</td>
                  <td className="py-2 px-4">{session.speaker}</td>
                  <td className="py-2 px-4">
                    {session.status ? (
                      <span
                        className={`font-medium ${
                          session.status === "P"
                            ? "text-green-600"
                            : session.status === "R"
                              ? "text-blue-600"
                              : session.status === "L"
                                ? "text-yellow-600"
                                : session.status === "C"
                                  ? "text-orange-600"
                                  : "text-red-600"
                        }`}
                      >
                        {session.status}
                      </span>
                    ) : (
                      <a className="text-blue-500 underline" href="#">
                        Watch record
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
