import { ProjectCard } from "@/types/types";
import { BookOpen } from "lucide-react";

export const projectsData: ProjectCard[] = [
    {
        title: "PeerLearn",
        image: "/images/peerlearn-cover.jpg",
        videoUrl: "1141438425",
        type: "Web Application",
        year: "2024",
        technologiesText: "React, Next.js, TypeScript, Tailwind CSS, Framer Motion, Shadcn UI, Prisma, PostgreSQL, Supabase",
        icon: BookOpen,
    },
    {
        title: "CGI",
        image: "/images/cgi-cover.jpg",
        videoUrl: "1035212551",
        type: "Web Application",
        year: "2024",
        technologiesText: "React, Next.js, TypeScript, Tailwind CSS, Framer Motion, Shadcn UI, Prisma, PostgreSQL, Supabase",
        icon: BookOpen,
    },
];




export const footerLinks = [
    {
        name: "Sitemap",
        links: [
            {
                name: "Home",
                href: "/"
            },
            {
                name: "Approach",
                href: "/approach"
            },
            {
                name: "Projects",
                href: "/projects"
            },
            {
                name: "Contact",
                href: "/contact"
            },
        ]
    },
    {
        name: "Social",
        links: [
            {
                name: "Instagram",
                href: "https://www.instagram.com/yourrfavalex"
            },
            {
                name: "GitHub",
                href: "https://github.com/frontend-alex"
            },
            {
                name: "LinkedIn",
                href: "https://www.linkedin.com/in/aleksandar-ivanov-0356a8274/"
            },
        ]
    }
]

export const approach = [
    {
        id: "analysis",
        index: "1",
        title: "Analysis",
        subtitle: "User & Business Requirements",
        videoUrl: "",
        smallDescription: "I start by translating user and business needs into clear, actionable requirements.",
        description:
            "I start by translating user and business needs into clear, actionable requirements. This phase prioritizes real value defining what matters most, validating assumptions, and shaping a foundation that aligns technical direction with strategic objectives."
    },
    {
        id: "design",
        index: "2",
        title: "Design",
        subtitle: "Technical Architecture",
        videoUrl: "",
        smallDescription: "I design scalable, maintainable system architectures that bridge design intent with engineering rigor.",
        description:
            "This includes crafting domain models, interaction flows, and data structures that support long-term growth while keeping the codebase clean and resilient."
    },
    {
        id: "validation",
        index: "3",
        title: "Validation",
        subtitle: "Quality Assurance & Delivery",
        videoUrl: "",
        smallDescription: "I validate every solution through performance checks, usability reviews, and quality gates.",
        description:
            "I validate every solution through performance checks, usability reviews, and quality gates to ensure it meets expectations in both function and feel. The result is a production-ready deliverable aligned with user goals and business outcomes."
    }
];
