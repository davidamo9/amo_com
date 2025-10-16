"use client";

import { useState, useEffect } from "react";
import { Mail, Calendar, CheckCircle, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Submission {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (password) {
      localStorage.setItem("adminPassword", password);
      setIsAuthenticated(true);
      fetchSubmissions(password);
    }
  };

  const fetchSubmissions = async (pw?: string) => {
    setLoading(true);
    setError("");
    const adminPassword = pw || localStorage.getItem("adminPassword");

    try {
      const response = await fetch("/api/submissions", {
        headers: {
          Authorization: `Bearer ${adminPassword}`,
        },
      });

      if (response.status === 401) {
        setIsAuthenticated(false);
        localStorage.removeItem("adminPassword");
        setError("Invalid password");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch submissions");
      }

      const data = await response.json();
      setSubmissions(data.submissions);
    } catch (err) {
      setError("Failed to load submissions");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: number) => {
    const adminPassword = localStorage.getItem("adminPassword");

    try {
      await fetch("/api/submissions", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminPassword}`,
        },
        body: JSON.stringify({ id }),
      });

      setSubmissions(
        submissions.map((sub) =>
          sub.id === id ? { ...sub, read: true } : sub
        )
      );
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminPassword");
    setIsAuthenticated(false);
    setPassword("");
    setSubmissions([]);
  };

  useEffect(() => {
    const savedPassword = localStorage.getItem("adminPassword");
    if (savedPassword) {
      setIsAuthenticated(true);
      fetchSubmissions(savedPassword);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="glass rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mb-6 text-center">
            Enter your admin password to view contact form submissions
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Admin password"
            className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <Button onClick={handleLogin} className="w-full" size="lg">
            Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Contact Submissions</h1>
            <p className="text-muted-foreground">
              Total messages: {submissions.length}
            </p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => fetchSubmissions()} variant="outline">
              Refresh
            </Button>
            <Button onClick={handleLogout} variant="destructive">
              Logout
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading submissions...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Submissions List */}
        {!loading && !error && submissions.length === 0 && (
          <div className="text-center py-12 glass rounded-2xl">
            <Mail className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No submissions yet</p>
          </div>
        )}

        {!loading && !error && submissions.length > 0 && (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className={`glass rounded-xl p-6 transition-all hover:shadow-lg ${
                  !submission.read ? "border-l-4 border-blue-500" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {submission.read ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-blue-500" />
                    )}
                    <div>
                      <h3 className="font-semibold text-lg">
                        {submission.name}
                      </h3>
                      <a
                        href={`mailto:${submission.email}`}
                        className="text-blue-500 hover:underline text-sm"
                      >
                        {submission.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(submission.created_at).toLocaleDateString()}
                    {" "}
                    {new Date(submission.created_at).toLocaleTimeString()}
                  </div>
                </div>

                <div className="bg-background/50 rounded-lg p-4 mb-4">
                  <p className="whitespace-pre-wrap">{submission.message}</p>
                </div>

                <div className="flex gap-2">
                  {!submission.read && (
                    <Button
                      size="sm"
                      onClick={() => markAsRead(submission.id)}
                      variant="outline"
                    >
                      Mark as Read
                    </Button>
                  )}
                  <Button size="sm" variant="outline" asChild>
                    <a href={`mailto:${submission.email}`}>Reply via Email</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
