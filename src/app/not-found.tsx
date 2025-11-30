import { HoverSlideButton } from "@/components/ui"

const page = () => {
    return (
        <div className="min-h-screen flex items-center justify-evenly">
            <div className="text-center">
                <p>cheecky</p>
                <h1 className="text-9xl font-black uppercase">404 Not Found</h1>
                <HoverSlideButton mixBlend={false} className="mt-20" href="/">Go Back Home</HoverSlideButton>
            </div>
        </div>
    )
}

export default page