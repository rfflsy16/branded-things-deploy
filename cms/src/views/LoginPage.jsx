import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

export default function LoginPage({ base_url }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();

  async function login(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${base_url}/apis/login`, {
        email,
        password,
      });

      localStorage.setItem("access_token", data.data.access_token);
      navigation("/");
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
        onClick: function () {},
      }).showToast();
    }
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-200 via-teal-200 to-purple-200">
        <div className="flex flex-col md:flex-row items-center bg-white shadow-2xl rounded-lg overflow-hidden w-full max-w-4xl transition-all transform hover:scale-105 hover:shadow-3xl duration-500">
          <div className="w-full md:w-1/2 p-6">
            <img
              className="w-full h-full object-cover rounded-l-lg"
              src="https://media.giphy.com/media/opvm3FXT2qYus/giphy.gif?cid=ecf05e470zh0avvhs7ohxcjuisjy3smg398j74ggaanqr581&ep=v1_gifs_related&rid=giphy.gif&ct=s"
              alt="Pokemon GIF"
            />
          </div>

          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-gradient-to-r from-white to-gray-50 shadow-inner rounded-r-lg">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-6">
              Sign in to your account
            </h2>
            <form className="space-y-6" onSubmit={login} method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="input input-bordered w-full bg-gray-100 text-gray-900 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="input input-bordered w-full bg-gray-100 text-gray-900 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="btn w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold shadow-lg rounded-lg transform hover:scale-105 transition-all duration-300"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
