import {
  LayersIcon,
  MapPinnedIcon,
  UserCheckIcon,
  UsersIcon,
} from "lucide-react";

export type Slide = {
  src: string;
  alt: string;
  caption: string;
};

export const SLIDES: Slide[] = [
  {
    src: "/images/hero/campus-1.jpg",
    alt: "Main academic building of Feni Polytechnic Institute",
    caption: "Academic Building — Main Campus",
  },
  {
    src: "/images/hero/campus-2.jpg",
    alt: "Technology Workshop",
    caption: "Technology Workshops & Labs",
  },
  {
    src: "/images/hero/campus-3.jpg",
    alt: "Library",
    caption: "Central & Digital Library",
  },
  {
    src: "/images/hero/campus-3.jpg",
    alt: "Library",
    caption: "Central & Digital Library",
  },
  {
    src: "/images/hero/campus-3.jpg",
    alt: "Library",
    caption: "Central & Digital Library",
  },
  {
    src: "/images/hero/campus-3.jpg",
    alt: "Library",
    caption: "Central & Digital Library",
  },
];

export const STATS = [
  {
    label: "Total Students",
    value: 4200,
    suffix: "+",
    icon: UsersIcon,
  },
  {
    label: "Departments",
    value: 7,
    suffix: "",
    icon: LayersIcon,
  },
  {
    label: "Faculty Members",
    value: 130,
    suffix: "+",
    icon: UserCheckIcon,
  },
  {
    label: "Campus Area (Acres)",
    value: 18,
    suffix: "",
    icon: MapPinnedIcon,
  },
];