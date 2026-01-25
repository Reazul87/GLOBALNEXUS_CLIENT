import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Bell } from "lucide-react";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter an email address");
    toast.success("Welcome to the Nexus network!");
    setEmail("");
  };

  return (
    <section className="py-5 md:py-10 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto max-w-6xl bg-blue-600 rounded-4xl md:rounded-[4rem] p-8 sm:p-12 lg:p-20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-blue-500 rounded-full -mr-10 -mt-10 md:-mr-20 md:-mt-20 opacity-50" />
        <div className="absolute bottom-0 left-0 w-24 h-24 md:w-40 md:h-40 bg-indigo-500 rounded-full -ml-8 -mb-8 md:-ml-10 md:-mb-10 opacity-30" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/30 rounded-full text-blue-50 text-xs md:sm font-semibold mb-3 md:mb-6 backdrop-blur-sm border border-white/10">
              <Bell size={16} className="animate-bounce" />
              <span>Stay Updated on Trade Laws</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-black text-white mb-3 md:mb-6 leading-[1.1]">
              Market intelligence <br className="hidden md:block" /> in your
              inbox.
            </h2>

            <p className="text-blue-100 text-sm md:text-base max-w-md mx-auto lg:mx-0 leading-relaxed">
              Join <span className="text-white font-bold">15,000+</span> traders
              receiving weekly tariff updates and shipping route alerts.
            </p>
          </div>

          <div className="w-full max-w-md mx-auto lg:max-w-none">
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-stretch gap-4 bg-white/10 p-2 md:p-3 rounded-3xl backdrop-blur-md border border-white/20"
            >
              <input
                type="email"
                placeholder="Enter your work email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 rounded-2xl bg-white text-gray-900 outline-none focus:ring-4 focus:ring-blue-400 transition-all text-sm md:text-base"
              />
              <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group active:scale-95">
                Join Now
                <Send
                  size={18}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </button>
            </form>
            <p className="text-[10px] md:text-xs text-blue-200 mt-4 text-center lg:text-left opacity-80">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;
