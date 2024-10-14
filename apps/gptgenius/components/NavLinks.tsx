import Link from 'next/link';

const links = [
  { href: '/chat', label: 'chat' },
  { href: '/profile', label: 'profile' },
  { href: '/tours', label: 'tours' },
  { href: '/tours/new-tour', label: 'new tour' },
];

const NavLinks = () => {
  return (
    <div className="menu text-base-content">
      {links.map((link) => {
        return <Link className={`p-2 hover:bg-sky-200`} href={link.href}>{link.label}</Link>;
      })}
    </div>
  );
};

export default NavLinks;
