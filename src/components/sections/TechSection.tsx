const TechSection = () => {
    return (
        <section className="relative max-h-[80dvh] flex items-center justify-center overflow-hidden">
            {/* Video Background - Rotated 90 degrees */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute -z-0"
                style={{
                    transform: 'rotate(90deg) scale(1.5)',
                    transformOrigin: 'center center',
                    width: '100vh',
                    height: '100vw',
                    objectFit: 'cover',
                    left: '50%',
                    top: '50%',
                    marginLeft: '-50vh',
                    marginTop: '-50vw'
                }}
            >
                <source src="/videos/pink bg.mp4" type="video/mp4" />
            </video>

            {/* Content */}
            <div className="h-full">

            </div>
        </section>
    );
};

export default TechSection;