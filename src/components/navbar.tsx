import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/visualizer", label: "Visualizer" },
  { href: "/skill-tree", label: "Skill Tree" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
  { href: "/profile", label: "Profile" },
];

export function Navbar() {
  return (
    <header className="topbar">
      <div className="nav-inner">
        <Link href="/" className="brand">AlgoMorph</Link>
        <nav className="nav-links">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
