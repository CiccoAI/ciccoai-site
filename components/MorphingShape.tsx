import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import * as flubber from "flubber";

gsap.registerPlugin(ScrollTrigger);

const LABELS = [
  { title: "Introduction", index: 0, targetId: null },
  { title: "SERVICES", index: 1, targetId: "services" },
  { title: "HOW IT WORKS", index: 2, targetId: "how" },
  { title: "WHY IT WORKS", index: 3, targetId: "why" },
];

export default function MorphingShape() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const smallSpheresRef = useRef<HTMLDivElement>(null);
  const [activeLabelIndex, setActiveLabelIndex] = useState<number | null>(null);

  let refreshTimeout: ReturnType<typeof setTimeout>;

  const scrollToLabel = (targetId: string | null) => {
    if (!targetId) return;
    const scrollContainer = document.querySelector("#page-wrapper");
    const target = document.getElementById(targetId);
    if (scrollContainer && target) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const scrollOffset = targetRect.top - containerRect.top + scrollContainer.scrollTop;
      gsap.to(scrollContainer, {
        scrollTop: scrollOffset,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          clearTimeout(refreshTimeout);
          refreshTimeout = setTimeout(() => {
            ScrollTrigger.refresh();
            const allTitles = document.querySelectorAll('[id^="snappy-"][id$="-title"]');
            const allTexts = document.querySelectorAll('[id^="snappy-"][id$="-text"]');
            allTitles.forEach((el) => (el as HTMLElement).style.opacity = "0");
            allTexts.forEach((el) => (el as HTMLElement).style.opacity = "0");
            const visibleTitle = document.querySelector(`#${targetId}-title`);
            const visibleText = document.querySelector(`#${targetId}-text`);
            if (visibleTitle && visibleText) {
              gsap.to([visibleTitle, visibleText], {
                opacity: 1,
                x: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            }
          }, 100);
        },
      });
    }
  };

  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
    const isSmallLaptop = window.innerWidth >= 1024 && window.innerWidth <= 1440;
    const scrollContainer = document.querySelector("#page-wrapper");
    const svg = svgRef.current;
    const wrapper = wrapperRef.current;
    const outerCircle = document.getElementById("outerCircle");
    const innerCircle = document.getElementById("innerCircle");
    const innerCircleHighlight = document.getElementById("innerCircleHighlight");
    if (!svg || !wrapper || !scrollContainer || !outerCircle || !innerCircle || !innerCircleHighlight) return;
    gsap.set(wrapper, { autoAlpha: 0 });
    gsap.set(svg, { y: 0, scale: 1 });
    ScrollTrigger.create({
      trigger: "#hero",
      start: "top center",
      end: "top center",
      scroller: scrollContainer,
      onEnter: () => {
        gsap.to(wrapper, {
          autoAlpha: 1,
          duration: 0.8,
          ease: "none",
        });
      },
    });
    const fromY = isMobile ? 300 : isTablet ? 250 : 400;
    const toY = isMobile ? "-40vh" : isTablet ? "-50vh" : "-45vh";
    const fromScale = isMobile ? 1.1 : isTablet ? 1.2 : 1.4;
    const toScale = isMobile ? 0.35 : isTablet ? 0.6 : 0.4;
    gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top center",
        endTrigger: "#services",
        end: "top 10%",
        scrub: true,
        scroller: scrollContainer,
      },
    }).fromTo(
      svg,
      { y: fromY, scale: fromScale },
      { y: toY, scale: toScale, ease: "none" }
    );
    const smallSpheres = document.querySelectorAll(".smallSphere");
    const smallSpheresArray = Array.from(smallSpheres);
    const fourthSphere = smallSpheresArray[3] as SVGGraphicsElement;
    const clone = fourthSphere.cloneNode(true) as SVGGraphicsElement;
    clone.classList.add("clonedSphere");
    fourthSphere.parentElement?.appendChild(clone);
    gsap.set(clone, {
      scale: isMobile ? 0.7 : isTablet ? 0.6 : 1,
      opacity: 0,
      yPercent: 0,
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#services",
        start: "top top",
        endTrigger: "#how",
        end: "+=100%",
        scrub: true,
        scroller: scrollContainer,
      },
    });
    tl.to([outerCircle, innerCircleHighlight], {
      opacity: 0,
      ease: "none",
      duration: 0.2,
    })
      .to([innerCircle], {
        opacity: 0,
        duration: 0.2,
        ease: "none",
      })
      .to(smallSpheresRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: "none",
      });
    const centerIndex = Math.floor(smallSpheres.length / 2);
    const spacing = isMobile ? 70 : isTablet ? 140 : 165;
    const scaling = isMobile ? 0.7 : isTablet ? 0.7 : 1;
    tl.to(smallSpheres, {
      x: (i) => (i - centerIndex) * spacing,
      y: 0,
      xPercent: -50,
      yPercent: 0,
      scale: scaling,
      duration: 0.4,
      delay: 0.1,
      ease: "none",
    }).to(clone, {
      x: (3 - centerIndex) * spacing,
      y: 0,
      xPercent: -50,
      yPercent: 0,
      scale: scaling,
      duration: 0.1,
      ease: "none",
    });
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#how",
        start: "center center",
        endTrigger: "#why",
        end: "top 10%",
        scrub: true,
        scroller: scrollContainer,
      },
    });
    const circlePaths = document.querySelectorAll(".smallSphere .morph-shape");
    const highlightPaths = document.querySelectorAll(".smallSphere .morph-shape-highlight");
    const originalShape = "M227 147c0-44.735-36.265-81-81-81s-81 36.265-81 81 36.265 81 81 81 81-36.265 81-81Z";
    const squareShape = `M78,66 H216 C222.627,66 228,71.373 228,78 V216 C228,222.627 222.627,228 216,228 H78 C71.373,228 66,222.627 66,216 V78 C66,71.373 71.373,66 78,66 Z`;
    smallSpheres.forEach((sphere) => {
      masterTimeline.to(sphere, {
        opacity: 1,
        duration: 0.3,
        ease: "power1.out",
        scrollTrigger: {
          trigger: "#why",
          start: "top bottom",
          end: "top center",
          scrub: true,
          scroller: scrollContainer,
        },
      });
    });
    circlePaths.forEach((path) => {
      const interpolator = flubber.interpolate(originalShape, squareShape, {
        maxSegmentLength: 2,
      }) as (t: number) => string;
      masterTimeline.to(path, {
        duration: 1,
        ease: "power2.inOut",
        onUpdate: function () {
          const tween = this as unknown as gsap.core.Tween;
          const progress = tween.progress();
          (path as SVGPathElement).setAttribute("d", interpolator(progress));
        },
      });
    });
    highlightPaths.forEach((path) => {
      const interpolator = flubber.interpolate(originalShape, squareShape, {
        maxSegmentLength: 2,
      }) as (t: number) => string;
      masterTimeline.to(path, {
        duration: 1,
        ease: "power2.inOut",
        onUpdate: function () {
          const tween = this as unknown as gsap.core.Tween;
          const progress = tween.progress();
          (path as SVGPathElement).setAttribute("d", interpolator(progress));
        },
      }, "<");
    });
    const moveTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#how",
        start: "bottom bottom",
        endTrigger: "#why",
        end: "top top",
        scrub: 0.5,
        scroller: scrollContainer,
      },
    });
    masterTimeline.to({}, {
      duration: 0.2,
    });
    masterTimeline.to(smallSpheresRef.current, {
      gap: isMobile ? "0.1rem" : isTablet ? "0.1rem" : "0px",
      scale: isMobile ? 1 : isTablet ? 1 : 0.82,
      marginBottom: isMobile ? ".5rem" : isTablet ? "2rem" : "0rem",
      marginTop: "4rem",
      opacity: 1,
      duration: 0.2,
      delay: 0.2,
      ease: "power1.inOut",
    });
    smallSpheres.forEach((sphere, index) => {
      const baseOffset = sphere.getBoundingClientRect().height;
      const offset = isMobile ? baseOffset / 2.8 : isTablet ? baseOffset / 2.4 : baseOffset / 2.1;
      let direction = -1;
      if (index === 1) direction = 1;
      if (index === 3) direction = -3;
      if (index === 4) direction = -1;
      masterTimeline.to(sphere, {
        y: direction * offset,
        ease: "power2.inOut",
        duration: 1.6,
      });
    });
    if (clone) {
      const baseOffset = clone.getBoundingClientRect().height;
      const offset = isMobile ? baseOffset / 1.9 : isTablet ? baseOffset / 1.5 : baseOffset / 2.1;
      masterTimeline.fromTo(clone,
        {
          ease: "power2.inOut",
          y: offset,
          opacity: 0,
          duration: 1.6,
        },
        {
          y: offset,
          ease: "power2.inOut",
          opacity: 1,
          duration: 1.6,
        }
      );
    }
    ScrollTrigger.create({
      trigger: "#why",
      start: "top center",
      end: "top bottom",
      scroller: scrollContainer,
      onLeave: () => {
        gsap.to(wrapper, {
          autoAlpha: 0,
          duration: 0.1,
          ease: "power2.out",
        });
      },
    });
    ScrollTrigger.create({
      trigger: "#why",
      start: "top center",
      end: "bottom center",
      scroller: scrollContainer,
      onEnterBack: () => {
        gsap.to(wrapper, {
          autoAlpha: 1,
          duration: 0.05,
          ease: "power2.out",
        });
      },
    });
    [
      { trigger: "#hero", labelIndex: null },
      { trigger: "#services", labelIndex: 1 },
      { trigger: "#how", labelIndex: 2 },
      { trigger: "#why", labelIndex: 3 },
    ].forEach(({ trigger, labelIndex }) => {
      ScrollTrigger.create({
        trigger,
        start: "top center",
        end: "bottom center",
        scroller: scrollContainer,
        onEnter: () => setActiveLabelIndex(labelIndex),
        onEnterBack: () => setActiveLabelIndex(labelIndex),
        onLeave: () => setActiveLabelIndex(null),
        onLeaveBack: () => setActiveLabelIndex(null),
      });
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        gsap.set(svgRef.current, {
          x: 0,
          xPercent: -50,
        });
      }
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={wrapperRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 opacity-100"
      id="masterAnimationWrapper"
    >
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 294 294"
        fill="none"
        className="absolute left-1/2 -bottom-10 md:-bottom-64 lg:-bottom-[20vh] -translate-x-1/2 max-w-screen w-[90vw] md:w-[80vw] lg:w-[40vw] aspect-square"
      >
        <g opacity={0.8} id="outerCircle">
          <g filter="url(#a)">
            <path
              fill="url(#b)"
              d="M294 147C294 65.814 228.186 0 147 0S0 65.814 0 147s65.814 147 147 147 147-65.814 147-147Z"
            />
          </g>
          <path
            stroke="url(#c)"
            strokeWidth={2.5}
            d="M292.75 147C292.75 66.504 227.495 1.25 147 1.25 66.504 1.25 1.25 66.504 1.25 147c0 80.495 65.254 145.75 145.75 145.75 80.495 0 145.75-65.255 145.75-145.75Z"
          />
        </g>
        <g filter="url(#d)" id="innerCircle">
          <path
            fill="url(#e)"
            d="M227 147c0-44.735-36.265-81-81-81s-81 36.265-81 81 36.265 81 81 81 81-36.265 81-81Z"
          />
        </g>
        <path
          id="innerCircleHighlight"
          stroke="url(#f)"
          strokeWidth={2.5}
          d="M225.75 147c0-44.045-35.705-79.75-79.75-79.75S66.25 102.955 66.25 147s35.705 79.75 79.75 79.75 79.75-35.705 79.75-79.75Z"
        />
        {/* ...rest of SVG unchanged... */}
      </svg>
    </div>
  );
} 