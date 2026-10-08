import Link from "next/link";

const features = [
  { title: "Step-by-step visual execution", text: "Track arrays, pointers, stacks, and state transitions frame by frame." },
  { title: "Pattern-based learning", text: "Focus on the interview patterns that matter most in real problem solving." },
  { title: "Active recall checkpoints", text: "Answer prediction prompts in the middle of each algorithm to strengthen memory." },
];

const stats = [
  { label: "Patterns", value: "12+" },
  { label: "Practice flows", value: "50+" },
  { label: "Recall score", value: "92%" },
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">AlgoMorph · interview mastery</p>
          <h1>Learn algorithms the way great engineers think.</h1>
          <p className="hero-text">
            Build intuition, trace execution, and master high-frequency DSA patterns with a visual,
            interactive learning engine.
          </p>

          <div className="cta-row">
            <Link href="/visualizer" className="primary-btn">Open visualizer</Link>
            <Link href="/dashboard" className="secondary-btn">View dashboard</Link>
          </div>

          <div className="stats-grid">
            {stats.map((item) => (
              <div key={item.label} className="stat-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-panel">
          <div className="mock-window">
            <div className="mock-header">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>

            <div className="mock-body">
              <div className="array-row">
                {[2, 4, 7, 1, 9].map((n, idx) => (
                  <div key={idx} className={`array-box ${idx === 2 ? "active" : ""}`}>
                    {n}
                  </div>
                ))}
              </div>

              <div className="timeline">
                <span className="chip">left = 0</span>
                <span className="chip">right = 4</span>
                <span className="chip success">mid = 2</span>
              </div>

              <div className="mini-graph">
                <span style={{ height: "40%" }} />
                <span style={{ height: "60%" }} />
                <span style={{ height: "85%" }} />
                <span style={{ height: "70%" }} />
                <span style={{ height: "100%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="info-grid section-spacing">
        {features.map((feature) => (
          <article key={feature.title} className="feature-card">
            <div className="feature-badge">•</div>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
