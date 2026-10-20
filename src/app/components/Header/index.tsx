import Link from "next/link";

const navLinks = [
  { href: "/", label: "Gallery", current: true },
  { href: "/about", label: "About", current: false },
];

const Header = () => (
  <header className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline py-7">
    <Link
      href="/"
      className="font-display text-[28px] tracking-[-0.3px] text-ink no-underline hover:text-ink"
    >
      Art by <em>Color</em>
    </Link>
    <nav
      aria-label="Main"
      className="flex items-center gap-7 text-sm font-medium"
    >
      {navLinks.map(({ href, label, current }) => (
        <Link
          key={label}
          href={href}
          aria-current={current ? "page" : undefined}
          className={`text-ink hover:text-ink ${
            current
              ? "underline decoration-1 underline-offset-[6px]"
              : "no-underline"
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  </header>
);

export default Header;
