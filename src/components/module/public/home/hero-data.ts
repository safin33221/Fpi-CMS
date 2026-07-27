import {
  Layers,
  MapPin,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { StaticImageData } from "next/image";

// Local image import



export type Slide = {
  src: StaticImageData | string;
  alt: string;
  caption: string;
};

export type StatItem = {
  label: string;
  value: number;
  suffix: string;
  icon: LucideIcon;
};

export const SLIDES: Slide[] = [
  {
    src: "/fpi1.jpeg",
    alt: "Main academic building of Feni Polytechnic Institute",
    caption: "Academic Building — Main Campus",
  },
  {
    src: "/fpi1.jpeg",
    alt: "Technology Workshop",
    caption: "Technology Workshops & Labs",
  },
  {
    src: "/fpi1.jpeg",
    alt: "Central Library",
    caption: "Central & Digital Library",
  },
  {
    src: "/fpi1.jpeg",
    alt: "Computer Department Lab",
    caption: "Advanced Computer Labs",
  },
  {
    src: "/fpi1.jpeg",
    alt: "Auditorium & Events",
    caption: "Institute Auditorium",
  },
  {
    src: "/fpi1.jpeg",
    alt: "Campus View",
    caption: "Green Campus Environment",
  },
];

export const STATS: StatItem[] = [
  {
    label: "Total Students",
    value: 4200,
    suffix: "+",
    icon: Users,
  },
  {
    label: "Departments",
    value: 7,
    suffix: "",
    icon: Layers,
  },
  {
    label: "Faculty Members",
    value: 130,
    suffix: "+",
    icon: UserCheck,
  },
  {
    label: "Campus Area (Acres)",
    value: 18,
    suffix: "",
    icon: MapPin,
  },
];