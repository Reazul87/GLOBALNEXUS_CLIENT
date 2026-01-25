import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";

const AddExport = () => {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [imageLinks, setImageLinks] = useState("");
  const [ratingCheck, setRatingCheck] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCountry, setProductCountry] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

  const handleAddExport = (e) => {
    e.preventDefault();

    const imageExtensions = /\.(jpg|jpeg|png|gif|webp)$/i;
    const nameContain = /^[a-zA-Z0-9\s]*$/;
    const countryContain = /^[a-zA-Z\s'-]*$/;
    const ratingRegex = /^\d+(\.\d{0,1})?$/;
    const min3Chars = /^.{3,}$/;
    const productQuantityNumber = Number(productQuantity);

    if (!name.trim()) {
      return toast.error("Product name is required");
    }
    if (!min3Chars.test(name.trim())) {
      return toast.error("Product name must be at least 3 characters long");
    }
    if (!nameContain.test(name)) {
      return toast.error("Name can only contain letters and spaces");
    }

    if (!imageLinks.trim()) {
      return toast.error("Product image URL is required");
    }
    try {
      new URL(imageLinks);
    } catch {
      return toast.error("Please enter a valid URL");
    }
    if (!imageExtensions.test(imageLinks)) {
      return toast.error("URL accepted (e.g., .jpg, .png, .gif, .webp)");
    }

    if (!productPrice.trim()) {
      return toast.error("Product price is required");
    }
    if (productPrice <= 0) {
      return toast.error("Price must be greater than 0");
    }
    if (isNaN(Number(productPrice))) {
      return toast.error("Price must be a valid number");
    }

    if (!productCountry.trim()) {
      return toast.error("Origin country is required");
    }
    if (!countryContain.test(productCountry)) {
      return toast.error(
        "Country name can only contain letters, spaces, hyphens, or apostrophes",
      );
    }

    if (!ratingCheck.trim()) {
      return toast.error("Rating is required");
    }

    if (isNaN(Number(ratingCheck))) {
      return toast.error("Rating must be a valid number");
    }
    if (ratingCheck < 0 || ratingCheck > 5) {
      return toast.error("Rating must be between 0 and 5");
    }
    if (!ratingRegex.test(ratingCheck)) {
      return toast.error(
        "Rating must have at most one decimal place (e.g., 4.6)",
      );
    }

    if (!productQuantity.trim()) {
      return toast.error("Available quantity is required");
    }
    if (productQuantity < 0) {
      return toast.error("Quantity cannot be negative");
    }
    if (isNaN(productQuantityNumber) || productQuantity.includes(".")) {
      return toast.error("Quantity must be a whole number");
    }

    const exportProduct = {
      product_name: name,
      product_image: imageLinks,
      price: productPrice,
      origin_country: productCountry,
      rating: ratingCheck,
      available_quantity: productQuantity,
      createdAt: new Date().toISOString(),
      exported_by: user.email,
    };

    fetch("https://global-nexus-server.vercel.app/products", {
      method: "post",
      headers: {
        "content-type": "application/json",
        email: user.email,
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(exportProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        e.target.reset();
        if (data.result.insertedId) {
          return toast.success(`Successfully Export ${name}`);
        }
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-xl my-10 border border-gray-100">
      <title>Add Export</title>
      <div className="card-body">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-[#173A75]">
            Add Your Product for Global Export
          </h1>
          <p className="text-gray-500 mt-2">
            Fill out the details below to list your product for international
            export.
          </p>
        </div>
        <form onSubmit={handleAddExport}>
          <fieldset className="fieldset">
            <label className="label font-bold text-black/70">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input rounded-full focus:border-0 focus:outline-pink-200"
              placeholder="Product Name"
            />

            <label className="label font-bold text-black/70">
              Product Image
            </label>
            <input
              type="text"
              name="image"
              value={imageLinks}
              onChange={(e) => setImageLinks(e.target.value)}
              className="input rounded-full focus:border-0 focus:outline-pink-200"
              placeholder="Product Image Url"
            />
            <label className="label font-bold text-black/70">Price</label>
            <input
              type="number"
              name="price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="input rounded-full focus:border-0 focus:outline-pink-200"
              placeholder="Product Price"
            />
            <label className="label font-bold text-black/70">
              Origin Country
            </label>
            <input
              type="text"
              name="country"
              value={productCountry}
              onChange={(e) => setProductCountry(e.target.value)}
              className="input rounded-full focus:border-0 focus:outline-pink-200"
              placeholder="Origin Country"
            />
            <label className="label font-bold text-black/70">Rating</label>
            <input
              type="number"
              name="rating"
              value={ratingCheck}
              onChange={(e) => setRatingCheck(e.target.value)}
              className="input rounded-full focus:border-0 focus:outline-pink-200"
              placeholder="Rating (e.g., 4.6)"
            />
            <label className="label font-bold text-black/70">
              Available quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
              className="input rounded-full focus:border-0 focus:outline-pink-200"
              placeholder="Available Quantity"
            />

            <button
              className={`btn mt-4 text-white rounded-full bg-gradient-to-r from-[#FF974D] to-[#FF6F00] hover:from-[#FF6F00] hover:to-[#FF974D]`}
            >
              Add Export
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default AddExport;
