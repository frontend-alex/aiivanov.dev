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