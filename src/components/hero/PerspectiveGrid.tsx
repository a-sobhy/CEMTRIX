export default function PerspectiveGrid() {
    return (
        <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ perspective: "1000px" }}
        >
            <div
                className="absolute inset-0 origin-bottom"
                style={{ transform: "rotateX(60deg) translateY(100px) scale(2)" }}
            >
                <div
                    className="w-full h-[200%] opacity-20"
                    style={{
                        backgroundImage: `
              linear-gradient(to right, rgba(99, 102, 241, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
            `,
                        backgroundSize: "60px 60px",
                        maskImage:
                            "linear-gradient(to bottom, transparent, black 40%, black 80%, transparent)",
                    }}
                />
            </div>
        </div>
    )
}