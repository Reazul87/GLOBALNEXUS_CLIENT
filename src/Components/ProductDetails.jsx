import React, { useContext, useEffect, useRef, useState } from "react";

import { useParams } from "react-router";
import { FaStar, FaStarHalf } from "react-icons/fa";
import toast from "react-hot-toast";
import RightDate from "./RightDate";
import CurrencyChange from "./CurrencyChange";
import { AuthContext } from "../Context/AuthContext";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [refetch, setRefetch] = useState(false);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const modalProduct = useRef();
  const importInputRef = useRef(null);
  const importButtonRef = useRef(null);

  useEffect(() => {
    fetch(`https://global-nexus-backend.vercel.app/product-details/${id}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProduct(result);
      });
  }, [user, id, refetch]);

  const {
    _id,
    product_image,
    product_name,
    price,
    origin_country,
    rating,
    available_quantity,
    exported_by,
    createdAt,
  } = product;

  const handleImport = () => {
    modalProduct.current.showModal();
    importInputRef.current.value = "";
    importButtonRef.current.disabled = true;
  };
  const handleCloseModal = () => {
    modalProduct.current.close();
  };
  const handleImportProduct = (e) => {
    e.preventDefault();
    const qty = e.target.quantity.value;
    const import_quantity = Number(qty);
    // console.log(_id, import_quantity);

    if (
      import_quantity > available_quantity ||
      import_quantity <= 0 ||
      !import_quantity
    ) {
      return toast.error("Invalid Import Quantity");
    }

    const importProduct = {
      product_image,
      product_id: _id,
      product_name,
      price,
      origin_country,
      rating,
      import_quantity,
      imported_by: user.email,
      createdAt: new Date().toISOString(),
    };

    fetch(`https://global-nexus-backend.vercel.app/import-product/${_id}`, {
      method: "post",
      headers: {
        "content-type": "application/json",
        email: user.email,
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(importProduct),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success(`${product_name} is imported from ${origin_country}`);
        setRefetch(!refetch);
        handleCloseModal();
        // console.log(result);
      });
  };

  return (
    <div className="min-h-screen light:bg-gray-100 dark:bg-[#0f0f0f] p-4 sm:p-8 transition-colors">
      <title>Product Details</title>
      <div className="max-w-6xl mx-auto light:bg-white dark:bg-[#1a1a1a] rounded-xl shadow-2xl dark:shadow-gray-900 overflow-hidden">
        <div className="md:flex">
          <div className="md:w-5/12 light:bg-gray-50 dark:bg-[#2a2a2a] flex items-center justify-center p-4">
            <img
              className="w-full h-auto object-cover rounded-lg shadow-xl"
              src={product_image}
              alt={product_name}
            />
          </div>

          <div className="md:w-7/12 p-6 md:p-10 space-y-6 light:text-gray-800 dark:text-gray-200">
            <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              {product_name}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 border-gray-200">
              <p className="text-4xl font-bold text-[#FF6F00]">
                {CurrencyChange(price)}
              </p>

              <div className="flex items-center mt-3 sm:mt-0">
                {rating > 4.7 ? (
                  <FaStar className="w-6 h-6 text-yellow-400" />
                ) : (
                  <FaStarHalf className="w-6 h-6 text-yellow-400" />
                )}
                <span className="ml-2 text-lg font-semibold ">({rating})</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-base font-medium text-gray-500">
                  Exported By
                </span>
                <span className={`text-base font-semibold`}>{exported_by}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-base font-medium text-gray-500">
                  Origin Country
                </span>
                <span className={`text-base font-semibold`}>
                  {origin_country}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-base font-medium text-gray-500">
                  Available Quantity
                </span>
                <span className={`text-base font-semibold`}>
                  {`${available_quantity} units`}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-base font-medium text-gray-500">
                  Listing Date
                </span>
                <span className={`text-base font-semibold`}>
                  {RightDate(createdAt)}
                </span>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleImport}
                className="w-full py-3 px-6 rounded-lg shadow-xl text-lg font-bold text-white 
                bg-gradient-to-r from-[#FF974D] to-[#FF6F00] 
                hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-[#FF6F00]/50 
                transition duration-300"
              >
                Import Now
              </button>
              <dialog
                ref={modalProduct}
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box">
                  <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
                    {product_name}
                  </h1>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 border-gray-200">
                    <p className="text-4xl text-[#FF6F00] font-bold">
                      {CurrencyChange(price)}
                    </p>

                    <div className="flex items-center mt-3 sm:mt-0">
                      {rating > 4.7 ? (
                        <FaStar className="w-6 h-6 text-yellow-400" />
                      ) : (
                        <FaStarHalf className="w-6 h-6 text-yellow-400" />
                      )}
                      <span className="ml-2 text-lg font-semibold text-gray-300">
                        ({rating})
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 pt-5">
                      <span className="text-base font-medium text-gray-500">
                        Origin Country
                      </span>
                      <span className={`text-base font-semibold`}>
                        {origin_country}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-base font-medium text-gray-500">
                        Available Quantity
                      </span>
                      <span className={`text-base font-semibold`}>
                        {`${available_quantity} units`}
                      </span>
                    </div>

                    <form
                      onSubmit={handleImportProduct}
                      className="flex flex-col  gap-5 py-2"
                    >
                      <div className="flex   gap-5">
                        <label className="label text-gray-500">
                          Import Quantity
                        </label>
                        <input
                          type="number"
                          name="quantity"
                          ref={importInputRef}
                          onInput={() => {
                            const value = Number(importInputRef.current.value);
                            if (importButtonRef.current) {
                              importButtonRef.current.disabled =
                                !value || value > available_quantity;
                            }
                          }}
                          className="input rounded-full focus:border-0 focus:outline-blue-200"
                          placeholder="Product Units"
                        />
                      </div>
                      <div className="flex justify-between  border-t pt-4 border-gray-100">
                        <button
                          type="button"
                          onClick={handleCloseModal}
                          className="btn"
                        >
                          Close
                        </button>
                        <button className="btn" ref={importButtonRef} disabled>
                          Import
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
