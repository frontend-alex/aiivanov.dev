import { ProjectCard } from "@/types/types";
import { Notebook } from "lucide-react";

export const projectsData: ProjectCard[] = [
    {
        title: "PeerLearn",
        image: "/images/peerlearn-cover.jpg",
        icon: <Notebook size={14} />,
        year: "2025",
        type: "Web App",
        technologiesText: "React, .NET, SQL,  TypeScript, Tailwind CSS, Framer Motion, Shadcn UI, Gsap, React Flow, C#",
        videoUrl: "https://player.vimeo.com/video/1141438425?background=1&autoplay=1&loop=1&dnt=1&app_id=aiivanov"
    },
    {
        title: "CGI",
        image: "/images/cgi-cover.jpg",
        icon: <Notebook size={14} />,
        year: "2025",
        type: "Web App",
        technologiesText: "React, Next.js, TypeScript, Tailwind CSS, Framer Motion, Shadcn UI, Gsap, React Flow, Node.js, Express.js, MongoDB, Mongoose,",
        videoUrl: "https://player.vimeo.com/video/1141438425?background=1&autoplay=1&loop=1&dnt=1&app_id=aiivanov"
    },

]


export const footerLinks = [
    {
        name: "Sitemap",
        links: [
            {
                name: "Home",
                href: "/"
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

export const stickyCardsData = [
    {
        index: "01",
        title: "Analysis",
        image: "/sticky-cards/card_1.jpg",
        subtitle: "User Specifications",
        description:
            "I gather and validate requirements stakeholders place on applications, prioritizing specifications based on their business value and documenting them through comprehensive analysis documents validated via acceptance tests.",
    },
    {
        index: "02",
        title: "Design",
        image: "/sticky-cards/card_2.jpg",
        subtitle: "Software & Database Architecture",
        description:
            "I create maintainable and secure technical designs using standard notation methods, translating specifications into scalable architecture diagrams, domain models, and database schemas that accommodate future growth.",
    },
    {
        index: "03",
        title: "Managing",
        image: "/sticky-cards/card_3.jpg",
        subtitle: "Version Control & Testing",
        description:
            "I employ industry-standard techniques including Git version control, automated testing frameworks, and iterative development processes to continuously improve code quality through incremental changes and comprehensive test coverage.",
    },
    {
        index: "04",
        title: "Validation",
        image: "/sticky-cards/card_4.jpg",
        subtitle: "Quality Assurance & Delivery",
        description:
            "I ensure deliverables meet stakeholder expectations through rigorous validation processes, including user acceptance testing, performance benchmarking, and security audits, guaranteeing production-ready solutions that align with business objectives.",
    },
];