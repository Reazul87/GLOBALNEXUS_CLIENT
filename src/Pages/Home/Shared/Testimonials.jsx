import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const reviews = [
  {
    name: "Marco Rossi",
    role: "Coffee Exporter",
    img: "https://i.pravatar.cc/150?u=marco",
    text: "Global Nexus reduced our documentation time by 60%. The HS code finder is a absolute lifesaver for our Italian exports.",
    stars: 5,
  },
  {
    name: "Sarah Chen",
    role: "Logistics Manager",
    img: "https://i.pravatar.cc/150?u=sarah",
    text: "The most intuitive trade platform I've used in 15 years. The verified buyer network is top-notch and highly reliable.",
    stars: 5,
  },
  {
    name: "Ahmed Khan",
    role: "Textile Manufacturer",
    img: "https://i.pravatar.cc/150?u=ahmed",
    text: "Secure escrow payments gave us the confidence to expand into the European market without worrying about payment defaults.",
    stars: 5,
  },
  {
    name: "Elena Petrova",
    role: "Customs Broker",
    img: "https://i.pravatar.cc/150?u=elena",
    text: "Handling cross-border paperwork is now seamless. The automated compliance checks prevent costly shipping delays.",
    stars: 5,
  },
  {
    name: "David Smith",
    role: "Supply Chain Director",
    img: "https://i.pravatar.cc/150?u=david",
    text: "The real-time tracking and tariff calculations are game changers for our North American distribution network.",
    stars: 4,
  },
  {
    name: "Yuki Tanaka",
    role: "Electronics Exporter",
    img: "https://i.pravatar.cc/150?u=yuki",
    text: "Verified supplier badges helped us establish trust quickly in the South Asian market. Excellent platform support.",
    stars: 5,
  },
  {
    name: "Carlos Gomez",
    role: "Produce Distributor",
    img: "https://i.pravatar.cc/150?u=carlos",
    text: "Scaling our fruit export business was made possible by the simplified logistics dashboard. Highly recommended.",
    stars: 5,
  },
  {
    name: "Linda Wu",
    role: "Trade Consultant",
    img: "https://i.pravatar.cc/150?u=linda",
    text: "I recommend Global Nexus to all my clients. It's the only tool that truly centralizes global trade data effectively.",
    stars: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-5 md:py-6 px-6 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-4 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              Voices of <span className="text-blue-600">Global Commerce</span>
            </h2>
            <p className="text-gray-500 mt-1 text-sm md:text-base max-w-2xl mx-auto">
              Trusted by thousands of exporters and logistics professionals
              worldwide.
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation={true}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10! overflow-visible! flex-stretch-swiper"
          >
            {reviews.map((rev, i) => (
              <SwiperSlide key={i} className="h-auto">
                <div className="p-8 rounded-[2.5rem] bg-gray-100 border border-slate-100 shadow-sm hover:shadow-xs transition-all duration-500 flex flex-col h-full relative group">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, s) => (
                      <Star
                        key={s}
                        size={16}
                        className={`${
                          s < rev.stars
                            ? "text-orange-400 fill-orange-400"
                            : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 italic mb-8 leading-relaxed grow text-lg">
                    "{rev.text}"
                  </p>

                  <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-50">
                    <img
                      src={rev.img}
                      alt={rev.name}
                      className="w-14 h-14 rounded-full border-2 border-blue-100 object-cover shadow-sm"
                    />
                    <div>
                      <p className="font-bold text-gray-900 text-lg">
                        {rev.name}
                      </p>
                      <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider">
                        {rev.role}
                      </p>
                    </div>
                  </div>

                  <div className="absolute top-8 right-8 text-gray-100 group-hover:text-blue-50 transition-colors duration-500">
                    <Quote size={52} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style>{`
        .swiper-wrapper {
          display: flex;
          align-items: stretch;
        }
        .swiper-slide {
          height: auto !important;
          display: flex;
        }
        .swiper-button-next,
        .swiper-button-prev {
          height: 30px;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px !important;
          font-weight: 800;
        }
        .swiper-pagination-bullet-active {
          background: #2563eb !important;
          width: 25px !important;
          border-radius: 10px !important;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
