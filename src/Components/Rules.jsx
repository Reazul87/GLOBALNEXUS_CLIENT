import React from "react";

const Rules = () => {
  const rules = [
    {
      img: "./Icon_General Documents.svg",
      title: "General Documents",
      description: "General Documents for Import and Export",
    },
    {
      img: "./Icon_Product-Specific Documents.svg",
      title: "Product-Specific Documents",
      description:
        "Specific Documents for HS Codes, Legislative References, and Issuing Agency",
    },
    {
      img: "./Icon_Tariff Rate_1.svg",
      title: "Tariff and Rate",
      description: "Tariff Rate Information on Various Duty Rates for Products",
    },
    {
      img: "./Icon_Duty & TAX_1.svg",
      title: "Duty & Tax Benefits",
      description: "Fiscal Incentives for Imports and Exports in Bangladesh",
    },
    {
      img: "./Icon_Approximate Duty Calculator_1.svg",
      title: "Approximate Duty Calculator",
      description:
        "Estimate Total Tax for Importing/Exporting Products from Bangladesh",
    },
  ];

  return (
    <div className="py-6 sm:py-8">
      <h2 className="text-center pb-5 sm:pb-7 font-bold text-2xl sm:text-4xl">
        Trade Rules & Requirements
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 w-[95%] mx-auto px-4 sm:px-6">
        {rules.map((rule, ind) => (
          <div
            key={ind}
            className="bg-gray-100 shadow-md flex flex-col justify-start items-center sm:p-4 border border-gray-100 rounded-lg transition-all duration-300 hover:shadow-lg min-h-56"
          >
            <figure className="mb-3 sm:mb-4">
              <img
                src={rule.img}
                alt={rule.title}
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
              />
            </figure>
            <div className="text-center">
              <h2 className="font-semibold text-base sm:text-xl text-gray-800 mb-1 sm:mb-2">
                {rule.title}
              </h2>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed px-2">
                {rule.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rules;
