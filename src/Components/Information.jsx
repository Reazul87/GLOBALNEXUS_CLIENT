import React from "react";

const Information = () => {
  const information = [
    {
      img: "./Objective.png",
      title: "Objective",
      description:
        "The objective of the Import Export Hub is to improve trade transparency and compliance by ensuring easy access to the required information.",
    },
    {
      img: "./Features.png",
      title: "Features",
      description:
        "Import Export Hub provides easily searchable HS Code-wise information on General Requirements, Product-specific Requirements, Duties and Taxes Benefits, Preferential Benefits, Approximate Duty Calculator including their legislative references.",
    },
    {
      img: "./Beneficiary.png",
      title: "Beneficiary",
      description:
        "The Hub is useful for exporters, importers, C&F agents, officials from regulatory agencies including Customs, as well as trade researchers.",
    },
  ];

  return (
    <div className="w-[95%] mx-auto my-6 sm:my-8 px-4 sm:px-6">
      <h2 className="text-center font-bold text-2xl sm:text-4xl">
        Why Global Nexus?
      </h2>
      <div className="relative bg-[url('./GlobalNexus.png')] bg-contain bg-no-repeat bg-center min-h-[20rem] sm:min-h-[30rem] md:min-h-[40rem] w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full pt-4 sm:pt-8">
          {information.map((info, ind) => (
            <div
              key={ind}
              className="bg-white/70 shadow-lg p-4 sm:p-6 rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-xl"
            >
              <figure className="mb-4 flex justify-center">
                <img
                  src={info.img}
                  alt={info.title}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                />
              </figure>

              <h2 className="font-bold text-lg md:text-2xl mb-2 text-[#FF6F00] text-center">
                {info.title}
              </h2>

              <p className="font-medium text-gray-700 text-sm md:text-base text-center leading-relaxed">
                {info.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Information;
