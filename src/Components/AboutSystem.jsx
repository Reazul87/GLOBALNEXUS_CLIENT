import React from "react";

const AboutSystem = () => {
  return (
    <div className="w-[95%] mx-auto my-6 sm:my-8 px-4 sm:px-6">
      <div className="relative bg-[url('/About.png')] bg-cover bg-no-repeat bg-center rounded-xl min-h-96 sm:min-h-128 md:min-h-160 w-full overflow-hidden">
        <div className="absolute inset-0 bg-[#081C40] opacity-85"></div>

        <div className="relative z-10 p-4 sm:p-8 text-white flex flex-col justify-start h-full">
          <h1 className="pb-4 sm:pb-5 font-bold text-2xl sm:text-4xl text-[#FF6F00]">
            About the System
          </h1>

          <p className="w-full sm:w-4/5 md:w-3/4 text-xs sm:text-sm md:text-base leading-relaxed">
            The Import Export Hub is a comprehensive searchable repository of
            documents, compliances, and conditions required for clearing any
            exportable and imported consignments. The very first-of-its-kind HS
            Code-based tool aims to improve access to information, transparency,
            and predictability related to cross-border trade transactions.
            Traders can access a comprehensive hub that provides HS
            Code-specific product descriptions, required certifications for
            import and export, applicable tariff rates including total tax
            incidence, and information on benefits available for the import or
            export of goods. This platform also supports various e-services,
            such as duty calculations, trade declarations, and updates on
            regulatory changes, significantly enhancing the ease of doing
            business in Bangladesh. Through its user-friendly interface and
            up-to-date information, the portal reflects Bangladesh's commitment
            to adopting digital solutions in public administration and global
            trade facilitation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSystem;
