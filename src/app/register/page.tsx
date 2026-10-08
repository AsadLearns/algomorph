import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="page-shell narrow-page">
      <section className="content-panel auth-panel">
        <p className="eyebrow">Create account</p>
        <h1>Start learning</h1>

        <form className="auth-form">
          <label>
            Full name
            <input type="text" placeholder="Jane Doe" />
          </label>
          <label>
            Email
            <input type="email" placeholder="name@example.com" />
          </label>
          <label>
            Password
            <input type="password" placeholder="Create a strong password" />
          </label>
          <button type="submit" className="primary-btn full-width">Register</button>
        </form>

        <p className="small-note">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}
