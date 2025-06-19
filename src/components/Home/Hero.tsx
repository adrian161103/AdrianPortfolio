import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef, useLayoutEffect} from "react";


gsap.registerPlugin(SplitText);

const Hero: React.FC = () => {
const containerRef = useRef<HTMLDivElement>(null);

useLayoutEffect(() => {
if (!containerRef.current) return;
const ctx= gsap.context(() => {
     const title = containerRef.current!.querySelector('h1') as HTMLElement;
     const subtitle = containerRef.current!.querySelector('h1:nth-of-type(2)') as HTMLElement;
     
       const splitTitle = new SplitText(title, { type: 'words,chars,lines' });
           const splitSubtitle = new SplitText(subtitle, { type: 'words,chars' });
     
  const tl = gsap.timeline({ defaults: 
        { duration: 1.5, 
          y: 25, autoAlpha: 0, 
          ease: 'power2.out', 
          filter: 'blur(10px)',
            start: 'top top', 
            end: 'bottom center',
        },
      });
      tl
        .from(splitTitle.chars, { y: 50, stagger: 0.1 })
        .from(splitSubtitle.chars, { y: 35,  stagger: 0.1 }, 0)
  
    gsap.defaults({
  duration: 2,
  ease: "power2.out",

});
gsap.fromTo(title, { y: -100, x:-460 }, { y: 0,  x:0}
);
gsap.fromTo(subtitle, { y: 100, x:460 }, { y: 0,  x:0});
}, containerRef);


  return () => ctx.revert();
  }, []);

  return (
    <section 
    ref={containerRef}
      id="hero"
      className="
        h-screen w-screen 
        flex flex-col items-center justify-center
        bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#000000_100%)] text-black
      "
    >
      <h1
        className="
        text-9xl font-extrabold 
       
      "
      >
        <span
          className=" text-transparent 
        [-webkit-text-stroke:1px_#000]"
        >
          Adrian{" "}
        </span>
        <span className="text-[#7F5AF0]">Alejos</span>
      </h1>
      <h1 className="text-9xl mb-10">
        <span>Portfolio </span>
        <span>Web</span>
      </h1>
    </section>
  );
}

export default Hero;
