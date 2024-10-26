import { useState, useEffect } from "react";
import axios from "axios";

export default function Categories({ base_url }) {
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    try {
      const { data } = await axios.get(
        `${base_url}/apis/branded-things/categories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-teal-200 to-purple-200">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Category List
        </h1>
        <table className="table-auto w-full text-black">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th className="px-4 py-2 text-center">ID</th>
              <th className="px-4 py-2 text-center">Category</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr
                key={category.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                } transition-all duration-300 transform hover:scale-105 hover:shadow-lg rounded-lg`}
              >
                <td className="px-4 py-2 text-center">{category.id}</td>
                <td className="px-4 py-2 text-center">{category.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
