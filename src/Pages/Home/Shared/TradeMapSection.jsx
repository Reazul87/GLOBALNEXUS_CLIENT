import React from "react";
import { motion } from "framer-motion";
import { MapPin, Plane } from "lucide-react";

const hubs = [
  { name: "Singapore Hub", top: "60%", left: "75%" },
  { name: "Rotterdam Port", top: "35%", left: "48%" },
  { name: "New York Terminal", top: "40%", left: "25%" },
  { name: "Dubai Logistics", top: "52%", left: "58%" },
];

const TradeMapSection = () => {
  return (
    <section className="py-6 md:py-10 bg-slate-900 text-white overflow-hidden relative">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6">
            Real-Time Global <br />
            <span className="text-blue-400">Connectivity</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Our network covers over 140+ ports globally. Monitor your cargo,
            calculate regional taxes, and find local agents in seconds.
          </p>
          <div className="space-y-4">
            {[
              "AI-Route Optimization",
              "Instant Customs Clearance",
              "Localized Legal Support",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                </div>
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-video bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          {hubs.map((hub, i) => (
            <motion.div
              key={i}
              className="absolute group"
              style={{ top: hub.top, left: hub.left }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
            >
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-gray-900 text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {hub.name}
              </span>
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-blue-400 rounded-full"
                />
                <div className="relative w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
              </div>
            </motion.div>
          ))}

          <motion.div
            animate={{
              x: [0, 300, 600],
              y: [0, -50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-0 text-blue-400/30"
          >
            <Plane size={40} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TradeMapSection;
