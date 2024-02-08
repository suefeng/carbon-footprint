import Link from "next/link";

export default function Nav({
  links,
}: {
  links: { name: string; href: string }[];
}) {
  return (
    <nav className="flex gap-4 p-2 md:px-24">
      {links.map((link) => (
        <Link href={link.href} key={link.name} className="hover:underline">
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
