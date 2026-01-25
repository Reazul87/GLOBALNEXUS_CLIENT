import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "How are shipping tariffs calculated?",
    a: "Tariffs are calculated based on the HS code of the product, the country of origin, and the destination's current trade agreements.",
  },
  {
    q: "Is insurance included in the freight cost?",
    a: "Standard freight usually doesn't include full insurance. We offer integrated Nexus-Shield cargo insurance as an add-on.",
  },
  {
    q: "How do I verify a global buyer?",
    a: "Our platform uses a multi-step verification process including business license checks and past trade history audits.",
  },
  {
    q: "What documents are needed for export?",
    a: "Typically, you need a Commercial Invoice, Packing List, and Bill of Lading. Our automated tool helps generate these.",
  },
];

const FAQAccordion = () => {
  const [activeIdx, setActiveIdx] = useState(null);

  return (
    <section className="md:py-10 py-5 px-6">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-4 md:mb-8">
          <h2 className="text-2xl md:text-4xl font-bold mb-1">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Quick answers to common trade and logistics queries.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-100 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
              >
                <span className="font-bold text-lg">{faq.q}</span>
                {activeIdx === i ? (
                  <Minus className="text-blue-600" />
                ) : (
                  <Plus className="text-gray-400" />
                )}
              </button>

              <AnimatePresence>
                {activeIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-slate-50">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
