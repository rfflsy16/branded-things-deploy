import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";

export default function AddUser({ base_url }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(
    e,
    username,
    email,
    password,
    phoneNumber,
    address
  ) {
    e.preventDefault();
    try {
      const body = { username, email, password, phoneNumber, address };

      const { data } = await axios.post(`${base_url}/apis/add-user`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      console.log(data);

      Toastify({
        text: `Success add new user`,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#008000",
        },
      }).showToast();

      navigate("/");
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response.data.error,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#FF0000",
        },
      }).showToast();
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-200 via-teal-200 to-purple-200">
        <div className="bg-white rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl p-8 w-full max-w-lg">
          <h1 className="font-bold text-2xl text-center text-gray-800 mb-6">
            Add New User (Staff)
          </h1>
          <form
            className="space-y-4"
            onSubmit={(e) =>
              handleSubmit(e, username, email, password, phoneNumber, address)
            }
          >
            <div className="form-group">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                className="input input-bordered w-full bg-gray-50 text-gray-900 rounded-md shadow-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full bg-gray-50 text-gray-900 rounded-md shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="input input-bordered w-full bg-gray-50 text-gray-900 rounded-md shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                className="input input-bordered w-full bg-gray-50 text-gray-900 rounded-md shadow-sm"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <textarea
                name="address"
                className="textarea textarea-bordered w-full bg-gray-50 text-gray-900 rounded-md shadow-sm"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full bg-blue-500 hover:bg-blue-600 transition-all duration-300 shadow-lg transform hover:scale-105 text-white font-semibold rounded-md"
            >
              Add User
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
