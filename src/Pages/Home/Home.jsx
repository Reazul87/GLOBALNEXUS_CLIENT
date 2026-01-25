import React from "react";
import Information from "../../Components/Information";
import AboutSystem from "../../Components/AboutSystem";
import Banner from "../../Components/Banner";
import Rules from "../../Components/Rules";
import ProductCard from "../../Components/ProductCard";
import { Link, useLoaderData } from "react-router";
import ServicesSection from "./Shared/ServicesSection";
import TradeMapSection from "./Shared/TradeMapSection";
import Testimonials from "./Shared/Testimonials";
import FAQAccordion from "./Shared/FAQAccordion";
import Newsletter from "./Shared/Newsletter";

const Home = () => {
  const latestProducts = useLoaderData();

  return (
    <div>
      <div>
        <Banner />
      </div>

      <div className="w-[95%] mx-auto">
        <h2 className="text-center text-2xl md:text-4xl font-bold mt-10">
          Latest Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5 my-7">
          {latestProducts.map((product) => (
            <div key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to={"/all-products"}
            className="btn bg-gradient-to-r from-[#FF974D] to-[#FF6F00] text-white hover:opacity-90 border-none"
          >
            Show All
          </Link>
        </div>
      </div>
      <ServicesSection></ServicesSection>
      <Testimonials></Testimonials>
      <Rules />
      <AboutSystem />
      <Information />
      <FAQAccordion></FAQAccordion>
      <Newsletter></Newsletter>
      <TradeMapSection></TradeMapSection>
    </div>
  );
};

export default Home;
