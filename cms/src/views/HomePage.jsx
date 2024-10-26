import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

export default function HomePage({ base_url }) {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);

  async function fetchProduct() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${base_url}/apis/branded-things/products`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function priceBeingRupiah(price) {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    });

    return formatter.format(price);
  }

  const navigate = useNavigate();

  function handleEdit(e, id) {
    e.preventDefault();
    navigate(`/edit/${id}`);
  }

  async function handleDelete(e, id) {
    e.preventDefault();
    try {
      const { data } = await axios.delete(
        `${base_url}/apis/branded-things/products/${id}`,
        { Authorization: `Bearer ${localStorage.access_token}` }
      );
      Toastify({
        text: data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#ff4d4f",
        },
      }).showToast();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      {loading ? (
        <div className="min-h-screen min-w-screen flex flex-col items-center mt-24">
          <img
            src="https://media.giphy.com/media/3oriOiizS4Pmofj46A/giphy.gif?cid=ecf05e475hknyllb9cmscwzftlrmhw49rqdafxrzaq9wbagl&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            className="size-16"
            alt="Loading..."
          />
          <p className="text-lg font-semibold text-gray-700">Loading ...</p>
        </div>
      ) : (
        <div className="overflow-x-auto p-10 bg-gradient-to-r from-blue-200 via-teal-200 to-purple-200 rounded-lg">
          <table className="table text-black">
            <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
              <tr>
                <th></th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {product
                .slice()
                .reverse()
                .map((el, index) => {
                  return (
                    <tr
                      key={el.id}
                      className={`${
                        index % 2 === 0
                          ? "bg-blue-50 hover:bg-blue-100"
                          : "bg-teal-50 hover:bg-teal-100"
                      } transition-all duration-300 rounded-lg`}
                    >
                      <td>
                        <div className="avatar flex flex-col items-center">
                          <div className="mask mask-squircle h-16 w-16">
                            <img src={el.imgUrl} alt={el.name} />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-bold text-gray-800">
                              {el.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="max-w-96 text-gray-600">
                          {el.description}
                        </p>
                      </td>
                      <td>
                        <p className="text-gray-800">
                          {priceBeingRupiah(el.price)}
                        </p>
                      </td>
                      <td>
                        <p className="text-gray-800">{el.stock}</p>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            className="btn btn-primary btn-sm bg-blue-500 hover:bg-blue-600 transition-all duration-300 shadow-lg transform hover:translate-y-1 hover:scale-105"
                            onClick={(event) => handleEdit(event, el.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-error btn-sm bg-red-500 hover:bg-red-600 transition-all duration-300 shadow-lg transform hover:translate-y-1 hover:scale-105"
                            onClick={(event) => handleDelete(event, el.id)}
                          >
                            Delete
                          </button>
                          <Link to={`/upload-image/${el.id}`}>
                            <button className="btn btn-info btn-sm bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 shadow-lg transform hover:translate-y-1 hover:scale-105">
                              Edit Image
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
