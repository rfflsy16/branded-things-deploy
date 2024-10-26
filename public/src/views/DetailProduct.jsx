import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function DetailProduct({ base_url }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(
          `${base_url}/apis/pub/branded-things/products/${id}`
        );
        setProduct(data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id, base_url]);

  if (loading) {
    return (
      <div className="mt-32 flex justify-center items-center">
        <img src="/loading.svg" alt="Loading" />
      </div>
    );
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="bg-[#f5f5dc] min-h-screen py-10 flex flex-col items-center">
      {" "}
      {/* Latar krem */}
      <div className="max-w-4xl bg-white p-10 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <img
            src={product.imgUrl}
            alt={product.name}
            className="rounded-lg shadow-md mb-6"
            style={{ maxWidth: "300px" }}
          />
          <h1 className="text-3xl font-bold text-[#8B4513]">{product.name}</h1>
          <p className="text-gray-700 mt-4">{product.description}</p>
          <div className="mt-6">
            <p className="text-lg font-bold text-gray-800">
              Price: Rp {product.price}
            </p>
            <p className="text-lg text-gray-700">Stock: {product.stock}</p>
          </div>
        </div>
      </div>
      <Link
        to="/"
        className="mt-10 px-6 py-3 bg-[#8B4513] text-white rounded-full hover:bg-[#A0522D] transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
}
