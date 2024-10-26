import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductForm({
  base_url,
  formTitle,
  buttonText,
  handleSubmit,
  product,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState(1);
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    try {
      const { data } = await axios.get(
        `${base_url}/apis/branded-things/categories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setImgUrl(product.imgUrl);
      setPrice(product.price);
      setStock(product.stock);
      setCategoryId(product.categoryId);
    }
  }, [product]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-teal-200 to-purple-200">
      <div className="w-full max-w-2xl bg-white text-black shadow-lg p-8 rounded-xl transform hover:scale-105 transition duration-300 ease-in-out">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          {formTitle}
        </h1>
        <form
          className="space-y-6"
          onSubmit={(event) =>
            handleSubmit(
              event,
              name,
              description,
              price,
              imgUrl,
              stock,
              categoryId
            )
          }
        >
          <div className="form-control">
            <label htmlFor="name" className="label text-black">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full bg-gray-100 text-black shadow-md rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label htmlFor="description" className="label text-black">
              Description
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered w-full bg-gray-100 text-black shadow-md rounded-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-control">
            <label htmlFor="imgUrl" className="label text-black">
              Image URL
            </label>
            <input
              type="text"
              name="imgUrl"
              className="input input-bordered w-full bg-gray-100 text-black shadow-md rounded-lg"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label htmlFor="price" className="label text-black">
                Price
              </label>
              <input
                type="number"
                name="price"
                className="input input-bordered w-full bg-gray-100 text-black shadow-md rounded-lg"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div className="form-control">
              <label htmlFor="stock" className="label text-black">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                className="input input-bordered w-full bg-gray-100 text-black shadow-md rounded-lg"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="categoryId" className="label text-black">
              Category
            </label>
            <select
              name="categoryId"
              className="select select-bordered w-full bg-gray-100 text-black shadow-md rounded-lg"
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-4 hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-2xl rounded-lg"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
