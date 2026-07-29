import React from 'react'
import Image from 'next/image'
import { Mail, Phone } from 'lucide-react'

type Member = {
  name: string
  role: string
  department?: string
  email: string
  phone: string
  photo?: string
}

const LEADERSHIP: Member[] = [
  {
    name: 'Engr. Md. Abdul Karim',
    role: 'Principal',
    email: 'principal@fpi.edu.bd',
    phone: '+880 1700-000 001',
    photo:
      'https://cdn.magicpatterns.com/patterns/generated-images/7cf0e033-3ae2-4c52-a274-844a86606033.jpg',
  },
  {
    name: 'Engr. Shafiqur Rahman',
    role: 'Vice Principal',
    email: 'viceprincipal@fpi.edu.bd',
    phone: '+880 1700-000 002',
    photo:
      'https://cdn.magicpatterns.com/patterns/generated-images/dc0be763-a429-424d-968c-b8a91074ebb4.jpg',
  },
  {
    name: 'Engr. Nasrin Sultana',
    role: 'Chief Instructor (Academic)',
    email: 'academic@fpi.edu.bd',
    phone: '+880 1700-000 003',
    photo:
      'https://cdn.magicpatterns.com/patterns/generated-images/5341eb90-87dc-4dc0-9338-b9bf07b3bb1f.jpg',
  },
]

const HEADS: Member[] = [
  {
    name: 'Engr. Tanvir Hossain',
    role: 'Head of Department',
    department: 'Civil Technology',
    email: 'civil@fpi.edu.bd',
    phone: '+880 1700-000 010',
  },
  {
    name: 'Engr. Mahmuda Akter',
    role: 'Head of Department',
    department: 'Electrical Technology',
    email: 'electrical@fpi.edu.bd',
    phone: '+880 1700-000 011',
  },
  {
    name: 'Engr. Rafiqul Islam',
    role: 'Head of Department',
    department: 'Mechanical Technology',
    email: 'mechanical@fpi.edu.bd',
    phone: '+880 1700-000 012',
    photo:
      'https://cdn.magicpatterns.com/patterns/generated-images/d5baab9a-e2d1-4058-98c9-960ffaf41ac6.jpg',
  },
  {
    name: 'Engr. Sabrina Chowdhury',
    role: 'Head of Department',
    department: 'Computer Technology',
    email: 'computer@fpi.edu.bd',
    phone: '+880 1700-000 013',
  },
  {
    name: 'Engr. Jahangir Alam',
    role: 'Head of Department',
    department: 'Electronics Technology',
    email: 'electronics@fpi.edu.bd',
    phone: '+880 1700-000 014',
  },
  {
    name: 'Engr. Kamrul Hasan',
    role: 'Head of Department',
    department: 'Power Technology',
    email: 'power@fpi.edu.bd',
    phone: '+880 1700-000 015',
  },
  {
    name: 'Engr. Farhana Yeasmin',
    role: 'Head of Department',
    department: 'Data Telecommunication & Networking',
    email: 'dtn@fpi.edu.bd',
    phone: '+880 1700-000 016',
  },
]

function initials(name: string) {
  const parts = name.replace(/^Engr\.\s*/, '').split(' ')
  return `${parts[0]?.[0] ?? ''}${parts[parts.length - 1]?.[0] ?? ''}`.toUpperCase()
}

function ContactLines({ member }: { member: Member }) {
  return (
    <ul className="mt-3 space-y-1.5 text-xs sm:text-sm">
      <li>
        <a
          href={`mailto:${member.email}`}
          className="inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-blue-600"
        >
          <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
          <span className="truncate">{member.email}</span>
        </a>
      </li>
      <li>
        <a
          href={`tel:${member.phone.replace(/[^+\d]/g, '')}`}
          className="inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-blue-600"
        >
          <Phone className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
          <span>{member.phone}</span>
        </a>
      </li>
    </ul>
  )
}

export function Administration() {
  return (
    <section aria-labelledby="admin-heading" className="w-full bg-slate-50/50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Administration
          </p>
          <h2 id="admin-heading" className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Institute Leadership &amp; Department Heads
          </h2>
        </div>

        {/* Leadership Grid */}
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LEADERSHIP.map((member) => (
            <li
              key={member.email}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={`${member.name}, ${member.role}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-blue-50 text-xl font-bold text-blue-600">
                    {initials(member.name)}
                  </div>
                )}
              </div>
              <div className="p-5 sm:p-6">
                <span className="inline-flex rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700">
                  {member.role}
                </span>
                <h3 className="mt-3 text-base sm:text-lg font-bold text-slate-900">{member.name}</h3>
                <ContactLines member={member} />
              </div>
            </li>
          ))}
        </ul>

        {/* Department Heads Subheading */}
        <h3 className="mt-12 sm:mt-16 text-xs font-bold uppercase tracking-wider text-slate-500">
          Heads of Departments
        </h3>

        {/* Department Heads Grid */}
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HEADS.map((member) => (
            <li
              key={member.email}
              className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md"
            >
              {member.photo ? (
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                  <Image
                    src={member.photo}
                    alt={`${member.name}, Head of ${member.department}`}
                    fill
                    sizes="56px"
                    className="object-cover object-top"
                  />
                </div>
              ) : (
                <span
                  aria-hidden="true"
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600"
                >
                  {initials(member.name)}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">{member.name}</h4>
                <p className="mt-0.5 text-xs sm:text-sm font-semibold text-blue-600">
                  {member.department}
                </p>
                <ContactLines member={member} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}