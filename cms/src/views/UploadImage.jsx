import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";

export default function UploadImage({ base_url }) {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [imageUpload, setImageUpload] = useState({});
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  async function fetchImage() {
    try {
      const { data } = await axios.get(
        `${base_url}/apis/branded-things/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      setName(data.data.name);
      setImgUrl(data.data.imgUrl);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleImageSelect(event) {
    try {
      event.preventDefault();
      const image = event.target.files[0];
      setImageUpload(image);
      if (image) {
        const imgUrl = URL.createObjectURL(image);
        setImgUrl(imgUrl);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(event) {
    try {
      setUploading(true);
      event.preventDefault();
      const formData = new FormData();
      formData.append("file", imageUpload);

      const { data } = await axios.patch(
        `${base_url}/apis/branded-things/products/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );

      Toastify({
        text: `${data.message}`,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#008000",
        },
        onClick: function () {}, // Callback after click
      }).showToast();

      navigate("/");
    } catch (error) {
      Toastify({
        text: error.response.data.error,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#FF0000",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    } finally {
      setUploading(false);
    }
  }

  useEffect(() => {
    fetchImage();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-200 via-teal-200 to-purple-200">
      <div className="bg-white rounded-xl shadow-xl p-10 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">{`Edit Image for ${name}`}</h1>
        <img
          src={imgUrl}
          alt="image"
          className="w-56 mx-auto mb-6 rounded-lg shadow-md"
        />
        <form action="" method="POST" className="space-y-6">
          <input
            type="file"
            accept="image/*"
            name="file"
            onChange={(event) => handleImageSelect(event)}
            className="file-input file-input-bordered w-full bg-gray-100"
          />
          <button
            onClick={(event) => handleSubmit(event)}
            className="btn btn-primary w-full bg-blue-500 hover:bg-blue-600 transition-all duration-300 shadow-md transform hover:scale-105"
          >
            Save Image
          </button>
        </form>
        {uploading && (
          <div className="flex gap-2 items-center justify-center mt-4">
            <div className="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full border-t-blue-600"></div>
            <p className="text-gray-600">Uploading...</p>
          </div>
        )}
      </div>
    </div>
  );
}
