import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const videos = [
  "./Slide1.mp4",
  "./Slide2.mp4",
  "./Slide3.mp4",
  "./Slide4.mp4",
  "./Slide5.mp4",
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((pre) => (pre + 1) % videos.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const previous = () =>
    setCurrent((current - 1 + videos.length) % videos.length);
  const next = () => setCurrent((current + 1) % videos.length);

  return (
    <>
      <div className="">
        <div className="relative w-full overflow-hidden bg-black shadow-xl">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {videos.map((src, i) => (
              <div key={i} className="w-full shrink-0 relative">
                <video
                  src={src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-[60vh] object-cover brightness-90"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
              </div>
            ))}
          </div>

          <button
            onClick={previous}
            className="absolute left-4 top-1/2 -translate-y-1/2 light:bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 light:bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {videos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 w-2 rounded-full transition-all ${
                  current === i ? "light:bg-white w-4" : "light:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mb-[50px]"></div>
    </>
  );
};

export default Banner;
