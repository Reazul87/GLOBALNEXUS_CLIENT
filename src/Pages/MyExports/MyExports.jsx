import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { HiOutlineMapPin } from "react-icons/hi2";
import RightDate from "../../Components/RightDate";
import CurrencyChange from "../../Components/CurrencyChange";
import toast from "react-hot-toast";

const MyExports = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    country: "",
    quantity: "",
    rating: "",
  });
  const [productId, setProductId] = useState("");
  const [refetch, setRefetch] = useState(false);
  const { user, setLoading, loading } = useContext(AuthContext);
  const modalProduct = useRef();

  useEffect(() => {
    if (!user?.email) return;

    fetch(
      `https://global-nexus-backend.vercel.app/my-exports?email=${user.email}`,
      {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching exports:", error);
        toast.error("Failed to load your exports");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, refetch, setLoading]);

  const handleExportDelete = (id) => {
    fetch(`https://global-nexus-backend.vercel.app/export-product/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          toast.success("Successfully Deleted");
          setRefetch((prev) => !prev);
        } else {
          toast.error(data.message || "Failed to delete");
        }
      })
      .catch((error) => {
        console.error("Delete error:", error);
        toast.error("Error deleting product");
      });
  };

  const openUpdateModal = (id, product) => {
    setProductId(id);
    setFormData({
      name: product.product_name || "",
      image: product.product_image || "",
      price: product.price?.toString() || "",
      country: product.origin_country || "",
      quantity: product.available_quantity?.toString() || "",
      rating: product.rating?.toString() || "",
    });
    modalProduct.current.showModal();
  };

  const handleCloseModal = () => {
    modalProduct.current.close();
    setProductId("");
    setFormData({
      name: "",
      image: "",
      price: "",
      country: "",
      quantity: "",
      rating: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const rating = formData.rating.trim();
    const ratingRegex = /^\d+(\.\d{0,1})?$/;

    if (!rating) {
      return toast.error("Rating is required");
    }
    if (isNaN(Number(rating))) {
      return toast.error("Rating must be a valid number");
    }
    if (Number(rating) < 0 || Number(rating) > 5) {
      return toast.error("Rating must be between 0 and 5");
    }
    if (!ratingRegex.test(rating)) {
      return toast.error(
        "Rating must have at most one decimal place (e.g., 4.6)",
      );
    }

    const updatedProduct = {
      product_name: formData.name.trim(),
      product_image: formData.image.trim(),
      price: Number(formData.price),
      rating: Number(rating),
      origin_country: formData.country.trim(),
      available_quantity: Number(formData.quantity),
      updatedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        `https://global-nexus-backend.vercel.app/update-export/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify(updatedProduct),
        },
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Successfully Updated");
        setRefetch((prev) => !prev);
        handleCloseModal();
      } else {
        toast.error(data.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Error updating product");
    }
  };

  return (
    <div className="w-11/12 mx-auto">
      <title>My Exports</title>

      <h2 className="text-center text-xl md:text-3xl font-bold mt-10">
        My Exports
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 my-7">
        {loading ? (
          <div className="col-span-full flex justify-center">
            <span className="loading loading-spinner loading-lg text-yellow-400"></span>
          </div>
        ) : products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 h-full flex flex-col"
            >
              <img
                className="h-70 w-full object-cover"
                src={product.product_image}
                alt={product.product_name}
              />
              <div className="p-5 flex flex-col flex-grow">
                <h1 className="block mt-1 text-lg md:text-2xl leading-tight font-extrabold text-gray-900 hover:text-[#FF974D] transition duration-300">
                  {product.product_name}
                </h1>

                <p className="text-lg text-[#FF6F00] md:text-2xl font-bold mt-2">
                  {CurrencyChange(product.price)}
                </p>

                <div className="mt-auto pt-2 border-t border-gray-100">
                  <div className="mt-1 flex justify-between gap-4 text-sm">
                    <div className="flex items-center space-x-1 text-gray-700">
                      <HiOutlineMapPin size={17} />
                      <span className="font-medium">
                        {product.origin_country}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {product.rating > 4.7 ? (
                        <FaStar className="w-5 h-5 text-yellow-400" />
                      ) : (
                        <FaStarHalf className="w-5 h-5 text-yellow-400" />
                      )}
                      <span className="ml-1 text-sm font-semibold text-gray-700">
                        ({product.rating})
                      </span>
                    </div>
                  </div>

                  <div className="text-gray-600 mt-1">
                    Available Quantity: {product.available_quantity}
                  </div>

                  <div className="text-xs text-gray-500 italic mt-1.5">
                    At: {RightDate(product.createdAt)}
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-2.5">
                  <button
                    onClick={() => openUpdateModal(product._id, product)}
                    className="btn w-full bg-gradient-to-r from-[#FF974D] to-[#FF6F00] text-white hover:opacity-90 border-none"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleExportDelete(product._id)}
                    className="btn w-full bg-gradient-to-r from-[#FF974D] to-[#FF6F00] text-white hover:opacity-90 border-none"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-2xl md:text-3xl font-bold text-blue-400">
              You have not exported any products yet.
            </p>
            <p className="text-gray-500 mt-2">
              Add a product to get started with global exports!
            </p>
          </div>
        )}

        <dialog
          ref={modalProduct}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <form onSubmit={handleUpdateProduct}>
              <fieldset className="fieldset">
                <label className="label font-bold text-black/70">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input w-full rounded-full focus:border-0 focus:outline-yellow-200"
                  placeholder="Product Name"
                  required
                />

                <label className="label font-bold text-black/70">
                  Product Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="input w-full rounded-full focus:border-0 focus:outline-yellow-200"
                  placeholder="Product Image Url"
                />

                <label className="label font-bold text-black/70">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="input w-full rounded-full focus:border-0 focus:outline-yellow-200"
                  placeholder="Product Price"
                  required
                  min="0"
                  step="0.01"
                />

                <label className="label font-bold text-black/70">
                  Origin Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="input w-full rounded-full focus:border-0 focus:outline-yellow-200"
                  placeholder="Origin Country"
                />

                <label className="label font-bold text-black/70">Rating</label>
                <input
                  type="text"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="input w-full rounded-full focus:border-0 focus:outline-yellow-200"
                  placeholder="Rating (e.g. 4.6)"
                  required
                />

                <label className="label font-bold text-black/70">
                  Available Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="input w-full rounded-full focus:border-0 focus:outline-yellow-200"
                  placeholder="Available Quantity"
                  required
                  min="0"
                />

                <div className="flex justify-between items-center mt-6">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn text-white rounded-full bg-gradient-to-r from-[#FF974D] to-[#FF6F00] hover:from-[#FF6F00] hover:to-[#FF974D]"
                  >
                    Save Changes
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={handleCloseModal}>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default MyExports;