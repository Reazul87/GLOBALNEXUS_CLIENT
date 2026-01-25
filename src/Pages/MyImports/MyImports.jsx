import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { HiOutlineMapPin } from "react-icons/hi2";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { Link } from "react-router";
import toast from "react-hot-toast";
import RightDate from "../../Components/RightDate";
import CurrencyChange from "../../Components/CurrencyChange";

const MyImports = () => {
  const [importedProducts, setImportedProducts] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const { setLoading, user } = useContext(AuthContext);
  useEffect(() => {
    fetch(
      `https://global-nexus-server.vercel.app/my-imports?email=${user.email}`,
      {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setImportedProducts(data);
        // console.log(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, refetch]);

  const handleImportDelete = (id) => {
    fetch(`https://global-nexus-server.vercel.app/import-product/${id}`, {
      method: "delete",
      headers: {
        "content-type": "application/json",
        email: user.email,
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRefetch(!refetch);
        toast.success("Successfully Removed");
        // console.log(data);
      });
  };

  return (
    <div className="w-11/12 mx-auto">
      <title> My Imports</title>
      <h2 className="text-center text-xl md:text-3xl font-bold mt-10">
        My Imports
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 my-7">
        {importedProducts.length > 0 ? (
          importedProducts.map((importedProduct) => (
            <div key={importedProduct._id}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 h-full flex flex-col">
                <div>
                  <img
                    className="h-70 w-full object-cover"
                    src={importedProduct.product_image}
                    alt={importedProduct.product_name}
                  />
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h1 className="block mt-1 text-lg md:text-2xl leading-tight font-extrabold text-gray-900 hover:text-[#FF974D] transition duration-1000">
                    {importedProduct.product_name}
                  </h1>
                  <p className="text-lg text-[#FF6F00] md:text-2xl font-bold mt-2">
                    {CurrencyChange(importedProduct.price)}
                  </p>

                  <div
                    className="mt-auto pt-2 border-t border-gray-100"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="mt-1 flex justify-between gap-4 text-sm">
                      <div className="flex items-center space-x-1 text-gray-700">
                        <HiOutlineMapPin size={17} />
                        <span className="font-medium">
                          {importedProduct.origin_country}
                        </span>
                      </div>

                      <div className="flex items-center">
                        {importedProduct.rating > 4.7 ? (
                          <FaStar className="w-5 h-5 text-yellow-400" />
                        ) : (
                          <FaStarHalf className="w-5 h-5 text-yellow-400" />
                        )}
                        <span className="ml-1 text-sm font-semibold text-gray-700">
                          ({importedProduct.rating})
                        </span>
                      </div>
                    </div>

                    <div className=" text-gray-600 mt-1">
                      Imported Quantity : {importedProduct.import_quantity}
                    </div>
                    <div className="text-xs text-gray-500 italic mt-1.5">
                      At: {RightDate(importedProduct.createdAt)}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleImportDelete(importedProduct._id)}
                      className="btn w-full bg-gradient-to-r from-[#FF974D] to-[#FF6F00] text-white hover:opacity-90 border-none"
                    >
                      Remove
                    </button>
                    <Link
                      to={`/product-details/${importedProduct.product_id}`}
                      className="btn w-full bg-gradient-to-r from-[#FF974D] to-[#FF6F00] text-white hover:opacity-90 border-none"
                    >
                      See Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-2xl md:text-3xl font-bold text-blue-400">
              You have not imported any products yet.
            </p>
            <p className="text-gray-500 mt-2">
              Add a product to start importing for your business!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyImports;
