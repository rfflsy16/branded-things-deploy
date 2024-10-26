import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import axios from "axios";
import Toastify from "toastify-js";

export default function AddProduct({ base_url }) {
  const navigate = useNavigate();

  async function handleSubmit(
    e,
    name,
    description,
    price,
    imgUrl,
    stock,
    categoryId
  ) {
    e.preventDefault();

    try {
      const body = { name, description, price, imgUrl, stock, categoryId };

      const { data } = await axios.post(
        `${base_url}/apis/branded-things/products`,
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );

      Toastify({
        text: `${data.data.name} added successfully`,
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
      console.log(error);
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
    }
  }

  return (
    <>
      <ProductForm
        base_url={base_url}
        formTitle="Add New Product"
        buttonText="Add Product"
        handleSubmit={handleSubmit}
      />
    </>
  );
}
