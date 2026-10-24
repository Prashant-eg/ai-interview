
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalInterviews: 0,
    averageScore: 0,
    results: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }

  useEffect(() => {
    const controller = new AbortController();

    async function fetchResults() {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/interviews/my-results`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          }
        );

        const data = await response.json();

        if (response.status === 401 || response.status === 403) {
          // Sirf authentication reject hone par login par bhejo.
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login", { replace: true });
          return;
        }

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load interview results."
          );
        }

        setStats({
          totalInterviews: data.totalInterviews ?? 0,
          averageScore: data.averageScore ?? 0,
          results: Array.isArray(data.results) ? data.results : [],
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Dashboard error:", err);
          setError(
            "Interview results load nahi hue. Backend connection check karein."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchResults();

    return () => controller.abort();
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  }

  function openInterviewHistory() {
    document.getElementById("history")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  const questionsAnswered = stats.results.reduce(
    (total, result) =>
      total + (Number(result.answeredQuestions) || 0),
    0
  );

  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <h2 className="dashboard-brand">
          Interview<span>AI</span>
        </h2>

        <nav className="dashboard-nav">
          <button
            type="button"
            className="dashboard-nav-button active"
            onClick={() => navigate("/dashboard")}
          >
            <span>▦</span> Dashboard
          </button>

          <button
            type="button"
            className="dashboard-nav-button"
            onClick={() => navigate("/interview")}
          >
            <span>▤</span> Practice Interview
          </button>

          <button
            type="button"
            className="dashboard-nav-button"
            onClick={openInterviewHistory}
          >
            <span>◷</span> Interview History
          </button>
        </nav>

        <div className="dashboard-sidebar-bottom">
          <div className="dashboard-user-mini">
            <div className="dashboard-avatar">
              {(user?.name || "U").charAt(0).toUpperCase()}
            </div>

            <div className="dashboard-user-info">
              <strong>{user?.name || "User"}</strong>
              <span>Interview Candidate</span>
            </div>
          </div>

          <button
            type="button"
            className="dashboard-logout"
            onClick={handleLogout}
          >
            ↪ Logout
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <p className="dashboard-eyebrow">YOUR WORKSPACE</p>
            <h2>Dashboard</h2>
          </div>

          <div className="dashboard-topbar-user">
            <div className="dashboard-avatar">
              {(user?.name || "U").charAt(0).toUpperCase()}
            </div>
            <span>{user?.name || "User"}</span>
          </div>
        </header>

        <section className="dashboard-welcome">
          <div>
            <p className="dashboard-eyebrow">YOUR PROGRESS</p>
            <h1>Welcome back, {user?.name || "User"}!</h1>
            <p>
              Keep practising and get ready for your next interview.
            </p>
          </div>

          <button
            type="button"
            className="dashboard-primary-btn"
            onClick={() => navigate("/interview")}
          >
            + Start Interview
          </button>
        </section>

        {error && (
          <div className="dashboard-error" role="alert">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        )}

        <section className="dashboard-stats">
          <article className="dashboard-card stat-card">
            <div className="stat-card-top">
              <span className="stat-icon purple">▤</span>
              <span className="stat-label">OVERALL ACTIVITY</span>
            </div>
            <h3>{loading ? "..." : stats.totalInterviews}</h3>
            <p>Total Interviews</p>
          </article>

          <article className="dashboard-card stat-card">
            <div className="stat-card-top">
              <span className="stat-icon green">↗</span>
              <span className="stat-label">PERFORMANCE</span>
            </div>
            <h3>
              {loading ? "..." : `${stats.averageScore}%`}
            </h3>
            <p>Average Score</p>
          </article>

          <article className="dashboard-card stat-card">
            <div className="stat-card-top">
              <span className="stat-icon orange">✓</span>
              <span className="stat-label">PRACTICE</span>
            </div>
            <h3>{loading ? "..." : questionsAnswered}</h3>
            <p>Questions Answered</p>
          </article>
        </section>

        <section
          className="dashboard-card history-card"
          id="history"
        >
          <div className="history-heading">
            <div>
              <h2>Previous Interview Results</h2>
              <p>Your recent interview performance and scores.</p>
            </div>

            <span className="history-count">
              {loading
                ? "Loading..."
                : `${stats.results.length} results`}
            </span>
          </div>

          {loading ? (
            <div className="dashboard-empty">
              Loading your interview history...
            </div>
          ) : stats.results.length === 0 ? (
            <div className="dashboard-empty">
              <div className="empty-icon">▤</div>
              <h3>No interviews yet</h3>
              <p>
                Complete your first practice interview to see your
                score and results here.
              </p>
              <button
                type="button"
                className="dashboard-primary-btn"
                onClick={() => navigate("/interview")}
              >
                Start Your First Interview
              </button>
            </div>
          ) : (
            <div className="dashboard-table-wrap">
              <table className="dashboard-results-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Score</th>
                    <th>Correct Answers</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {stats.results.map((result) => (
                    <tr key={result._id}>
                      <td>
                        <span className="category-badge">
                          {result.category || "General"}
                        </span>
                      </td>

                      <td>
                        <div className="score-cell">
                          <strong>{result.score ?? 0}%</strong>
                          <div className="score-track">
                            <div
                              className="score-fill"
                              style={{
                                width: `${Math.min(
                                  100,
                                  Math.max(
                                    0,
                                    Number(result.score) || 0
                                  )
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      <td>
                        {result.correctAnswers ?? 0} /{" "}
                        {result.totalQuestions ?? 0}
                      </td>

                      <td>
                        {result.createdAt
                          ? new Date(
                              result.createdAt
                            ).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <footer className="dashboard-footer">
          InterviewAI · Keep learning, keep improving.
        </footer>
      </main>
    </div>
  );
}
