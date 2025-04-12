'use client'

import { useEffect, useState } from "react";

type Visitor = {
  _id: string;
  ip: string;
  location: string;
  userAgent: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
};

type VisitorStats = {
  visitors: Visitor[];
  totalVisitors: number;
  uniqueVisitors: number;
  mostViewedVisitor: {
    ip: string;
    viewCount: number;
  } | null;
};

const Dashboard = () => {
  const [data, setData] = useState<VisitorStats>({
    visitors: [],
    totalVisitors: 0,
    uniqueVisitors: 0,
    mostViewedVisitor: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatDateTime = (dateStr: string | null | undefined) => {
    if (!dateStr) return "Unknown";
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year}, ${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchVisitorStats = async () => {
      try {
        const response = await fetch("https://traffic-service.vercel.app/api/visitor-stats");
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching visitor stats:", err);
        setError("Failed to load visitor statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchVisitorStats();
  }, []);

  const totalViews = data.visitors.reduce((acc, visitor) => acc + visitor.viewCount, 0);

  if (loading) return <p className="text-center mt-10 text-lg">Loading visitor stats...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl md:mx-auto mt-10 p-6 bg-white shadow-md rounded-lg mx-2">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Visitor Statistics</h2>

      <div className="mb-6 space-y-1 text-lg text-gray-700">
        <p><span className="font-semibold">Total Visits:</span> {totalViews}</p>
        <p><span className="font-semibold">Total Unique Visitors:</span> {data.uniqueVisitors}</p>
        {data.mostViewedVisitor && (
          <p>
            <span className="font-semibold">Most Viewed Visitor IP:</span> {data.mostViewedVisitor.ip},
            <span className="font-semibold"> View Count:</span> {data.mostViewedVisitor.viewCount}
          </p>
        )}
      </div>

      <h3 className="text-xl font-semibold mb-2 text-gray-700">Visitor Data:</h3>
      <ul className="bg-gray-100 rounded-lg p-4 space-y-2">
        {data.visitors.map((visitor) => (
          <li key={visitor._id} className="p-2 bg-white rounded-lg shadow">
            <div className="space-y-1">
              <p className="font-medium text-cyan-800">
                <span className="font-bold text-sm">IP:</span> {visitor.ip}
              </p>
              <p className="text-gray-700 text-xs">
                <span className="font-bold">Location:</span> {visitor.location}
              </p>
              <p className="text-gray-700 text-xs break-words">
                <span className="font-bold">User Agent:</span> {visitor.userAgent}
              </p>
              <p className="text-gray-700 text-xs">
                <span className="font-bold">First Visit:</span>{" "}
                <span className="text-purple-600">{formatDateTime(visitor.createdAt)}</span>
              </p>
              <p className="text-gray-700 text-xs">
                <span className="font-bold">Last Visit:</span>{" "}
                <span className="text-teal-600">{formatDateTime(visitor.updatedAt)}</span>
              </p>
            </div>
            <p className="bg-blue-500 text-white rounded-full px-3 py-1 mt-2 w-fit">
              Views: {visitor.viewCount}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
