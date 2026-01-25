// import React from "react";
// import { HiOutlineMapPin } from "react-icons/hi2";
// import { Link } from "react-router";
// import { FaStar, FaStarHalf } from "react-icons/fa";
// import RightDate from "./RightDate";

// const ProductCard = ({ product }) => {
  
//   return (
//     <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 h-full flex flex-col">
//       <div>
//         <img
//           className="h-70 w-full object-cover"
//           src={product.product_image}
//           alt={product.product_name}
//         />
//       </div>

//       <div className="p-5 flex flex-col flex-grow">
//         <h1 className="block mt-1 text-lg md:text-2xl leading-tight font-extrabold text-gray-900 hover:text-[#FF974D] transition duration-1000">
//           {product.product_name}
//         </h1>

//         <div className="mt-auto pt-2 border-t border-gray-100">
//           <div className="mt-3 flex justify-between gap-4 text-sm">
//             <div className="flex items-center space-x-1 text-gray-700">
//               <HiOutlineMapPin size={17} />
//               <span className="font-medium">{product.origin_country}</span>
//             </div>

//             <div className="flex items-center">
//               {product.rating > 4.7 ? (
//                 <FaStar className="w-5 h-5 text-yellow-400" />
//               ) : (
//                 <FaStarHalf className="w-5 h-5 text-yellow-400" />
//               )}
//               <span className="ml-1 text-sm font-semibold text-gray-700">
//                 ({product.rating})
//               </span>
//             </div>
//           </div>

//           <div className="text-xs text-gray-500 italic mt-2.5">
//             At: {RightDate(product.createdAt)}
//           </div>
//         </div>

//         <div className="mt-5">
//           <Link
//             to={`/product-details/${product._id}`}
//             className="btn w-full bg-gradient-to-r from-[#FF974D] to-[#FF6F00] text-white hover:opacity-90 border-none"
//           >
//             See Details
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
// src/Components/ProductCard.jsx
import React from "react";
import { Link } from "react-router";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { HiOutlineMapPin } from "react-icons/hi2";
import CurrencyChange from "./CurrencyChange";
import RightDate from "./RightDate";

const ProductCard = ({ product }) => {
  return (
    <div className="card-hover flex flex-col h-full overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative">
        <img
          src={product.product_image}
          alt={product.product_name}
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-3 right-3 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          {CurrencyChange(product.price)}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow space-y-3">
        <h3 className="text-lg font-bold line-clamp-2">
          {product.product_name}
        </h3>

        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <HiOutlineMapPin size={16} /> {product.origin_country}
          </span>
          <span className="flex items-center gap-1">
            {product.rating > 4.7 ? (
              <FaStar className="text-yellow-400" size={16} />
            ) : (
              <FaStarHalf className="text-yellow-400" size={16} />
            )}
            <span className="font-semibold">({product.rating})</span>
          </span>
        </div>

        <div className="text-sm text-gray-500">
          Added: {RightDate(product.createdAt)}
        </div>

        <Link
          to={`/product-details/${product._id}`}
          className="btn btn-primary mt-auto text-center py-3"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
