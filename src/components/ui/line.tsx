import { cn } from "@/lib/utils";

export const Line = ({
  className,
  direction,
}: {
  className?: string;
  direction?: "horizontal" | "vertical";
}) => {
  return (
    <div className={cn(
        "bg-accent hidden lg:flex",
        direction === "horizontal" ? "w-full h-px" : "h-full w-px",
        className
    )} />
  );
};
