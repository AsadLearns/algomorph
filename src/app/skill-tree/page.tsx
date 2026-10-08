const patterns = [
  "Two Pointers",
  "Sliding Window",
  "Binary Search",
  "Monotonic Stack",
  "Fast & Slow Pointers",
];

export default function SkillTreePage() {
  return (
    <main className="page-shell narrow-page">
      <section className="content-panel">
        <p className="eyebrow">Skill tree</p>
        <h1>Master the interview pattern graph</h1>

        <div className="skill-grid">
          {patterns.map((pattern, index) => (
            <div key={pattern} className={`skill-node ${index === 0 ? "active" : ""}`}>
              {pattern}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
