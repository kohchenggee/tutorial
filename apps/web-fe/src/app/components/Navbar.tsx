import Link from 'next/link';

const links = [{ href: '/client', label: 'client' }];

const Navbar = () => {
  return (
    <nav>
      <div>
        <Link href="/">Homepage</Link>
        <ul>
          {links.map((link) => {
            return (
              <li>
                <Link href={link.href}>{link.label}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
