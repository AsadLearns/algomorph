import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="page-shell narrow-page">
      <section className="content-panel auth-panel">
        <p className="eyebrow">Account</p>
        <h1>Welcome back</h1>

        <form className="auth-form">
          <label>
            Email
            <input type="email" placeholder="name@example.com" />
          </label>
          <label>
            Password
            <input type="password" placeholder="••••••••" />
          </label>
          <button type="submit" className="primary-btn full-width">Login</button>
        </form>

        <p className="small-note">
          Need an account? <Link href="/register">Create one</Link>
        </p>
      </section>
    </main>
  );
}
