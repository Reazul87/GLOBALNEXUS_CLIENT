import React, { useState } from "react";
import { useLoaderData } from "react-router";
import ProductCard from "../../Components/ProductCard";

const AllProducts = () => {
  const loads = useLoaderData();

  const [products, setProducts] = useState(loads);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [category, setCategory] = useState("all"); // origin_country
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const pageSize = 12;
  // 🔍 SEARCH
  const handleProductSearch = (e) => {
    e.preventDefault();
    const searching = e.target.search.value;
    setLoadingProducts(true);

    fetch(`https://global-nexus-backend.vercel.app/search?name=${searching}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setPage(1);
        setLoadingProducts(false);
      })
      .catch(() => setLoadingProducts(false));
  };

  // 🎯 FILTER + SORT
  const filteredProducts = products
    .filter((product) => {
      if (category === "all") return true;
      return product.origin_country === category;
    })
    .sort((a, b) => {
      if (sort === "price_asc") {
        return Number(a.price) - Number(b.price);
      }
      if (sort === "price_desc") {
        return Number(b.price) - Number(a.price);
      }
      if (sort === "rating_desc") {
        return Number(b.rating) - Number(a.rating);
      }
      if (sort === "rating_asc") {
        return Number(a.rating) - Number(b.rating);
      }
      // newest first (default)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  // 📄 PAGINATION
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  return (
    <div className="md:w-11/12 mx-auto my-8">
      <title>All Products</title>
      <div className="text-center">
        <h2 className="text-2xl md:text-4xl font-bold">All Products</h2>
        <p className="text-gray-500 mt-2">Explore all available products</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6 my-4 md:my-10 items-center justify-between w-full px-5">
        <form
          onSubmit={handleProductSearch}
          className="flex w-full md:w-auto gap-3"
        >
          <label className="input rounded-full flex items-center gap-2 w-full sm:w-64 md:w-60 lg:w-80">
            <input
              type="search"
              name="search"
              placeholder="Search products..."
              className="w-full"
            />
          </label>

          <button
            type="submit"
            className="btn btn-outline btn-error rounded-full px-4 md:px-8 whitespace-nowrap"
            disabled={loadingProducts}
          >
            {loadingProducts ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Search"
            )}
          </button>
        </form>

        <div className="flex w-full md:w-auto flex-col sm:flex-row gap-3 md:gap-4">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="select select-secondary w-full sm:w-40 md:w-36"
          >
            <option value="all">All Origins</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Japanese">Japanese</option>
            <option value="Chinese">Chinese</option>
            <option value="Korean">Korean</option>
          </select>

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="select select-secondary w-full sm:w-48 md:w-38 lg:w-46"
          >
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating_desc">Top Rated</option>
            <option value="rating_asc">Low Rated</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loadingProducts ? (
          <div className="col-span-full flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-orange-500"></span>
          </div>
        ) : paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-3xl font-bold text-blue-400">
              No Products Found
            </p>
            <p className="text-gray-500 mt-2">
              Try different keywords or filters
            </p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="btn btn-outline px-6"
          >
            Previous
          </button>

          <span className="text-lg font-medium">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="btn btn-outline px-6"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
