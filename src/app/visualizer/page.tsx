export default function VisualizerPage() {
  return (
    <main className="page-shell narrow-page">
      <section className="content-panel">
        <p className="eyebrow">Visualizer</p>
        <h1>Trace execution in real time</h1>

        <div className="visualizer-block">
          <div className="visualizer-array">
            {[4, 2, 7, 1, 9, 5].map((value, index) => (
              <div key={value + index} className={`array-box ${index === 2 ? "active" : ""}`}>
                {value}
              </div>
            ))}
          </div>

          <div className="timeline">
            <span className="chip">i = 0</span>
            <span className="chip">j = 2</span>
            <span className="chip success">swap</span>
          </div>
        </div>
      </section>
    </main>
  );
}
