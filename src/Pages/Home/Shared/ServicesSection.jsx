import React from "react";
import { motion } from "framer-motion";
import {
  Ship,
  Gavel,
  FileText,
  Globe2,
  CreditCard,
  Headphones,
} from "lucide-react";

const services = [
  {
    title: "Ocean Freight",
    desc: "Global container shipping with real-time GPS tracking.",
    icon: Ship,
  },
  {
    title: "Tariff Analysis",
    desc: "AI-powered HS code and tax calculations for 150+ countries.",
    icon: Gavel,
  },
  {
    title: "Documentation",
    desc: "Automated Bill of Lading and Certificate of Origin generation.",
    icon: FileText,
  },
  {
    title: "Market Insights",
    desc: "Daily reports on global demand trends and price shifts.",
    icon: Globe2,
  },
  {
    title: "Secure Payments",
    desc: "Escrow services ensuring safe cross-border transactions.",
    icon: CreditCard,
  },
  {
    title: "24/7 Concierge",
    desc: "Expert trade consultants available via live chat.",
    icon: Headphones,
  },
];

const ServicesSection = () => {
  return (
    <section className="py-5 md:py-10 px-6">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-4 md:mb-8">
          <h2 className="text-2xl md:text-4xl font-bold mb-2">
            Trade Solutions for Modern Exporters
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Everything you need to navigate the complexities of global commerce
            in one dashboard.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8 }}
              className="p-8 bg-gray-100 rounded-2xl border border-gray-100 shadow-sm group"
            >
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-2 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
