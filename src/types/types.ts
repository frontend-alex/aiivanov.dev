import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type ProjectCard = {
    title: string;
    image: string;
    icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    year: string;
    type: string;
    technologiesText?: string;
    videoUrl: string;
    
}