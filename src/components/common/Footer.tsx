import Link from 'next/link';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

type LinkItem = {
  label: string;
  href: string;
};

type LinkGroup = {
  title: string;
  links: LinkItem[];
};

const LINK_GROUPS: LinkGroup[] = [
  {
    title: 'Academics',
    links: [
      { label: 'Academic Calendar', href: '/academic-calendar' },
      { label: 'Class Routine', href: '/routine' },
      { label: 'Exam Results', href: '/results' },
      { label: 'Syllabus (BTEB)', href: '/syllabus' },
    ],
  },
  {
    title: 'Campus',
    links: [
      { label: 'Admission', href: '/admission' },
      { label: 'Digital Library', href: '/library' },
      { label: 'Hostel & Transport', href: '/campus-life' },
      { label: 'Career & Placement', href: '/career' },
    ],
  },
  {
    title: 'Portal',
    links: [
      { label: 'Student Login', href: '/login/student' },
      { label: 'Teacher Login', href: '/login/teacher' },
      { label: 'Guardian Access', href: '/login/guardian' },
      { label: 'Help & Support', href: '/support' },
    ],
  },
];

export function Footer() {
  return (
    <footer id="contact" className="w-full bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        
        {/* Institute Info & Contact */}
        <div>
          <p className="text-lg font-extrabold text-white">Feni Polytechnic Institute</p>
          <p className="mt-1 text-sm font-medium text-blue-400">Smart ERP Portal</p>
          
          <ul className="mt-5 space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
              <span>Trunk Road, Feni Sadar, Feni-3900, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
              <a href="tel:+8801700000000" className="transition-colors hover:text-white">
                +880 1700-000 000
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
              <a href="mailto:info@fpi.edu.bd" className="transition-colors hover:text-white">
                info@fpi.edu.bd
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Globe className="h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
              <a
                href="https://www.fpi.edu.bd"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                www.fpi.edu.bd
              </a>
            </li>
          </ul>
        </div>

        {/* Navigation Groups */}
        {LINK_GROUPS.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <p className="text-xs font-bold uppercase tracking-wider text-white">{group.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-slate-950/50">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Feni Polytechnic Institute. All rights reserved.</p>
          <p className="text-slate-500">
            Affiliated with <span className="text-slate-400">Bangladesh Technical Education Board (BTEB)</span>
          </p>
        </div>
      </div>
    </footer>
  );
}