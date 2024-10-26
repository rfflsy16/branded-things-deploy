import { useState, useEffect } from "react";
import Card from "../components/Card";
import gearLoad from "../assets/sbs.svg";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getPagination = () => {
    let temp = [];
    for (let i = 1; i <= totalPage; i++) {
      temp.push(i);
    }
    return temp;
  };

  const pagination = getPagination();

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  async function fetchProducts() {
    try {
      setLoading(true);
      let url = `https://h8-phase2-gc.vercel.app/apis/pub/branded-things/products?q=${search}&limit=10&page=${currentPage}&i=${selectedCategory}`;
      console.log(url);
      if (sort) {
        url += `&sort=${sort}`;
      }

      if (selectedCategory) {
        url += `&categoryId=${selectedCategory}`;
      }

      const { data } = await axios.get(url);
      console.log("Ini API Response:", data);

      if (data.data && data.data.query.length > 0) {
        setProducts(data.data.query);
        setTotalPage(data.data.pagination.totalPage);
        setCurrentPage(data.data.pagination.currentPage);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const { data } = await axios.get(
        "https://h8-phase2-gc.vercel.app/apis/pub/branded-things/categories"
      );
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  function handleCategoryChange(e) {
    setSelectedCategory(
      e.target.value.replaceAll(" ", "%20").replaceAll("&", "%26") // ini menggantikan space menjadi unicode bersama &
    );
    setCurrentPage(1);
  }

  function handleSearch(e) {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts();
  }

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [currentPage, sort, selectedCategory]);

  return (
    <div
      id="PAGE-HOME"
      className="flex flex-col items-center bg-gray-100 min-h-screen py-10"
    >
      <Navbar />
      <div className="w-full flex justify-center mt-6 space-x-4">
        <form className="form-control w-full max-w-lg" onSubmit={handleSearch}>
          <div className="input-group flex items-center">
            <input
              type="text"
              placeholder="Cari produk..."
              className="input input-bordered w-full rounded-full focus:ring-2 focus:ring-yellow-400 transition-all duration-300 ease-in-out"
              style={{ borderColor: "#8B4513", borderWidth: "2px" }}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="btn bg-[#8B4513] text-white hover:bg-[#A0522D] ml-2 flex items-center justify-center"
              style={{ width: "48px", height: "48px", padding: "0" }}
            >
              <i className="fas fa-search fa-lg"></i>
            </button>
          </div>
        </form>

        <div className="form-control max-w-xs">
          <select
            className="select select-bordered rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            style={{ borderColor: "#8B4513", borderWidth: "2px" }}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
          </select>
        </div>

        <div className="form-control max-w-xs">
          <select
            className="select select-bordered rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            style={{ borderColor: "#8B4513", borderWidth: "2px" }}
            onChange={(e) => handleCategoryChange(e)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.name.replace(" ", "%20")}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {loading ? (
        <div className="mt-32 flex justify-center items-center">
          <img src={gearLoad} alt="Loading" />
        </div>
      ) : (
        <>
          {products.length > 0 ? (
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-10">
              {products.map((product) => (
                <Card
                  key={product.id}
                  product={product}
                  base_url={"https://h8-phase2-gc.vercel.app"}
                  fetchProducts={fetchProducts}
                />
              ))}
            </main>
          ) : (
            <div className="mt-20">
              <p className="text-lg text-gray-500">Product is not found.</p>
            </div>
          )}

          <div className="join mt-6">
            <button
              className="join-item btn bg-[#8B4513] text-white hover:bg-[#A0522D]"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              «
            </button>
            {pagination.map((el) => (
              <button
                key={el}
                className={
                  el === currentPage
                    ? "join-item btn btn-active bg-[#A0522D] text-white"
                    : "join-item btn bg-[#8B4513] text-white hover:bg-[#A0522D]"
                }
                onClick={() => setCurrentPage(el)}
              >
                {el}
              </button>
            ))}
            <button
              className="join-item btn bg-[#8B4513] text-white hover:bg-[#A0522D]"
              onClick={handleNext}
              disabled={currentPage === totalPage}
            >
              »
            </button>
          </div>
        </>
      )}
    </div>
  );
}
