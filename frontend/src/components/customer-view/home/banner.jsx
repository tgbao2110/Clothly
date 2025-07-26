import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const HomeBanner = ({slides}) => {
  
  const [currentSlide, setCurrentSlide] = useState(0);
  //
  //Auto transition every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000); // or keep your 1000ms

    return () => clearInterval(interval);
  }, [currentSlide]);
  //
  // Previous
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  //
  // Next
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  
  return (
    <div className="relative w-full aspect-[3/1] overflow-hidden">
      {slides.map((slide, i) => (
        <img
          key={i}
          src={slide}
          alt={`slide-${i}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1500 ${
            currentSlide === i ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* == Navigation Buttons == */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}
export default HomeBanner