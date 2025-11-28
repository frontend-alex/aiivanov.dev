"use client";

import gsap from "gsap";
import Matter from "matter-js";

import { useEffect, useRef, useMemo } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

const SOCIAL_ITEMS = [
    { name: "Instagram", href: "https://www.instagram.com/aleksandr_ivanov", color: "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500" },
    { name: "GitHub", href: "https://github.com/aleksandr-ivanov", color: "bg-black" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/aleksandr-ivanov-0b0b0b0/", color: "bg-blue-600" },
] as const;

const FallingObjects = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const runnerRef = useRef<Matter.Runner | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!containerRef.current || !sceneRef.current) return;

        const container = containerRef.current;
        const scene = sceneRef.current;

        let engine: Matter.Engine;
        let runner: Matter.Runner;
        let mouseConstraint: Matter.MouseConstraint;
        let bodies: Array<{ body: Matter.Body; element: HTMLElement; width: number; height: number }> = [];
        let resizeObserver: ResizeObserver;

        function clamp(val: number, min: number, max: number) {
            return Math.max(min, Math.min(max, val));
        }

        const initPhysics = () => {
            engine = Matter.Engine.create();
            engine.gravity = { x: 0, y: 1, scale: 0.001 };
            engine.constraintIterations = 10;
            engine.positionIterations = 20;
            engine.velocityIterations = 16;
            engine.timing.timeScale = 1;

            const wallThickness = 200;
            const containerRect = container.getBoundingClientRect();

            const walls = [
                Matter.Bodies.rectangle(
                    containerRect.width / 2,
                    containerRect.height + wallThickness / 2,
                    containerRect.width + wallThickness * 2,
                    wallThickness,
                    { isStatic: true }
                ),
                Matter.Bodies.rectangle(
                    -wallThickness / 2,
                    containerRect.height / 2,
                    wallThickness,
                    containerRect.height + wallThickness * 2,
                    { isStatic: true }
                ),
                Matter.Bodies.rectangle(
                    containerRect.width + wallThickness / 2,
                    containerRect.height / 2,
                    wallThickness,
                    containerRect.height + wallThickness * 2,
                    { isStatic: true }
                ),
            ];
            Matter.World.add(engine.world, walls);

            const objects = scene.querySelectorAll(".falling-object");
            objects.forEach((obj, index) => {
                const element = obj as HTMLElement;
                const objRect = element.getBoundingClientRect();

                const startX = Math.random() * (containerRect.width - objRect.width) + objRect.width / 2;
                const startY = -500 - index * 200;
                const startRotation = (Math.random() - 0.5) * Math.PI;

                const body = Matter.Bodies.rectangle(
                    startX,
                    startY,
                    objRect.width,
                    objRect.height,
                    {
                        restitution: 0.5,
                        friction: 0.15,
                        frictionAir: 0.02,
                        density: 0.002,
                    }
                );

                Matter.Body.setAngle(body, startRotation);

                bodies.push({
                    body: body,
                    element: element,
                    width: objRect.width,
                    height: objRect.height,
                });

                Matter.World.add(engine.world, body);
            });

            const mouse = Matter.Mouse.create(container);
            mouse.element.removeEventListener("mousewheel", (mouse as any).mousewheel);
            mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);

            mouseConstraint = Matter.MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.6,
                    render: { visible: false },
                },
            });

            (mouseConstraint.mouse as any).element.oncontextmenu = () => false;

            let dragging: Matter.Body | null = null;
            let originalInertia: number | null = null;
            let isDragging = false;

            Matter.Events.on(mouseConstraint, "startdrag", function (event: any) {
                dragging = event.body;
                isDragging = true;
                (window as any).__isDragging = true;
                if (dragging) {
                    originalInertia = dragging.inertia;
                    Matter.Body.setInertia(dragging, Infinity);
                    Matter.Body.setVelocity(dragging, { x: 0, y: 0 });
                    Matter.Body.setAngularVelocity(dragging, 0);
                }
            });

            Matter.Events.on(mouseConstraint, "enddrag", function () {
                if (dragging) {
                    Matter.Body.setInertia(dragging, originalInertia || 1);
                    dragging = null;
                    originalInertia = null;
                }
                setTimeout(() => {
                    isDragging = false;
                    (window as any).__isDragging = false;
                }, 100);
            });

            Matter.Events.on(engine, "beforeUpdate", function () {
                if (dragging) {
                    const found = bodies.find((b) => b.body === dragging);
                    if (found) {
                        const minX = found.width / 2;
                        const maxX = containerRect.width - found.width / 2;
                        const minY = found.height / 2;
                        const maxY = containerRect.height - found.height / 2;

                        Matter.Body.setPosition(dragging, {
                            x: clamp(dragging.position.x, minX, maxX),
                            y: clamp(dragging.position.y, minY, maxY),
                        });

                        Matter.Body.setVelocity(dragging, {
                            x: clamp(dragging.velocity.x, -20, 20),
                            y: clamp(dragging.velocity.y, -20, 20),
                        });
                    }
                }
            });

            container.addEventListener("mouseleave", () => {
                if (mouseConstraint.constraint) {
                    (mouseConstraint.constraint as any).bodyB = null;
                    (mouseConstraint.constraint as any).pointB = null;
                }
            });

            document.addEventListener("mouseup", () => {
                if (mouseConstraint.constraint) {
                    (mouseConstraint.constraint as any).bodyB = null;
                    (mouseConstraint.constraint as any).pointB = null;
                }
            });

            Matter.World.add(engine.world, mouseConstraint);

            runner = Matter.Runner.create();
            Matter.Runner.run(runner, engine);

            // Optimized update loop with RAF
            let animationFrameId: number;
            function updatePositions() {
                bodies.forEach(({ body, element, width, height }) => {
                    const x = body.position.x;
                    const y = body.position.y;
                    const angle = body.angle;

                    // Use transform3d for GPU acceleration
                    element.style.transform = `translate3d(${x - width / 2}px, ${y - height / 2}px, 0) rotate(${angle}rad)`;
                });

                animationFrameId = requestAnimationFrame(updatePositions);
            }
            updatePositions();

            // Throttled resize handler for better performance
            let resizeTimeout: NodeJS.Timeout;
            const handleResize = () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    const width = container.clientWidth;
                    const height = container.clientHeight;

                    Matter.Body.setPosition(walls[0], { x: width / 2, y: height + wallThickness / 2 });
                    Matter.Body.setVertices(walls[0], Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width + wallThickness * 2, wallThickness).vertices);

                    Matter.Body.setPosition(walls[1], { x: -wallThickness / 2, y: height / 2 });
                    Matter.Body.setVertices(walls[1], Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height + wallThickness * 2).vertices);

                    Matter.Body.setPosition(walls[2], { x: width + wallThickness / 2, y: height / 2 });
                    Matter.Body.setVertices(walls[2], Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height + wallThickness * 2).vertices);
                }, 150); // Throttle resize
            };

            resizeObserver = new ResizeObserver(() => {
                handleResize();
            });
            resizeObserver.observe(container);

            handleResize();
        };

        ScrollTrigger.create({
            trigger: container,
            start: "top bottom",
            once: true,
            onEnter: () => {
                if (!engine) initPhysics();
            },
        });

        return () => {
            if (engine) {
                Matter.World.clear(engine.world, false);
                Matter.Engine.clear(engine);
                if (runner) Matter.Runner.stop(runner);
            }
            if (resizeObserver) resizeObserver.disconnect();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 z-10 overflow-hidden pointer-events-auto">
            <div ref={sceneRef} className="absolute inset-0 pointer-events-none">
                {items.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                            if ((window as any).__isDragging) {
                                e.preventDefault();
                            }
                        }}
                        onMouseDown={() => {
                            (window as any).__dragStartTime = Date.now();
                        }}
                        className={`falling-object absolute z-50 ${item.color} text-white px-6 py-3 rounded-full text-xl font-medium cursor-grab active:cursor-grabbing`}
                        style={{
                            transform: 'translate3d(-1000px, -1000px, 0)',
                            willChange: 'transform',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                        }}
                    >
                        {item.name}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default FallingObjects;
