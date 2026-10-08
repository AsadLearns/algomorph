import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="page-shell narrow-page">
      <section className="content-panel">
        <p className="eyebrow">Dashboard</p>
        <h1>Your learning progress</h1>

        <div className="stats-grid dashboard-grid">
          <div className="stat-card">
            <strong>8</strong>
            <span>Patterns completed</span>
          </div>
          <div className="stat-card">
            <strong>14</strong>
            <span>Practice streak</span>
          </div>
          <div className="stat-card">
            <strong>91%</strong>
            <span>Recall accuracy</span>
          </div>
        </div>

        <div className="two-column layout-card">
          <div>
            <h3>Current focus</h3>
            <ul className="check-list">
              <li>Two Pointers</li>
              <li>Sliding Window</li>
              <li>Monotonic Stack</li>
            </ul>
          </div>
          <div>
            <h3>Suggested next challenge</h3>
            <Link href="/visualizer" className="primary-btn inline-btn">
              Continue visualizer
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
