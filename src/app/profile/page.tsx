export default function ProfilePage() {
  return (
    <main className="page-shell narrow-page">
      <section className="content-panel">
        <p className="eyebrow">Profile</p>
        <h1>Learning profile</h1>

        <div className="profile-card">
          <h3>Jane Doe</h3>
          <p>Focused on arrays, graphs, and dynamic programming.</p>
          <div className="stats-grid">
            <div className="stat-card">
              <strong>18</strong>
              <span>Sessions</span>
            </div>
            <div className="stat-card">
              <strong>4</strong>
              <span>Badges</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
